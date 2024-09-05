import React from "react";
import styled from "styled-components";

const Box = styled.div`
	background: ${(props) => props.color || "#fff"};
	width: 900px;
	height: 100%;
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

const Palette = styled.div`
	width: 500px;
`;
const ColorLayout = styled.div`
	display: flex;
`;
const Color = styled.div`
	width: 50px;
	height: 50px;
	border-radius: 50%;
	margin: 0 20px 20px 0;
	box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);
	background: ${(props) => props.color || "#fff"};
`;

const SelectFrame = () => {
	return (
		<Box>
			<Title>프레임을 선택해주세요.</Title>
			<Palette>
				<ColorLayout>
					<Color color="#ffb3f0" />
					<Color color="#ffe252" />
					<Color color="#abda95" />
					<Color color="#a0ffd1" />

					<Color color="#98cfff" />
				</ColorLayout>
				<ColorLayout>
					<Color color="#dab3ff" />
					<Color color="#fff" />
					<Color color="#cecece" />
					<Color color="#0d1544" />
					<Color color="#000" />
				</ColorLayout>
			</Palette>
		</Box>
	);
};
export default SelectFrame;
