import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import Webcam from "react-webcam";
import styled from "styled-components";
import { FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import cameraClickSound from "../sounds/camera-click.mp3";
import { toast } from "react-hot-toast";

// frame1과 frame2 비율에 맞는 videoConstraints 설정
const frame1VideoConstraints = {
	width: 1920,
	height: 1080,
	facingMode: "user",
};

const frame2VideoConstraints = {
	width: (35 / 39) * 700, // 35:39 비율로 width 계산
	height: 700, // height는 그대로 700px
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

	@media (max-width: 899px) {
		padding: 15px;
		font-size: 14px;
	}

	@media (max-width: 599px) {
		padding: 10px;
		font-size: 12px;
	}
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: inherit;
	margin-top: 20px;
`;

const Counter = styled.div`
	font-size: 18px;
	color: #000;

	@media (max-width: 899px) {
		font-size: 16px;
	}

	@media (max-width: 599px) {
		font-size: 14px;
	}
`;

const WebcamWrapper = styled.div`
	width: 100%;
	max-width: 850px; /* 최대 너비 설정 */
	margin: 0 auto;
	transform: scaleX(-1);

	@media (max-width: 899px) {
		width: 90%; /* 화면 크기에 맞게 크기 조정 */
	}
`;

const WebCamComponent = ({ setPhotos }) => {
	const [capturedPhotos, setCapturedPhotos] = useState([]);
	const navigate = useNavigate();
	const webcamRef = useRef(null);
	const audioRef = useRef(null);

	const location = useLocation();
	const { selectedFrame } = location.state || {}; // state가 없으면 기본값으로 빈 객체를 사용

	const capturePhoto = () => {
		const screenshot = webcamRef.current.getScreenshot();
		if (screenshot) {
			// 찰칵 소리 재생
			audioRef.current.play();

			const newPhotos = [...capturedPhotos, screenshot];
			setCapturedPhotos(newPhotos);

			if (newPhotos.length === 10) {
				setPhotos(newPhotos);
				navigate("/select", { state: { selectedFrame } });
			}
		}
	};

	return (
		<Container>
			{selectedFrame === "Frame1" && (
				<WebcamWrapper>
					<Webcam
						audio={false}
						height={510}
						screenshotFormat="image/jpeg"
						width="100%" /* 부모 요소에 맞게 크기 조정 */
						videoConstraints={frame1VideoConstraints}
						ref={webcamRef}
					/>
				</WebcamWrapper>
			)}
			{selectedFrame === "Frame2" && (
				<WebcamWrapper>
					<Webcam
						audio={false}
						height={500}
						screenshotFormat="image/jpeg"
						width="100%" /* 부모 요소에 맞게 크기 조정 */
						videoConstraints={frame2VideoConstraints}
						ref={webcamRef}
					/>
				</WebcamWrapper>
			)}

			<Button
				onClick={() => {
					if (capturedPhotos.length < 10) {
						capturePhoto();
					} else {
						toast.error(
							"이미 10장의 사진을 캡처했습니다. 더 이상 선택할 수 없습니다."
						);
					}
				}}
			>
				<FaCamera size={"25px"} />
			</Button>
			<Counter>찍힌 사진 수: {capturedPhotos.length} / 10</Counter>

			{/* 찰칵 소리 오디오 추가 */}
			<audio ref={audioRef} src={cameraClickSound} />
		</Container>
	);
};

export default WebCamComponent;
