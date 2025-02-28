import React from 'react';
import styles from '../../styles/Card.module.css';
import UserCardImageLists from './UserCardImageLists';
import BaseCardImageLists from './BaseCardImageLists';

export default function CardCreateSection() {
  return (
    <div className={styles.cardCreateSectionContainer}>
      <div className={styles.cardPreviewSection}>
        <img src="" alt="" />
        <input type="text" name="title" id="title" placeholder="한줄평을 작성해주세요." />
      </div>
      <BaseCardImageLists></BaseCardImageLists>
      <UserCardImageLists></UserCardImageLists>
    </div>
  );
}
