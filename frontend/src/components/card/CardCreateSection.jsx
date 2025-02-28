import React, { useState } from 'react';
import styles from '../../styles/Card.module.css';
import UserCardImageLists from './UserCardImageLists';
import BaseCardImageLists from './BaseCardImageLists';
import CardPreview from './CardPreview';

export default function CardCreateSection() {
  const [isUserImage, setIsUserImage] = useState(false);

  function handleOnClick() {
    setIsUserImage(!isUserImage);
  }

  return (
    <div className={styles.cardCreateSectionContainer}>
      <CardPreview></CardPreview>
      <div>
        <div className={styles.cardImageTypeContainer}>
          <div className={styles.cardImageType} onClick={handleOnClick}>
            Basic
          </div>
          <div className={styles.cardImageType} onClick={handleOnClick}>
            My Image
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
