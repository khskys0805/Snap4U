import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Cut from "./pages/Cut";
import WebCamComponent from "./Components/WebCamComponent";
import PhotoSelection from "./pages/PhotoSelection";
import SelectFrame from "./pages/SelectFrame";
import Gallery from "./pages/Gallery";
import { useState } from "react";

function App() {
	const [photos, setPhotos] = useState([]);

	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/cut" element={<Cut />} />
					<Route
						path="/camera"
						element={<WebCamComponent setPhotos={setPhotos} />}
					/>
					<Route
						path="/select"
						element={<PhotoSelection photos={photos} />}
					/>
					<Route path="/frame" element={<SelectFrame />} />
					<Route path="/gallery" element={<Gallery />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
