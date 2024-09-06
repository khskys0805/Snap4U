import styled from "styled-components";
import logo from "../imgs/logo2.png";

const Grid1 = styled.div`
	width: 180px;
	height: 500px;
	background: ${(props) => props.color || "#000"};
	transition: box-shadow 500ms ease-in-out;
	cursor: pointer;

	/* hover 스타일을 prop에 따라 조정 */
	&:hover {
		${(props) =>
			!props.disableHover &&
			`box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.3);
			 transform: scale(1.05);`}
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

const Frame1 = ({ handleChooseCut, disableHover, color }) => {
	const gridItems = Array(4).fill(null); //4개의 그리드 아이템 생성

	return (
		<Grid1
			onClick={handleChooseCut}
			disableHover={disableHover}
			color={color}
		>
			{gridItems.map((_, index) => (
				<GridItem1 key={index} />
			))}
			<Logo />
		</Grid1>
	);
};
export default Frame1;
