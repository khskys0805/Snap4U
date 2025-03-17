import React, { useState, useRef } from "react";
import styled from "styled-components";
import Frame1 from "../Components/Frame1.js";
import Frame2 from "../Components/Frame2.js";
import { FaCheck } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import logo1 from "../imgs/logo.png";
import logo2 from "../imgs/logo2.png";
import { toast } from "react-hot-toast";

const Box = styled.div`
	background: ${(props) => props.color || "#fff"};
	width: 90%;
	max-width: 900px;
	min-height: 100vh;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	text-align: center;
`;

const Title = styled.h1`
	font-size: 25px;
	margin-bottom: 30px;

	@media (max-width: 599px) {
		margin: 40px 0 0 0;
	}
	@media (max-width: 899px) {
		margin: 20px 0 0 0;
	}
`;

const Layout = styled.div`
	display: flex;
	align-items: center;
`;

const Palette = styled.div`
	margin-right: ${(props) =>
		props.frameType === "Frame2" ? "20px" : "80px"};

	@media (max-width: 899px) {
		margin-left: ${(props) => props.frameType === "Frame2" && "5%"};
	}
	@media (max-width: 670px) {
		margin-left: ${(props) => props.frameType === "Frame2" && "7%"};
	}
	@media (max-width: 599px) {
		margin-right: 20px;
		transform: scale(0.85);
		margin-left: ${(props) => props.frameType === "Frame2" && "12%"};
	}
`;

const ColorLayout = styled.div`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	gap: 20px;
	// margin-bottom: 30px;

	@media (max-width: 899px) {
		grid-template-columns: repeat(4, 1fr);
	}

	@media (max-width: 730px) {
		grid-template-columns: repeat(3, 1fr);
	}

	@media (max-width: 599px) {
		grid-template-columns: repeat(2, 1fr); /* 2개씩 정렬 */
		grid-template-rows: repeat(5, 1fr); /* 5개 행으로 설정 */
		margin-bottom: 0;
	}
`;

const Color = styled.div`
	width: 50px;
	height: 50px;
	border-radius: 50%;
	box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);
	background: ${(props) => props.color || "#fff"};
	transition: background 1s ease;
	cursor: pointer;
	position: relative;

	&::after {
		content: "";
		width: 50px;
		height: 50px;
		position: absolute;
		left: 0;
		top: 0;
		background: rgba(0, 0, 0, ${(props) => (props.isSelected ? 0.7 : 0)});
		border-radius: 50%;
		transition: background 0.3s ease;
	}

	& > svg {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: white;
		opacity: ${(props) => (props.isSelected ? 1 : 0)};
		transition: opacity 0.3s ease;
		z-index: 2;
	}
`;

const colors = [
	"#f3c9e8",
	"#ffe252",
	"#abda95",
	"#a0ffd1",
	"#98cfff",
	"#dab3ff",
	"#fff",
	"#cecece",
	"#0d1544",
	"#000",
];

const FrameLayout = styled.div`
	display: flex;
	align-items: center;
`;

const Button = styled.button`
	background-color: #000;
	border: none;
	color: white;
	text-align: center;
	display: inline-block;
	font-size: 16px;
	margin: 0 auto;
	width: 65px;
	height: 65px;
	cursor: pointer;
	border-radius: 50%;
`;

const SelectFrame = () => {
	const [selectColor, setSelectColor] = useState("#000");
	const location = useLocation();
	const selectedPhotos = location.state?.selectedPhotos || [];
	const selectedFrame = location.state?.selectedFrame || ""; // ✅ 올바른 변수명
	console.log(selectedPhotos);
	const canvasRef = useRef(null);
	const navigate = useNavigate();

	const saveSelectedPhotos = async () => {
		try {
			const combinedImage = await createCombinedImage(
				selectedPhotos,
				selectColor,
				selectedFrame
			);

			const response = await fetch("/api/saveSelection", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					photoUrl: combinedImage,
					frameColor: selectColor,
				}),
			});

			if (response.ok) {
				console.log("Photo saved successfully.");
			} else {
				console.log("Error saving photo:", response.statusText);
			}

			toast.success("사진과 프레임 색상이 저장되었습니다.");
			URL.revokeObjectURL(combinedImage);
			navigate(`/`);
		} catch (error) {
			console.error("Error occurred while saving photos:", error);
			toast.error("저장 중 오류가 발생했습니다.");
		}
	};

	const createCombinedImage = async (
		selectedPhotos,
		frameColor,
		selectedFrame
	) => {
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");
		ctx.imageSmoothingEnabled = true;
		ctx.imageSmoothingQuality = "high";

		let frameWidth, frameHeight, imageWidth, imageHeight, padding;
		const scale = 3;

		if (selectedFrame === "Frame2") {
			// Frame2 설정
			frameWidth = 395 * scale;
			frameHeight = 500 * scale;
			imageWidth = 175 * scale;
			imageHeight = 195 * scale;
			padding = 15 * scale;
		} else {
			// 기본 Frame1 설정
			frameWidth = 180 * scale;
			frameHeight = 500 * scale;
			imageWidth = 150 * scale;
			imageHeight = 90 * scale;
			padding = 15 * scale;
		}

		canvas.width = frameWidth;
		canvas.height = frameHeight;

		// 프레임 색상 설정
		ctx.fillStyle = frameColor;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		let lastImageY = 0;

		for (let i = 0; i < selectedPhotos.length; i++) {
			const img = new Image();
			img.src = selectedPhotos[i].url;

			await new Promise((resolve) => {
				img.onload = () => {
					let x, y;
					if (selectedFrame === "Frame2") {
						// 2개씩 배치
						x = (i % 2) * (imageWidth + padding) + padding;
						y =
							Math.floor(i / 2) * (imageHeight + padding) +
							padding;
					} else {
						// 기존 방식 (세로로 4개)
						x = padding;
						y = i * (imageHeight + padding) + padding;
					}

					lastImageY = y + imageHeight;

					// 좌우 반전 설정
					ctx.save();
					ctx.scale(-1, 1);
					ctx.drawImage(
						img,
						-x - imageWidth,
						y,
						imageWidth,
						imageHeight
					);
					ctx.restore();

					resolve();
				};
				img.onerror = () => resolve();
			});
		}

		const logo = new Image();
		logo.src = frameColor === "#fff" ? logo1 : logo2;

		await new Promise((resolve) => {
			logo.onload = () => {
				const logoWidth = 130 * scale; // Frame2일 때 로고 크기 3배
				const logoHeight = 25 * scale; // Frame2일 때 로고 크기 3배

				const remainingHeight = frameHeight - lastImageY;
				const logoY = lastImageY + (remainingHeight - logoHeight) / 2;

				ctx.drawImage(
					logo,
					(frameWidth - logoWidth) / 2,
					logoY,
					logoWidth,
					logoHeight
				);
				resolve();
			};
			logo.onerror = () => resolve();
		});

		return canvas.toDataURL("image/png");
	};

	const handleSelectColor = (color) => {
		setSelectColor(color);
	};

	return (
		<Box>
			<Title>프레임을 선택해주세요.</Title>
			<Layout>
				<Palette frameType={selectedFrame}>
					<ColorLayout>
						{colors.map((color, index) => (
							<Color
								key={index}
								color={color}
								isSelected={selectColor === color}
								onClick={() => handleSelectColor(color)}
							>
								<FaCheck />
							</Color>
						))}
					</ColorLayout>
				</Palette>
				<FrameLayout>
					{selectedFrame === "Frame1" && (
						<Frame1
							disableHover={true}
							color={selectColor}
							selectedPhotos={selectedPhotos}
						/>
					)}
					{selectedFrame === "Frame2" && (
						<Frame2
							disableHover={true}
							color={selectColor}
							selectedPhotos={selectedPhotos}
							isPhotoSelected={true}
						/>
					)}
				</FrameLayout>
			</Layout>
			<canvas ref={canvasRef} style={{ display: "none" }} />
			<Button onClick={saveSelectedPhotos}>저장</Button>
		</Box>
	);
};

export default SelectFrame;
