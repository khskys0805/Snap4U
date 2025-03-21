import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { createClient } from "@supabase/supabase-js";
import path from "path";

const app = express();

// Supabase 설정
const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Middleware 설정
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// 📌 정적 파일 제공 (React 빌드 폴더)
app.use(express.static(path.join(__dirname, "build")));

// 📌 React 라우팅 처리 (SPA 지원)
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

// 📌 서버 실행
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// app과 supabase를 내보냄
export { app, supabase };
