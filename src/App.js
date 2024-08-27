import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Cut from "./pages/Cut";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/cut" element={<Cut />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
