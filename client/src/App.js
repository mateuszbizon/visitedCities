import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Map from "./routes/Map";
import Notification from "./components/Notification";
import { NotificationProvider } from "./context/NotifiactionContext";
import Login from "./routes/Login";
import AuthRoutes from "./utils/AuthRoutes";
import "./css/index.css";


function App() {
	return (
		<NotificationProvider>
			<Router>
				<Notification />
				<Routes>
					<Route element={<AuthRoutes />} >
						<Route path="/map" element={<Map />} />
					</Route>
					<Route path="/login" element={<Login />} />
				</Routes>
			</Router>
		</NotificationProvider>
	);
}

export default App;