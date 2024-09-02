import React, { useState } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
	background-color: #4caf50;
	border: none;
	color: white;
	padding: 10px 20px;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: 16px;
	margin: 10px;
	cursor: pointer;
	border-radius: 4px;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
`;

const PhotoGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	gap: 10px;
	margin: 20px 0;
`;

const Thumbnail = styled.img`
	width: 100%;
	cursor: pointer;
	border: ${(props) => (props.selected ? "4px solid #4caf50" : "none")};
`;

const PhotoSelection = ({ photos }) => {
	const [selectedPhotos, setSelectedPhotos] = useState([]);

	const toggleSelectPhoto = (photo) => {
		setSelectedPhotos((prevSelected) =>
			prevSelected.includes(photo)
				? prevSelected.fileter((p) => p !== photo)
				: [...prevSelected, photo]
		);
	};

	const saveSelectedPhotos = () => {
		if (selectedPhotos.length === 4) {
			console.log("Selected photos to save:", selectedPhotos);
		} else {
			alert("4개의 사진을 선택해주세요.");
		}
	};
	return (
		<Container>
			<PhotoGrid>
				{photos.map((photo, index) => (
					<Thumbnail
						key={index}
						src={photo}
						selected={selectedPhotos.includes(photo)}
						onClick={() => toggleSelectPhoto(photo)}
					/>
				))}
			</PhotoGrid>

			<StyledButton onClick={saveSelectedPhotos}>
				Save Selected Photos
			</StyledButton>
		</Container>
	);
};
export default PhotoSelection;
