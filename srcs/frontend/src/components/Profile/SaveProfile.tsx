import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { api } from "../../axios/api";
import CheckVerifyingOffModal from "./CheckVerifyingOffModal";
import VerifyingCodeModal from "./VerifyingCodeModal";

type SaveProfileComponent = {
	userData: {
		intraID: string;
		name: string;
		nickName: string;
		phone: string;
		verified: boolean;
	};
	isChangedData: boolean;
	setChangedData: (isChangedData: boolean) => any;
};

function SaveProfile({
	userData,
	isChangedData,
	setChangedData,
}: SaveProfileComponent) {
	const navigate = useNavigate();
	// const [file, setFile] = useState<string | Blob>();
	const [nick_name, setNickName] = useState(userData.nickName || "");
	const [phone_number, setPhoneNumber] = useState(userData.phone || "");
	const [isDuplicated, setDuplicated] = useState("no_check");
	const [isCertificated, setCertificated] = useState(
		userData.verified || false
	);
	const [vcmShow, setVCModalShow] = useState(false);
	const [cvomShow, setCVOModalShow] = useState(false);

	const checkDuplicate = async () => {
		if (nick_name === null || nick_name === "" || nick_name === undefined)
			return;
		else {
			if (userData.nickName === nick_name) setDuplicated("same");
			else {
				try {
					const res = await api.get(`/user/check?nickname=${nick_name}`);
					const { ok } = res.data;
					setDuplicated(`${!ok}`);
				} catch (e) {
					console.log(e);
				}
			}
		}
	};

	const getDuplicateResult = () => {
		if (isDuplicated === "no_check" || isDuplicated === "same") return "";
		else if (isDuplicated === "true") return "❌";
		else return "✅";
	};

	const handleCertificate = async (e: any) => {
		if (!isCertificated) {
			if (
				phone_number === null ||
				phone_number === "" ||
				phone_number === undefined
			)
				alert("☎️ 전화번호를 입력해주세요.");
			else {
				if (!userData.verified) {
					if (userData.phone === null) {
						if (phone_number.length !== 11 || !Number(phone_number)) {
							alert("☎️ 전화번호 형식이 올바르지 않습니다.");
							return;
						}
						await api.post(`/tfa/send?phone=${phone_number}`);
					} else await api.post(`/tfa/send?phone=${userData.phone}`);
					setVCModalShow(true);
				} else {
					setCertificated(true);
				}
			}
		} else {
			setCVOModalShow(true);
		}
	};

	// const handleFileChange = (e: any) => {
	// 	setFile(e.target.files[0]);
	// };

	const handleSubmit = async () => {
		if (nick_name == "" || nick_name == null || nick_name == undefined) {
			alert("닉네임을 작성해주세요.");
			return;
		}
		if (phone_number.length !== 11 || !Number(phone_number)) {
			alert("☎️ 전화번호 형식이 올바르지 않습니다.");
			return;
		}
		if (
			isDuplicated === "same" ||
			isDuplicated === "false" ||
			nick_name === userData.nickName
		) {
			try {
				await api.patch("/user/update", {
					nickname: nick_name,
					phone: phone_number,
					verified: isCertificated,
				});
				// if (file) {
				// 	const formData = new FormData();
				// 	formData.append("file", file!);
				// 	await api.post("/user/avatar", formData);
				// }
				setChangedData(!isChangedData);
				navigate("/");
			} catch (e) {
				console.error(e);
			}
		} else {
			alert("닉네임 중복 체크를 해주세요");
		}
	};

	return (
		<>
			<Container className="pt-5">
				<Card className="bg-transparent border p-3">
					<Card.Body>
						<Card.Title className="text-white">프로필</Card.Title>
						<Form className="border-top p-4">
							{/* <Form.Group className="mb-3" controlId="formAvatar">
								<Form.Label className="text-white">프로필 사진</Form.Label>
								<Form.Control
									type="file"
									placeholder="Intra ID"
									className="bg-transparent text-white"
									// value={avatar}
									accept="image/*"
									onChange={handleFileChange}
								/>
							</Form.Group> */}
							<Form.Group className="mb-3" controlId="formIntraID">
								<Form.Label className="text-white">Intra ID</Form.Label>
								<Form.Control
									type="text"
									placeholder="Intra ID"
									className="bg-transparent text-white"
									value={`${userData.intraID}`}
									disabled
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formName">
								<Form.Label className="text-white">이름</Form.Label>
								<Form.Control
									type="text"
									placeholder="Name"
									className="bg-transparent text-white"
									value={`${userData.name}`}
									disabled
								/>
							</Form.Group>
							<Row className="d-flex">
								<Col xs={9}>
									<Form.Group className="mb-3" controlId="formNickName">
										<Form.Label className="text-white">닉네임</Form.Label>
										<Form.Control
											type="text"
											placeholder="Nickname"
											className="bg-transparent text-white"
											value={nick_name}
											onChange={(e) => setNickName(e.target.value)}
										/>
									</Form.Group>
								</Col>
								<Col xs="auto" className="mt-4 pt-2">
									<Button variant="outline-light" onClick={checkDuplicate}>
										체크
									</Button>
								</Col>
								<Col xs="auto" className="mt-4 pt-3">
									{getDuplicateResult()}
								</Col>
							</Row>
							<Form.Group className="mb-3" controlId="formPhoneNumber">
								<Form.Label className="text-white">전화번호</Form.Label>
								<Form.Control
									type="tel"
									placeholder="'-' 없이 숫자만 입력"
									className="bg-transparent text-white"
									value={phone_number === "null" ? "" : phone_number}
									onChange={(e) => setPhoneNumber(e.target.value)}
								/>
							</Form.Group>
							<Form.Check
								type="switch"
								id="custom-switch"
								label="2차 인증"
								className="text-white"
								onChange={handleCertificate}
								checked={isCertificated}
							/>
							<Container className="pt-3">
								<Row className="mt-3">
									<Button variant="outline-light" onClick={handleSubmit}>
										저장하기
									</Button>
								</Row>
							</Container>
						</Form>
					</Card.Body>
				</Card>
			</Container>
			<VerifyingCodeModal
				vcmShow={vcmShow}
				setVCModalShow={setVCModalShow}
				setCertificated={setCertificated}
			/>
			<CheckVerifyingOffModal
				cvomShow={cvomShow}
				setCVOModalShow={setCVOModalShow}
				setCertificated={setCertificated}
			/>
		</>
	);
}

export default SaveProfile;
