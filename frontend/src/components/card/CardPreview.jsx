import React, { useState } from 'react';
import styles from '../../styles/Card.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addTitleInCard } from '../../store/slices/selectedCardSlice';

export default function CardPreview() {
  const selectedCard = useSelector((state) => state.selectedCard);
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const startEditing = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    const cardTitle = title;
    dispatch(addTitleInCard({ title: cardTitle }));
  };

  return (
    <div className={styles.cardPreviewSection}>
      <img src={selectedCard.imageUrl} alt="" className={styles.cardImage} />
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={handleInputChange}
          onBlur={handleBlur}
          placeholder="한줄평을 작성해주세요."
          className={styles.inputText}
        />
      ) : (
        <div className={styles.placeholderText} onClick={startEditing}>
          {title || '한줄평을 작성해주세요.'}
        </div>
      )}
    </div>
  );
}
