import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Layout from "./components/Layout";
import { Route, Routes, useNavigate } from "react-router-dom";
import { api } from "./axios/api";
import { UserData } from "./common/types";
import { mySocket, SetSocket } from "./common/MySocket";

function App() {
	const navigate = useNavigate();
	const [loggedIn, setLoggedIn] = useState(false);
	let [userData, setUserData] = useState<UserData>({
		intraID: "",
		name: "",
		nickName: "",
		phone: "",
		verified: false,
	});
	const [isChangedData, setChangedData] = useState<boolean>(false);

	const getUserData = async () => {
		try {
			const res = await api.get("/user/me");
			const { user } = res.data;
			const data = {
				intraID: user.intra,
				name: user.usual_full_name,
				nickName: user.nickname,
				phone: user.phone,
				verified: user.verified,
			};
			setUserData(data);
			mySocket.name = user.nickname;
		} catch (e) {
			console.error(e);
		}
	};

	const intraLogin = async () => {
		try {
			const res = await api.get("/user/me");
			const { user } = res.data;
			const data = {
				intraID: user.intra,
				name: user.usual_full_name,
				nickName: user.nickname,
				phone: user.phone,
				verified: user.verified,
			};
			setLoggedIn(true);
			setUserData(data);
			mySocket === undefined && SetSocket(data.nickName);
			if (data.nickName === null && data.phone === null)
				navigate("/profile");
		} catch (e) {
			setLoggedIn(false);
			setUserData({
				intraID: "",
				name: "",
				nickName: "",
				phone: "",
				verified: false,
			});
		}
	};
	
	useEffect(() => {
		intraLogin();
	}, [loggedIn]);

	useEffect(() => {
		getUserData();
	}, [isChangedData]);

	return (
		<>
			<NavBar isLoggedIn={loggedIn} setLoggedIn={setLoggedIn} />
			<Routes>
				<Route
					path="/*"
					element={
						<Layout
							isLoggedIn={loggedIn}
							userData={userData}
							isChangedData={isChangedData}
							setChangedData={setChangedData}
						/>
					}
				/>
			</Routes>
		</>
	);
}

export default App;
