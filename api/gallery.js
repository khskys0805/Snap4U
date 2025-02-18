import { supabase } from "../../lib/supabase"; // Supabase 클라이언트 import

export default async function handler(req, res) {
	if (req.method === "GET") {
		try {
			const { data, error } = await supabase.from("photos").select("*");
			if (error) throw error;

			res.status(200).json(data);
		} catch (err) {
			console.error("Error fetching data:", err.message);
			res.status(500).send("Failed to fetch data");
		}
	} else {
		res.status(405).send("Method Not Allowed");
	}
}
