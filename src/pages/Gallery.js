import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Box = styled.div`
	background: ${(props) => props.color || "#fff"};
	width: 900px;
	min-height: 100vh;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;
const Title = styled.h1`
	text-align: center;
`;
const PhotoGrid = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 16px; /* 사진 간격 */
	width: 100%;
`;
const PhotoItem = styled.div`
	flex: 0 0 calc(33.33% - 16px); /* 3개씩 배치, 간격 고려 */
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #f9f9f9;
	border: 1px solid #ddd;
	padding: 8px;
	img {
		max-width: 100%;
		height: auto;
	}
`;
const Gallery = () => {
	const [photos, setPhotos] = useState([]);
	const fetchPhotos = async () => {
		try {
			const response = await fetch("http://localhost:4000/gallery", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json(); // JSON 데이터 파싱
			setPhotos(data);
			console.log("Fetched photos:", data); // 콘솔에 데이터 출력
		} catch (error) {
			console.error("Error occurred while saving photos:", error);
			alert("저장 중 오류가 발생했습니다.");
		}
	};

	useEffect(() => {
		fetchPhotos();
	}, []);
	return (
		<Box>
			<Title />
			<PhotoGrid>
				{photos.map((photo, index) => (
					<PhotoItem key={index}>
						<img
							src={`http://localhost:4000/images/${photo.photoUrl}`}
							alt={`Photo ${index}`}
						/>
					</PhotoItem>
				))}
			</PhotoGrid>
		</Box>
	);
};

export default Gallery;
