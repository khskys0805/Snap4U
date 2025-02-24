import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Frame1 from "../Components/Frame1.js";
import Frame2 from "../Components/Frame2.js";

const Box = styled.div`
	background: ${(props) => props.color || "blue"};
	width: 90%;
	max-width: 900px;
	height: 100%;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	@media (max-width: 599px) {
		width: 96%;
	}
`;

const Title = styled.h2`
	font-size: clamp(22px, 4vw, 25px);
	margin-bottom: 50px;
	text-align: center;
`;

const Grids = styled.div`
	display: flex;
	margin: 0 auto;

	& > *:not(:last-child) {
		margin-right: 40px;
	}
	@media (max-width: 600px) {
		& > *:not(:last-child) {
			margin-right: 0;
		}
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
