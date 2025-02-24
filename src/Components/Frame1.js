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
	}

	@media (max-width: 599px) {
		transform: scale(0.65);
	}
`;

const Grid1 = styled.div`
	width: 180px;
	height: 500px;
	background: ${(props) => props.color || "#000"};
	transition: box-shadow 500ms ease-in-out;
	box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.15);
	cursor: pointer;

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

	if (selectedPhotos && selectedPhotos.length > 0) {
		selectedPhotos.forEach((photo, index) => {
			if (index < 4) {
				gridItems[index] = photo;
			}
		});
	}

	return (
		<Container>
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
		</Container>
	);
};

export default Frame1;
