import styled from "styled-components";
import logo1 from "../imgs/logo.png";
import logo2 from "../imgs/logo2.png";

const Grid2 = styled.div`
	width: 395px;
	height: 500px;
	background: ${(props) => props.color || "#000"};
	transition: box-shadow 500ms ease-in-out;
	box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.15);
	cursor: pointer;
	transform: ${(props) =>
		props.isPhotoSelected ? "scale(0.9)" : "scale(1)"};

	&:hover {
		${(props) => !props.disableHover && `transform: scale(1.05);`}
	}
`;

const GridWrap = styled.div`
	display: flex;
`;

const GridItem2 = styled.div`
	width: 175px;
	height: 195px;
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

const Frame2 = ({
	handleChooseCut,
	disableHover,
	color,
	selectedPhotos,
	isPhotoSelected,
}) => {
	// gridItems는 기본적으로 null로 채워진 배열로 초기화
	const gridItems = Array(4).fill(null);

	// selectedPhotos가 있을 경우, 해당 항목을 gridItems 배열에 할당
	if (selectedPhotos && selectedPhotos.length > 0) {
		selectedPhotos.forEach((photo, index) => {
			if (index < 4) {
				gridItems[index] = photo; // 최대 4개만 그리드에 표시
			}
		});
	}

	return (
		<Grid2
			onClick={handleChooseCut}
			disableHover={disableHover}
			color={color}
			isPhotoSelected={isPhotoSelected}
		>
			<GridWrap>
				{gridItems.slice(0, 2).map((photo, index) => (
					<GridItem2 key={index} photo={photo} />
				))}
			</GridWrap>
			<GridWrap>
				{gridItems.slice(2, 4).map((photo, index) => (
					<GridItem2 key={index} photo={photo} />
				))}
			</GridWrap>
			<Logo color={color} />
		</Grid2>
	);
};

export default Frame2;
