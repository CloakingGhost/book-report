import React from 'react';
import styles from '../../styles/Card.module.css';

export default function BaseCardImageLists() {
  const imageFiles = Array.from({ length: 9 }, (_, i) => `base${i + 1}.png`);
  const getImageUrl = (fileName) => new URL(`../../assets/${fileName}`, import.meta.url).href;

  return (
    <div className={styles.selectCardImageSection}>
      {imageFiles.map((image) => (
        <div className={styles.cardImageStyle}>
          <img src={getImageUrl(image)} alt="" />
        </div>
      ))}
    </div>
  );
}
