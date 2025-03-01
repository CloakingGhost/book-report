import React from 'react';
import styles from '../../styles/Card.module.css';
import { useDispatch } from 'react-redux';
import { selectCard } from '../../store/slices/selectedCardSlice';

export default function BaseCardImageLists() {
  const imageFiles = Array.from({ length: 9 }, (_, i) => `base${i + 1}.png`);
  const getImageUrl = (fileName) => new URL(`../../assets/${fileName}`, import.meta.url).href;

  const dispatch = useDispatch();

  function handleClickImage(e) {
    dispatch(selectCard({ imageId : -1, imageUrl: e.target.src }));
  }

  return (
    <ul className={styles.selectCardImageSection}>
      {imageFiles.map((image) => (
        <li key={image} className={styles.cardImageStyle}>
          <img src={getImageUrl(image)} alt="" onClick={handleClickImage} />
        </li>
      ))}
    </ul>
  );
}
