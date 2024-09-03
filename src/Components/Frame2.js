import styled from "styled-components";
import logo from "../imgs/logo2.png";

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

const Logo = styled.img.attrs({
	src: logo,
	alt: "",
})`
	width: 130px;
	margin-top: 30px;
`;

const Frame2 = ({ handleChooseCut }) => {
	return (
		<Grid2 onClick={handleChooseCut}>
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
	);
};
export default Frame2;
