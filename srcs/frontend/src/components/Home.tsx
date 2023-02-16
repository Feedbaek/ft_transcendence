import { Col, Row, Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

// import style from "../css/Home.module.css";
import Btn from "./Btn";


enum gameMod{
	normalGame,
	passwordGame,
	soloGame,
	rankGame,
}

type HomeComponent = {
	isLoggedIn: boolean;
};

function Home({ isLoggedIn }: HomeComponent) {
	const navigate = useNavigate();

	function gameModHandle(mode: gameMod) {
		if (mode === gameMod.normalGame) {
			// 방만들기 이동
			;
		} else if (mode === gameMod.rankGame) {
			// 로딩 창으로 이동
			;
		}
		else if (mode === gameMod.soloGame) {
			navigate('/Game');
		}
	}

	return (
		<>
			<Container>
			<Row>
					<Col className="d-flex justify-content-center">
						<img src="./pong-logo.jpeg" alt="홈 이미지" />
					</Col>
				</Row>
				<Row>
					<Col className="d-flex justify-content-center">
						<Btn text="경쟁전" disable={isLoggedIn} />
						{/* 채팅 컴포넌트 들어올 자리 */}
					</Col>
				</Row>
				<Row>
					<p> </p>
				</Row>
				<Row>
					<Col className="d-flex justify-content-center">
						<Btn text="경쟁전" disable={isLoggedIn} />
						{/* 채팅 컴포넌트 들어올 자리 */}
					</Col>
				</Row>
					<p> </p>
				<Row>
					<Col className="d-flex justify-content-center">
						<Button variant="outline-light" disabled={!isLoggedIn}
							style={{ width: "100px", height: "50px",}}
							onClick={() => gameModHandle(2)}>
								혼자하기
						</Button>
					</Col>
				</Row>
			</Container>
		</>
	);
}

// <div className={style.black_background}>
// 	<img className={style.img} src="./pong-logo.jpeg" alt="홈 이미지" />
// </div>
// <div className={style.buttonDiv}>
// 	<GameBtn />
// </div>
export default Home;
