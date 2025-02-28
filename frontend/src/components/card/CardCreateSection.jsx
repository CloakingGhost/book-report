import React, { useState } from 'react';
import styles from '../../styles/Card.module.css';
import UserCardImageLists from './UserCardImageLists';
import BaseCardImageLists from './BaseCardImageLists';

export default function CardCreateSection() {
  const [isUserImage, setIsUserImage] = useState(false);

  function handleOnClick() {
    setIsUserImage(!isUserImage);
  }

  return (
    <div className={styles.cardCreateSectionContainer}>
      <div className={styles.cardPreviewSection}>
        <img src="" alt="" />
        <input type="text" name="title" id="title" placeholder="한줄평을 작성해주세요." />
      </div>
      <div>
        <div className={styles.cardImageTypeContainer}>
          <div className={styles.cardImageType} onClick={handleOnClick}>
            기본 이미지
          </div>
          <div className={styles.cardImageType} onClick={handleOnClick}>
            나만의 이미지
          </div>
        </div>
        {isUserImage ? (
          <UserCardImageLists></UserCardImageLists>
        ) : (
          <BaseCardImageLists></BaseCardImageLists>
        )}
      </div>
    </div>
  );
}
