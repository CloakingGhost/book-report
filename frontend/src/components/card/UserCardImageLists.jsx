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

  async function createImages(addImages) {
    try {
      const response = await imageApi.createImage('CARD', addImages);
    } catch (e) {
      console.error('이미지 생성에 실패했습니다.');
    }
  }

  function addImage(e) {
    let addImages = Array.from(e.target.files);
    let imageUrlLists = [...images];

    const remainingSlots = 8 - imageUrlLists.length;

    if (remainingSlots === 0) {
      alert('커스텀 이미지는 최대 8개까지 생성 가능합니다.');
      return;
    }

    if (addImages.length > remainingSlots) {
      addImages = addImages.slice(0, remainingSlots);
    }

    const newImages = addImages.map((image) => {
      const imageUrl = URL.createObjectURL(image);
      return { imageUrl, id: image.name };
    });

    setImages((prevImages) => {
      const updatedImages = [...prevImages, ...newImages];

      return updatedImages.length > 8 ? updatedImages.slice(0, 8) : updatedImages;
    });

    createImages(addImages);
  }

  return (
    <ul className={styles.selectCardImageSection}>
      {images.map((image, index) => (
        <li key={index} className={styles.cardImageStyle}>
          <img src={image.imageUrl} alt="" onClick={(e) => handleClickImage(e, image.id)} />
        </li>
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
    </ul>
  );
}
