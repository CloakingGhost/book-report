import React, { useState } from 'react';
import styles from '../../styles/Card.module.css';
import { useDispatch } from 'react-redux';
import { selectCard } from '../../store/slices/selectedCardSlice';

export default function BaseCardImageLists() {
  const [selectedImageId, setSelectedImageId] = useState(null);

  const imageFiles = Array.from({ length: 9 }, (_, i) => ({
    fileName: `base${i + 1}.png`,
    imageId: -(i + 1),
  }));
  const getImageUrl = (fileName) => new URL(`../../assets/${fileName}`, import.meta.url).href;

  const dispatch = useDispatch();

  function handleClickImage(imageId, imageUrl) {
    setSelectedImageId(imageId);
    dispatch(selectCard({ imageId, imageUrl }));
  }

  return (
    <ul className={styles.selectCardImageSection}>
      {imageFiles.map(({ fileName, imageId }) => (
        <li
          key={fileName}
          className={`${styles.cardImageStyle} ${selectedImageId === imageId ? styles.selected : ''}`}
        >
          <img
            src={getImageUrl(fileName)}
            alt=""
            onClick={() => handleClickImage(imageId, getImageUrl(fileName))}
          />
        </li>
      ))}
    </ul>
  );
}
