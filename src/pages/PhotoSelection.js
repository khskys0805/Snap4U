import React, { useState } from "react";
import styled from "styled-components";
import {
	TbCircleNumber1Filled,
	TbCircleNumber2Filled,
	TbCircleNumber3Filled,
	TbCircleNumber4Filled,
} from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const Title = styled.h2`
	font-size: 25px;
	margin-bottom: 50px;
`;

const Button = styled.button`
	background-color: #000;
	border: none;
	color: white;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: 16px;
	margin: 20px auto;
	width: 65px;
	height: 65px;
	cursor: pointer;
	border-radius: 50%;
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
		background-color: rgba(0, 0, 0, 0.7);
		opacity: ${(props) => (props.selected ? 1 : 0)};
		transition: opacity 0.3s ease;
	}
`;

const PhotoImage = styled.img`
	width: 100%;
	display: block;
`;

const icons = [
	TbCircleNumber1Filled,
	TbCircleNumber2Filled,
	TbCircleNumber3Filled,
	TbCircleNumber4Filled,
];

const CheckIcon = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%) scaleX(-1);
	color: white;
	font-size: 40px;
	opacity: ${(props) => (props.selected ? 1 : 0)};
	transition: opacity 0.3s ease;
	z-index: 2;
`;

const PhotoSelection = ({ photos }) => {
	const [selectedPhotos, setSelectedPhotos] = useState([]);
	const navigate = useNavigate();

	const toggleSelectPhoto = (photo) => {
		// 사용자가 특정 사진을 클릭했을 때, 그 사진이 이미 선택된 것인지 확인하기 위해 계산
		const selectedIndex = selectedPhotos.findIndex(
			(selected) => selected.url === photo
		);

		if (selectedIndex !== -1) {
			//이미 선택되어 있던 경우
			const newSelection = [...selectedPhotos];
			newSelection.splice(selectedIndex, 1); //선택된 사진에서 제거
			setSelectedPhotos(newSelection);
		} else {
			//선택되어 있지 않은 경우
			if (selectedPhotos.length < 4) {
				setSelectedPhotos([
					...selectedPhotos,
					{ url: photo, order: selectedPhotos.length },
				]);
			} else {
				alert("사진은 4장까지 선택이 가능합니다.");
			}
		}
	};

	const saveSelectedPhotos = () => {
		if (selectedPhotos.length === 4) {
			console.log("Selected photos to save:", selectedPhotos);
			navigate(`/frame`, { state: selectedPhotos });
		} else {
			alert("4개의 사진을 선택해주세요.");
		}
	};

	return (
		<Container>
			<Title>사진 4장을 선택해주세요.</Title>
			<PhotoGrid>
				{photos.map((photo, index) => {
					// 화면에 사진들을 렌더링할 때, 각 사진이 선택된 상태인지 확인하기 위해 계산
					const selectedIndex = selectedPhotos.findIndex(
						(selected) => selected.url === photo
					);
					const SelectedIcon = icons[selectedIndex];

					return (
						<Thumbnail
							key={index}
							selected={selectedIndex !== -1}
							onClick={() => toggleSelectPhoto(photo)}
						>
							<PhotoImage
								src={photo}
								alt={`Thumbnail ${index + 1}`}
							/>
							{selectedIndex !== -1 && (
								<CheckIcon selected={selectedIndex !== -1}>
									<SelectedIcon />
								</CheckIcon>
							)}
						</Thumbnail>
					);
				})}
			</PhotoGrid>

			<Button onClick={saveSelectedPhotos}>다음</Button>
		</Container>
	);
};

export default PhotoSelection;
