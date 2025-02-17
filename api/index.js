const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { createClient } = require("@supabase/supabase-js");
const path = require("path");

const app = express();
const port = 4000;

// Supabase 설정
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// CORS 설정 (중복된 cors 호출 제거)
app.use(
	cors({
		origin: "https://snap4-u-git-main-kim-hyunsus-projects.vercel.app", // 요청을 허용할 도메인
		methods: ["GET", "POST"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Supabase 이미지 업로드 함수
const uploadImageToSupabase = async (base64Data, fileName) => {
	const base64String = base64Data.replace(
		/^data:image\/(png|jpeg|jpg);base64,/,
		""
	);
	const buffer = Buffer.from(base64String, "base64");

	const { data, error } = await supabase.storage
		.from("uploads")
		.upload(fileName, buffer, {
			contentType: "image/png",
		});

	if (error) {
		console.error("Error uploading image to Supabase:", error.message);
		throw new Error("Failed to upload image");
	}

	const { data: publicUrlData } = supabase.storage
		.from("uploads")
		.getPublicUrl(fileName);
	return publicUrlData.publicUrl;
};

// 선택 저장 API
app.post("/saveSelection", async (req, res) => {
	try {
		const { photoUrl, frameColor } = req.body;
		const timestamp = Date.now();
		const fileName = `photo_${timestamp}.png`;

		const imageUrl = await uploadImageToSupabase(photoUrl, fileName);

		const { error } = await supabase
			.from("photos")
			.insert([{ photoUrl: imageUrl, frameColor }]);

		if (error) throw error;

		res.status(200).send("Data saved successfully");
	} catch (error) {
		console.error("Error:", error.message);
		res.status(500).send("Failed to save data");
	}
});

// 갤러리 조회 API
app.get("/gallery", async (req, res) => {
	try {
		const { data, error } = await supabase.from("photos").select("*");

		if (error) throw error;

		res.status(200).json(data);
	} catch (err) {
		console.error("Error fetching data:", err.message);
		res.status(500).send("Failed to fetch data");
	}
});

// 서버리스 함수로 export
module.exports = app;
