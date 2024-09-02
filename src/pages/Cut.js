import styled from "styled-components";
import logo from "../imgs/logo2.png";
import { useNavigate } from "react-router-dom";

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

const Logo = styled.img.attrs({
	src: logo,
	alt: "",
})`
	width: 130px;
	margin-top: 30px;
`;

const Grids = styled.div`
	display: flex;
`;
const Grid1 = styled.div`
	width: 180px;
	height: 500px;
	background: #000;
	margin-right: 40px;
	transition: box-shadow 500ms ease-in-out;
	cursor: pointer;

	&:hover {
		box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.3);
		transform: scale(1.05);
	}
`;

const GridItem1 = styled.div`
	width: 150px;
	height: 90px;
	background: #fff;
	margin: 15px 0 0 15px;
`;

const Grid2 = styled.div`
	width: 395px;
	height: 500px;
	background: #000;
	transition: box-shadow 500ms ease-in-out;
	cursor: pointer;

	&:hover {
		box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.3);
		transform: scale(1.05);
	}
`;

const GridWrap = styled.div`
	display: flex;
`;
const GridItem2 = styled.div`
	width: 175px;
	height: 195px;
	background: #fff;
	margin: 15px 0 0 15px;
`;

const Cut = () => {
	const navigate = useNavigate();

	const handleChooseCut = () => {
		navigate(`/camera`);
	};
	return (
		<Box color="white">
			<Title>사진 찍을 컷을 선택해주세요.</Title>
			<Grids>
				<Grid1 onClick={handleChooseCut}>
					<GridItem1 />
					<GridItem1 />
					<GridItem1 />
					<GridItem1 />
					<Logo />
				</Grid1>
				<Grid2>
					<GridWrap>
						<GridItem2 />
						<GridItem2 />
					</GridWrap>
					<GridWrap>
						<GridItem2 />
						<GridItem2 />
					</GridWrap>
					<Logo />
				</Grid2>
			</Grids>
		</Box>
	);
};
export default Cut;
