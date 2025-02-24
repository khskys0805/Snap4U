import styled from "styled-components";
import logo1 from "../imgs/logo.png";
import logo2 from "../imgs/logo2.png";

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	transition: transform 0.3s ease-in-out;

	@media (max-width: 899px) {
		transform: scale(0.85);
		transform-origin: center;
	}

	@media (max-width: 680px) {
		transform-origin: left;
	}

	@media (max-width: 599px) {
		transform: scale(0.65);
	}

	@media (max-width: 500px) {
		transform-origin: left;
	}
`;

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
	const gridItems = Array(4).fill(null);

	if (selectedPhotos && selectedPhotos.length > 0) {
		selectedPhotos.forEach((photo, index) => {
			if (index < 4) {
				gridItems[index] = photo;
			}
		});
	}

	return (
		<Container>
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
		</Container>
	);
};

export default Frame2;
