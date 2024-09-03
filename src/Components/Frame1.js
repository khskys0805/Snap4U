import styled from "styled-components";
import logo from "../imgs/logo2.png";

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

const Logo = styled.img.attrs({
	src: logo,
	alt: "",
})`
	width: 130px;
	margin-top: 30px;
`;

const Frame1 = ({ handleChooseCut }) => {
	return (
		<Grid1 onClick={handleChooseCut}>
			<GridItem1 />
			<GridItem1 />
			<GridItem1 />
			<GridItem1 />
			<Logo />
		</Grid1>
	);
};
export default Frame1;
