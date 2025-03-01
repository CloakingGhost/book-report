import React, { useEffect, useState } from 'react';
import styles from '../../styles/Card.module.css';
import { useDispatch } from 'react-redux';
import { selectCard } from '../../store/slices/selectedCardSlice';
import imageApi from '../../api/imageApi';

export default function UserCardImageLists() {
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchUserCardImages() {
      try {
        const response = await imageApi.getUserImages('CARD');
        const data = response.data;

        setImages(data.images.items);
      } catch (e) {
        console.error('이미지 불러오기 실패');
      }
    }
    fetchUserCardImages();
  }, []);

  function handleClickImage(e, imageId) {
    dispatch(selectCard({ imageId: imageId, imageUrl: e.target.src }));
  }

  async function createImages(image) {
    try {
      const response = await imageApi.createImage(image);
    } catch (e) {
      console.error('이미지 생성에 실패했습니다.');
    }
  }

  function addImage(e) {
    const addImages = Array.from(e.target.files);
    let imageUrlLists = [...images];

    addImages.forEach((image) => {
      createImages();
      const imageUrl = URL.createObjectURL(image);
      imageUrlLists.push(imageUrl);
    });

    if (imageUrlLists.length > 8) {
      alert('커스텀 이미지는 최대 8개까지 생성 가능합니다.');
      imageUrlLists = imageUrlLists.slice(0, 8);
    }

    setImages(imageUrlLists);
  }

  return (
    <div className={styles.selectCardImageSection}>
      {images.map((image, index) => (
        <div className={styles.cardImageStyle}>
          <img
            key={index}
            src={image.imageUrl}
            alt=""
            onClick={(e) => handleClickImage(e, image.id)}
          />
        </div>
      ))}
      <label htmlFor="image-file" className={styles.cardImageStyle}>
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          id="image-file"
          multiple
          hidden
          onChange={addImage}
        />
        <span>+</span>
      </label>
    </div>
  );
}
