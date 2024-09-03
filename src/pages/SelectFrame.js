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

const SelectFrame = () => {
	return (
		<Box>
			<Title>프레임을 선택해주세요.</Title>
		</Box>
	);
};
export default SelectFrame;
