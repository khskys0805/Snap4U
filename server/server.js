require("dotenv").config(); // .env 파일 로드

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
const path = require("path");

const app = express();
const port = 4000;

// Supabase 설정
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // Supabase 프로젝트 URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Supabase 서비스 키
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// CORS 설정
app.use(
	cors({
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);

// Base64 이미지를 Supabase Storage에 저장하는 함수
const uploadImageToSupabase = async (base64Data, fileName) => {
	const base64String = base64Data.replace(
		/^data:image\/(png|jpeg|jpg);base64,/,
		""
	);
	const buffer = Buffer.from(base64String, "base64");

	// Supabase Storage 업로드
	const { data, error } = await supabase.storage
		.from("uploads")
		.upload(fileName, buffer, {
			contentType: "image/png",
		});

	if (error) {
		console.error("Error uploading image to Supabase:", error.message);
		throw new Error("Failed to upload image");
	}

	// 업로드된 이미지의 공개 URL 가져오기
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

		// 이미지를 Supabase Storage에 업로드
		const imageUrl = await uploadImageToSupabase(photoUrl, fileName);

		// 데이터베이스에 저장
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

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
