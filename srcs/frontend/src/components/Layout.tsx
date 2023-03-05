import { Col, Row, Container } from "react-bootstrap";
import ChatPart from "./chatting/ChatPart";
import { useParams } from "react-router-dom";
import Home from "./Home";
import Game from "./game/Game";
import CreatRoom from "./Room";
import Profile from "./Profile/Profile";
import MyInform from "./Information/MyInform";
import { gameMod, UserData } from "../common/types";
import { useState } from "react";

type LayoutComponent = {
	isLoggedIn: boolean;
	userData: UserData;
	isChangedData: boolean;
	setChangedData: React.Dispatch<React.SetStateAction<boolean>>;
};

function Layout({
	isLoggedIn,
	userData,
	isChangedData,
	setChangedData,
}: LayoutComponent) {
	const [inform, setInform] = useState<UserData>();
	const [enteredChannel, setEnteredChannel] = useState<boolean>(false);
	const url = useParams();
	const param = url["*"];

	const getComponent = () => {
		if (param === "")
			return <Home isLoggedIn={isLoggedIn} userData={userData} enteredChannel={enteredChannel}/>;
		else if (param === "profile")
			return (
				<Profile
					isLoggedIn={isLoggedIn}
					userData={userData}
					isChangedData={isChangedData}
					setChangedData={setChangedData}
				/>
			);
		else if (param === "soloGame") return <Game mod={gameMod.soloGame} />;
		else if (param === "rankGame") return <Game mod={gameMod.rankGame} />;
		else if (param === "friendlyGame") return <Game mod={gameMod.normalGame} />;
		else if (param === "privateGame")
			return <Game mod={gameMod.passwordGame} />;
		else if (param === "creatGame") return <CreatRoom />;
	};

	const getBorder = () => {
		if (isLoggedIn) return "border";
		else return "";
	};

	return (
		<>
			<Container fluid style={{ height: "90vmin" }}>
				<Row style={{ height: "90vmin" }}>
					<Col xs={3} className={getBorder()}>
						{userData.nickname === null || !isLoggedIn ? null : (
							<MyInform inform={inform ?? userData} />
							// <OtherInform userData={userData} imageURL={imageURL} />
						)}
					</Col>
					<Col xs={6}>{getComponent()}</Col>
					<Col xs={3} className={getBorder()}>
						{isLoggedIn && <ChatPart setInform={setInform} setEnteredChannel={setEnteredChannel}/>}
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default Layout;
