const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(cors());

const db = new sqlite3.Database("./database.sqlite", (err) => {
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
					console.log("selections table created or already exists.");
				}
			}
		);
	}
});

app.post("/saveSelection", (req, res) => {
	console.log("Received body:", req.body); // 요청 본문 확인
	const { photoUrl, frameColor } = req.body;

	const stmt = db.prepare(
		"INSERT INTO selections (photoUrl, frameColor) VALUES (?, ?)",
		(err) => {
			if (err) {
				console.error("Error preparing statement:", err.message); // 여기 추가
				return res.status(500).send("Failed to prepare statement");
			}
		}
	);

	stmt.run(photoUrl, frameColor, (err) => {
		if (err) {
			console.error("Error inserting data:", err.message);
			res.status(500).send("Failed to save data");
			return;
		}
		res.status(200).send("Data saved successfully");
	});

	stmt.finalize();
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
