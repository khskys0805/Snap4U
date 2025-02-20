import React from "react";
import styled from "styled-components";
import logo from "../imgs/logo.png";
import { useNavigate } from "react-router-dom";

// Box, Logo, Title, Buttons, Button 스타일은 그대로 유지합니다.
const Box = styled.div`
	background: ${(props) => props.color || "#fff"};
	width: 90%;
	max-width: 900px;
	height: 100%;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const Logo = styled.img.attrs({
	src: logo,
	alt: "",
})`
	width: 170px; /* 기본 크기 */
	margin-bottom: 30px;

	@media (min-width: 768px) {
		width: 200px;
		margin-bottom: 40px;
	}
`;

const Title = styled.h1`
	font-size: clamp(22px, 5vw, 30px);
	margin-bottom: 100px;
`;

const Buttons = styled.div`
	display: flex;
	flex-direction: column; /* 기본값: 세로 정렬 */

	@media (min-width: 600px) {
		flex-direction: row; /* 태블릿 이상: 가로 정렬 */
	}
`;

const Button = styled.button`
	background: black;
	width: 100px;
	height: 100px;
	color: white;
	border-radius: 50%;
	border: none;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
	transition: box-shadow 1s ease-in-out;
	font-size: 16px;
	margin-bottom: 20px;

	&:hover {
		background: rgba(255, 255, 255, 0.9);
		color: #000;
		box-shadow: 0 0 20px 0 rgba(172, 172, 172, 0.9);
	}
	@media (min-width: 600px) {
		width: 120px;
		height: 120px;
		font-size: 18px;
		margin-bottom: 0; /* 가로 정렬 시 간격 제거 */
	}

	&:nth-of-type(1) {
		margin-right: 0;
	}
	@media (min-width: 600px) {
		&:nth-of-type(1) {
			margin-right: 50px; /* 태블릿 이상에서는 오른쪽 여백 추가 */
		}
	}
`;

// Home 컴포넌트 정의
const Home = () => {
	const navigate = useNavigate();

	const handleOnClick = (destination) => {
		navigate(destination);
	};

	return (
		<Box>
			<Logo />
			<Title>당신을 위한 스냅을 기록해보세요.</Title>
			<Buttons>
				<Button onClick={() => handleOnClick(`/cut`)}>사진 찍기</Button>
				<Button onClick={() => handleOnClick(`/gallery`)}>
					갤러리
				</Button>
			</Buttons>
		</Box>
	);
};

export default Home;
