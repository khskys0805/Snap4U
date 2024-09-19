// backend/index.js (Node.js + Express 백엔드)
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // CORS 모듈 불러오기

const app = express();
const port = 4000; // React 개발 서버와 다른 포트로 설정

// 미들웨어 설정
app.use(bodyParser.json()); // JSON 형식의 요청 본문을 파싱하기 위해 사용
app.use(cors()); // CORS 모든 요청에 대해 허용

// 사진과 프레임 색상을 저장하는 엔드포인트
// app.post("/saveSelection", (req, res) => {
// 	const { photoUrls, frameColor } = req.body; // 요청에서 데이터 추출
// 	console.log("Received data:", { photoUrls, frameColor });

// 	// 간단하게 응답
// 	res.send("Data received and processed.");
// });

app.get("/api", (req, res) => {
	res.send({ hello: "hello" });
});

// 서버 실행
app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
