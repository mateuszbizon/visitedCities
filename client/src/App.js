import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Map from "./routes/Map";
import Map from "./routes/Login";
import "./css/index.css";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/map" element={<Map />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</Router>
	);
}

export default App;