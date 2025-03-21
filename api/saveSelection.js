import { supabase } from "./index.js"; // Supabase 클라이언트 import

// 이미지 업로드 함수
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

// 서버리스 핸들러
export default async function handler(req, res) {
	if (req.method === "POST") {
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
	} else {
		res.status(405).send("Method Not Allowed");
	}
}
