import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";
import { FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import cameraClickSound from "../sounds/camera-click.mp3";

const videoConstraints = {
	width: 900,
	height: 540,
	facingMode: "user",
};

const Button = styled.button`
	background-color: #000;
	border: none;
	color: white;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: 16px;
	margin: 20px auto;
	padding: 20px;
	cursor: pointer;
	border-radius: 50%;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	margin-top: 20px;
`;

const Counter = styled.div`
	font-size: 18px;
	color: #000;
`;

const WebCamComponent = ({ setPhotos }) => {
	const [capturedPhotos, setCapturedPhotos] = useState([]);
	const navigate = useNavigate();
	const webcamRef = useRef(null);
	const audioRef = useRef(null);

	const capturePhoto = () => {
		const screenshot = webcamRef.current.getScreenshot();
		if (screenshot) {
			// 찰칵 소리 재생
			audioRef.current.play();

			const newPhotos = [...capturedPhotos, screenshot];
			setCapturedPhotos(newPhotos);

			if (newPhotos.length === 10) {
				setPhotos(newPhotos);
				navigate("/select");
			}
		}
	};

	return (
		<Container>
			<Webcam
				audio={false}
				height={540}
				screenshotFormat="image/jpeg"
				width={900}
				videoConstraints={videoConstraints}
				style={{ transform: "scaleX(-1)" }}
				ref={webcamRef}
			/>
			<Button
				onClick={() => {
					if (capturedPhotos.length < 10) {
						capturePhoto();
					} else {
						alert("이미 10장의 사진을 캡처했습니다.");
					}
				}}
			>
				<FaCamera size={"30px"} />
			</Button>
			<Counter>찍힌 사진 수: {capturedPhotos.length} / 10</Counter>

			{/* 찰칵 소리 오디오 추가 */}
			<audio ref={audioRef} src={cameraClickSound} />
		</Container>
	);
};

export default WebCamComponent;
