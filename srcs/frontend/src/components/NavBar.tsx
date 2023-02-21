import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { api } from "../axios/api";

type NavBarComponent = {
	isLoggedIn: boolean;
	setLoggedIn: (isLoggedIn: boolean) => any;
};

function NavBar({ isLoggedIn, setLoggedIn }: NavBarComponent) {
	const navigate = useNavigate();

	const logOut = async () => {
		await api.get("/logout");
		setLoggedIn(false);
	};

	return (
		<header>
			<Navbar className="border" style={{ height: "10vmin" }}>
				<Container>
					<Navbar.Brand>
						<Nav.Link onClick={() => navigate("/")} className="text-light">
							Pong Game
						</Nav.Link>
					</Navbar.Brand>
				</Container>
				<Container className="justify-content-end">
					<Nav>
						<Nav.Item>
							{isLoggedIn === false ? (
								<Button
									variant="outline-light"
									size="lg"
									onClick={() =>
										(window.location.href = `http://localhost:3001/login`)
									}
								>
									로그인
								</Button>
							) : (
								<>
									<Button
										variant="outline-light"
										size="lg"
										onClick={() => navigate("/profile")}
									>
										프로필
										{/* 프로필 컴포넌트 들어올 자리 */}
									</Button>
									<Button variant="outline-light" size="lg" onClick={logOut}>
										로그아웃
									</Button>
								</>
							)}
						</Nav.Item>
					</Nav>
				</Container>
			</Navbar>
		</header>
	);
}

export default NavBar;

{
	/* <Nav.Link
onClick={() =>
	(window.location.href = "http://localhost:3001/login")
}
className="text-light"
>
로그인
</Nav.Link> */
}
