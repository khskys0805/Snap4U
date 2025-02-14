import styled from "styled-components";
import logo1 from "../imgs/logo.png";
import logo2 from "../imgs/logo2.png";

const Grid1 = styled.div`
	width: 180px;
	height: 500px;
	background: ${(props) => props.color || "#000"};
	transition: box-shadow 500ms ease-in-out;
	box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.15);
	cursor: pointer;

	/* hover 스타일을 prop에 따라 조정 */
	&:hover {
		${(props) => !props.disableHover && `transform: scale(1.05);`}
	}
`;

const GridItem1 = styled.div`
	width: 150px;
	height: 90px;
	background: ${({ photo }) => (photo ? `url(${photo.url})` : "#fff")};
	background-size: cover;
	background-position: center;
	margin: 15px 0 0 15px;
	transform: scaleX(-1);
`;

const Logo = styled.img.attrs(({ color }) => ({
	src: color === "#fff" ? logo1 : logo2,
	alt: "",
}))`
	width: 130px;
	margin-top: 30px;
`;

const Frame1 = ({ handleChooseCut, disableHover, color, selectedPhotos }) => {
	const gridItems = Array(4).fill(null);

	// selectedPhotos가 있을 때만 각 그리드에 사진을 채워 넣음
	if (selectedPhotos && selectedPhotos.length > 0) {
		selectedPhotos.forEach((photo, index) => {
			if (index < 4) {
				gridItems[index] = photo; // 최대 4개만 그리드에 표시
			}
		});
	}

	return (
		<Grid1
			onClick={handleChooseCut}
			disableHover={disableHover}
			color={color}
		>
			{gridItems.map((photo, index) => (
				<GridItem1 key={index} photo={photo} />
			))}
			<Logo color={color} />
		</Grid1>
	);
};
export default Frame1;
