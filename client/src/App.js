import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Map from "./routes/Map";
import Notification from "./components/Notification";
import { NotificationProvider } from "./context/NotifiactionContext";
import { UserProvider } from "./context/UserContext";
import { GoogleOAuthProvider } from '@react-oauth/google';
import "./css/index.css";


function App() {
	return (
		<GoogleOAuthProvider clientId="255299074998-i2png2ca07osvp5b3rfa4fq8qi4btte6.apps.googleusercontent.com">
			<UserProvider>
				<NotificationProvider>
					<Router>
						<Notification />
						<Routes>
							<Route path="/" element={<Map />} />
						</Routes>
					</Router>
				</NotificationProvider>
			</UserProvider>
		</GoogleOAuthProvider>
	);
}

export default App;