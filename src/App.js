import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home.js";
import Cut from "./pages/Cut.js";
import WebCamComponent from "./Components/WebCamComponent.js";
import PhotoSelection from "./pages/PhotoSelection.js";
import SelectFrame from "./pages/SelectFrame.js";
import Gallery from "./pages/Gallery.js";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

function App() {
	const [photos, setPhotos] = useState([]);

	return (
		<BrowserRouter>
			<div className="App">
				<Toaster />
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
