import { app, supabase } from "./index.js"; // index.js에서 app과 supabase 가져옴

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
