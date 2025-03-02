import React, { useState } from 'react';
import styles from '../../styles/Card.module.css';
import UserCardImageLists from './UserCardImageLists';
import BaseCardImageLists from './BaseCardImageLists';
import CardPreview from './CardPreview';

export default function CardCreateSection() {
  const [imageType, setImageType] = useState('base');

  function handleOnClick(type) {
    setImageType(type);
  }

  return (
    <div className={styles.cardCreateSectionContainer}>
      <CardPreview></CardPreview>
      <div>
        <div className={styles.cardImageTypeContainer}>
          <div key={'base'} className={styles.cardImageType} onClick={() => handleOnClick('base')}>
            Basic
          </div>
          <div key={'user'} className={styles.cardImageType} onClick={() => handleOnClick('user')}>
            My Image
          </div>
        </div>
        {imageType === 'base' && <BaseCardImageLists></BaseCardImageLists>}
        {imageType === 'user' && <UserCardImageLists></UserCardImageLists>}
      </div>
    </div>
  );
}
