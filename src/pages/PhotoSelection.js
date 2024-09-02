import React, { useState } from "react";
import styled from "styled-components";
import { FaCircleCheck } from "react-icons/fa6";

const Title = styled.h2`
	font-size: 25px;
	margin-bottom: 50px;
`;
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
	justify-content: center;
	height: 100%;
	margin: 0 20px;
`;

const PhotoGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	gap: 10px;
	margin: 20px 0;
`;

const Thumbnail = styled.div`
	position: relative;
	width: 100%;
	cursor: pointer;
	transform: scaleX(-1);
	overflow: hidden;

	&::after {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7); /* 반투명한 검은색 오버레이 */
		opacity: ${(props) => (props.selected ? 1 : 0)};
		transition: opacity 0.3s ease;
	}
`;

const PhotoImage = styled.img`
	width: 100%;
	display: block;
`;

const CheckIcon = styled(FaCircleCheck)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%) scaleX(-1);
	color: white;
	font-size: 30px;
	opacity: ${(props) => (props.selected ? 1 : 0)};
	transition: opacity 0.3s ease;
	z-index: 2;
`;

const PhotoSelection = ({ photos }) => {
	const [selectedPhotos, setSelectedPhotos] = useState([]);

	const toggleSelectPhoto = (photo) => {
		if (selectedPhotos.includes(photo)) {
			setSelectedPhotos(selectedPhotos.filter((p) => p !== photo));
		} else {
			if (selectedPhotos.length < 4) {
				setSelectedPhotos([...selectedPhotos, photo]);
			} else {
				alert("사진은 4장까지 선택이 가능합니다.");
			}
		}
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
			<Title>사진 4장을 선택해주세요.</Title>
			<PhotoGrid>
				{photos.map((photo, index) => (
					<Thumbnail
						key={index}
						selected={selectedPhotos.includes(photo)}
						onClick={() => toggleSelectPhoto(photo)}
					>
						<PhotoImage
							src={photo}
							alt={`Thumbnail ${index + 1}`}
						/>
						<CheckIcon selected={selectedPhotos.includes(photo)} />
					</Thumbnail>
				))}
			</PhotoGrid>

			<StyledButton onClick={saveSelectedPhotos}>
				Save Selected Photos
			</StyledButton>
		</Container>
	);
};
export default PhotoSelection;
