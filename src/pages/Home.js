import React from "react";
import styled from "styled-components";
import logo from "../imgs/logo.png";
import { useNavigate } from "react-router-dom";

// Box, Logo, Title, Buttons, Button 스타일은 그대로 유지합니다.
const Box = styled.div`
	background: ${(props) => props.color || "blue"};
	width: 900px;
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
	width: 200px;
	margin-bottom: 40px;
`;

const Title = styled.h1`
	font-size: 30px;
	margin-bottom: 100px;
`;

const Buttons = styled.div`
	display: flex;
`;

const Button = styled.button`
	background: black;
	width: 120px;
	height: 120px;
	color: white;
	border-radius: 50%;
	border: none;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
	transition: box-shadow 1s ease-in-out;
	font-size: 18px;

	&:hover {
		background: rgba(255, 255, 255, 0.9);
		color: #000;
		box-shadow: 0 0 20px 0 rgba(172, 172, 172, 0.9);
	}
	&:nth-of-type(1) {
		margin-right: 50px;
	}
`;

// Home 컴포넌트 정의
const Home = () => {
	const navigate = useNavigate();

	const handleOnClick = () => {
		navigate(`/cut`);
	};

	return (
		<Box color="white">
			<Logo />
			<Title>당신을 위한 스냅을 기록해보세요.</Title>
			<Buttons>
				<Button onClick={handleOnClick}>사진 찍기</Button>
				<Button>갤러리</Button>
			</Buttons>
		</Box>
	);
};

export default Home;
