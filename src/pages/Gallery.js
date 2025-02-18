import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoCloseCircleOutline, IoChevronBackCircle } from "react-icons/io5";
import { FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const Box = styled.div`
	background: ${(props) => props.color || "#fff"};
	width: 1200px;
	min-height: 100vh;
	margin: 50px auto;
	display: flex;
	align-items: center;
	flex-direction: column;
`;
const FlexContainer = styled.div`
	display: flex;
	width: 100%; /* 전체 너비를 사용 */
	justify-content: space-between; /* 두 요소를 양 끝에 배치 */
	align-items: center; /* 수직 중앙 정렬 */
`;
const Back = styled(IoChevronBackCircle)`
	font-size: 30px;
	cursor: pointer;
`;
const Title = styled.h2`
	text-align: center;
	width: 100%;
`;
const PhotoGrid = styled.div`
	display: flex;
	flex-wrap: wrap; /* 줄 바꿈을 허용 */
	justify-content: flex-start; /* 왼쪽 정렬 */
	gap: 20px; /* 사진 간격 */
	width: 100%;
	margin: 50px 0;
`;

const PhotoItem = styled.div`
	flex: 0 0 calc(33.33% - 14px); /* 3개씩 배치, 간격 고려 */
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #f9f9f9;
	border: 1px solid #ddd;
	padding: 8px;
	position: relative;
	aspect-ratio: 1; /* width와 height 비율을 1:1로 맞춤 */
	overflow: hidden;
	cursor: pointer;
	transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;
	img {
		height: 100%;
		object-fit: cover; /* 이미지가 넘치지 않도록 조정 */
		transition: transform 0.3s ease-in-out;
	}

	&:hover {
		background-color: #ddd;
		transform: scale(1.05); /* 전체 크기를 살짝 키움 */
	}
`;

// 모달 스타일
const ModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.7);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
`;

const ModalContent = styled.div`
	background: white;
	padding: 20px;
	border-radius: 10px;
	position: relative;
	width: 50%;
	height: 90%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	img {
		max-width: 100%;
		max-height: 90%;
		object-fit: contain;
	}
`;

const CloseButton = styled(IoCloseCircleOutline)`
	position: absolute;
	top: 10px;
	right: 10px;
	font-size: 30px;
	color: black;
	cursor: pointer;
	transition: color 0.2s ease-in-out;

	&:hover {
		color: red;
	}
`;

// 저장 버튼 스타일
const SaveButton = styled.button`
	margin-top: 20px;
	padding: 10px 20px;
	font-size: 16px;
	background-color: #333537;
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 10px;
	transition: background-color 0.2s ease-in-out;

	&:hover {
		background-color: #000;
	}
`;

// 로딩 인디케이터 스타일
const LoaderOverlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 999;
`;

const Gallery = () => {
	const [photos, setPhotos] = useState([]);
	const [selectedPhoto, setSelectedPhoto] = useState(null);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);

	const fetchPhotos = async () => {
		try {
			const response = await fetch("/api/gallery", {
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
			setLoading(false);
			console.log("Fetched photos:", data); // 콘솔에 데이터 출력
		} catch (error) {
			console.error("Error occurred while saving photos:", error);
			toast.error("사진을 가져오는데 오류가 발생하였습니다.");
		}
	};

	useEffect(() => {
		fetchPhotos();
	}, []);

	// 이미지 다운로드 함수
	const handleDownload = async (url) => {
		try {
			const response = await fetch(url);
			const blob = await response.blob();
			const blobUrl = window.URL.createObjectURL(blob);

			const link = document.createElement("a");
			link.href = blobUrl;
			link.download = url.split("/").pop();
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			window.URL.revokeObjectURL(blobUrl);
			toast.success("이미지가 다운로드 되었습니다.");
		} catch (error) {
			console.error("이미지 다운로드 실패:", error);
			toast.error("이미지를 다운로드할 수 없습니다.");
		}
	};

	return (
		<Box>
			{/* 로딩 인디케이터 */}
			{loading && (
				<LoaderOverlay>
					<ClipLoader color="#333537" size={50} />
				</LoaderOverlay>
			)}

			{/* 로딩 상태가 아닐 때만 내용 표시 */}
			{!loading && (
				<>
					<FlexContainer>
						<Back
							onClick={() => {
								navigate(-1);
							}}
						/>
						<Title>갤러리</Title>
					</FlexContainer>

					<PhotoGrid>
						{photos.map((photo, index) => (
							<PhotoItem
								key={index}
								onClick={() => setSelectedPhoto(photo.photoUrl)}
							>
								<img
									src={photo.photoUrl}
									alt={`Photo ${index}`}
								/>
							</PhotoItem>
						))}
					</PhotoGrid>
				</>
			)}

			{/* 모달 창 */}
			{selectedPhoto && (
				<ModalOverlay onClick={() => setSelectedPhoto(null)}>
					<ModalContent onClick={(e) => e.stopPropagation()}>
						<CloseButton onClick={() => setSelectedPhoto(null)} />
						<img src={selectedPhoto} alt="Selected" />
						<SaveButton
							onClick={() => handleDownload(selectedPhoto)}
						>
							<FaDownload /> 이미지 저장
						</SaveButton>
					</ModalContent>
				</ModalOverlay>
			)}
		</Box>
	);
};

export default Gallery;
