import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Frame1 from "../Components/Frame1";
import { FaCheck } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Box = styled.div`
	background: ${(props) => props.color || "#fff"};
	width: 900px;
	min-height: 100vh; /* 화면 전체 높이를 차지하도록 수정 */
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const Title = styled.h1`
	font-size: 25px;
	margin-bottom: 50px;
`;
const Layout = styled.div`
	display: flex;
	align-items: center; /* 세로로 중앙 정렬 */
`;
const Palette = styled.div`
	margin-right: 80px; /* 팔레트와 Frame1 간의 간격 추가 */
`;
const ColorLayout = styled.div`
	display: flex;
	flex-wrap: wrap;
`;
const Color = styled.div`
	width: 50px;
	height: 50px;
	border-radius: 50%;
	margin: 0 20px 20px 0;
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

	/* 아이콘 위치 */
	& > svg {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: white; /* 아이콘 색상 */
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
	align-items: center; /* Frame1을 세로 중앙 정렬 */
`;

const SelectFrame = () => {
	const [selectColor, setSelectColor] = useState("#000");
	const location = useLocation();
	const selectedPhotos = location.state?.selectedPhotos || []; // 빈 배열을 기본값으로 설정

	useEffect(() => {
		console.log(selectedPhotos);
	}, []);
	const handleSelectColor = (color) => {
		setSelectColor(color);
	};
	return (
		<Box>
			<Title>프레임을 선택해주세요.</Title>
			<Layout>
				<Palette>
					<ColorLayout>
						{colors.slice(0, 5).map((color, index) => (
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
					<ColorLayout>
						{colors.slice(5, 10).map((color, index) => (
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
					<Frame1
						disableHover={true}
						color={selectColor}
						selectedPhotos={selectedPhotos}
					/>
				</FrameLayout>
			</Layout>
		</Box>
	);
};
export default SelectFrame;
