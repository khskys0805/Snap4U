import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Frame1 from "../Components/Frame1.js";
import Frame2 from "../Components/Frame2.js";

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

const Title = styled.h2`
	font-size: 25px;
	margin-bottom: 50px;
`;

const Grids = styled.div`
	display: flex;
	& > *:not(:last-child) {
		margin-right: 40px;
	}
`;

const Cut = () => {
	const navigate = useNavigate();

	const handleChooseCut = (frame) => {
		navigate("/camera", { state: { selectedFrame: frame } }); // 선택된 프레임을 state로 넘김
	};
	return (
		<Box color="white">
			<Title>사진 찍을 컷을 선택해주세요.</Title>
			<Grids>
				<Frame1 handleChooseCut={() => handleChooseCut("Frame1")} />
				<Frame2 handleChooseCut={() => handleChooseCut("Frame2")} />
			</Grids>
		</Box>
	);
};
export default Cut;
