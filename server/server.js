const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs"); // fs 모듈을 추가

const app = express();
const port = 4000;

// 정적 파일 서빙 추가 (추가할 부분)
app.use(
	"/uploads",
	cors({
		origin: "http://localhost:3000", // React 클라이언트 주소
		methods: ["GET"],
		allowedHeaders: ["Content-Type", "Authorization"],
	}),
	express.static(path.join(__dirname, "uploads"))
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// CORS 설정
app.use(
	cors({
		origin: "http://localhost:3000", // 클라이언트 주소
		methods: ["GET", "POST"], // 허용할 HTTP 메소드
		allowedHeaders: ["Content-Type", "Authorization"], // 허용할 헤더
	})
);

const db = new sqlite3.Database(
	path.join(__dirname, "../database.sqlite"),
	(err) => {
		if (err) {
			console.error("Error opening database:", err.message);
		} else {
			console.log("Connected to SQLite database.");
			db.run(
				`
        CREATE TABLE IF NOT EXISTS selections (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          photoUrl TEXT,
          frameColor TEXT
        )
      `,
				(err) => {
					if (err) {
						console.error("Error creating table:", err.message);
					} else {
						console.log(
							"selections table created or already exists."
						);
					}
				}
			);
		}
	}
);

// Base64 이미지를 파일로 저장하는 함수
const saveBase64Image = (base64Data, filePath) => {
	const base64String = base64Data.replace(
		/^data:image\/(png|jpeg|jpg);base64,/,
		""
	);
	const buffer = Buffer.from(base64String, "base64");

	const uploadDir = path.join(__dirname, "uploads");
	if (!fs.existsSync(uploadDir)) {
		fs.mkdirSync(uploadDir, { recursive: true });
	}

	const fullFilePath = path.join(uploadDir, filePath);

	try {
		fs.writeFileSync(fullFilePath, buffer);
		console.log(`Image saved to ${fullFilePath}`);
	} catch (error) {
		console.error("Error saving image:", error.message);
	}

	// 절대 경로로 반환: `/uploads/photo_1739438891411.png`
	return `/uploads/${filePath}`;
};

app.post("/saveSelection", (req, res) => {
	console.log("Received body:", req.body); // 요청 본문 확인
	const { photoUrl, frameColor } = req.body;

	const timestamp = Date.now();
	const filePath = `photo_${timestamp}.png`;

	try {
		console.log("Attempting to save image...");
		const savedImagePath = saveBase64Image(photoUrl, filePath);
		console.log("Image saved, now inserting into DB...");

		const stmt = db.prepare(
			"INSERT INTO selections (photoUrl, frameColor) VALUES (?, ?)",
			(err) => {
				if (err) {
					console.error("Error preparing statement:", err.message);
					return res.status(500).send("Failed to prepare statement");
				}
			}
		);

		stmt.run(savedImagePath, frameColor, (err) => {
			if (err) {
				console.error("Error inserting data:", err.message);
				res.status(500).send("Failed to save data");
				return;
			}
			res.status(200).send("Data saved successfully");
		});

		stmt.finalize();
	} catch (error) {
		console.error("Error saving image:", error.message);
		res.status(500).send("Failed to save image");
	}
});

app.get("/gallery", (req, res) => {
	db.all("SELECT * FROM selections", [], (err, rows) => {
		if (err) {
			console.error("Error fetching data:", err.message);
			res.status(500).send("Failed to fetch data");
			return;
		}
		res.status(200).json(rows); // rows 배열을 JSON 형태로 응답
	});
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
