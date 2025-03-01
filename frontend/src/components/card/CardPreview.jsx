import React, { useEffect, useState } from 'react';
import styles from '../../styles/Card.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addTitleInCard } from '../../store/slices/selectedCardSlice';

export default function CardPreview() {
  const selectedCard = useSelector((state) => state.selectedCard);
  const dispatch = useDispatch();
  
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(selectedCard.title || '');

  useEffect(() => {
    setInputValue(selectedCard.title || '');
  }, [selectedCard.title]);

  const startEditing = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (inputValue.trim() !== selectedCard.title) {
      dispatch(addTitleInCard({ title: inputValue.trim() }));
    }
  };

  return (
    <div className={styles.cardPreviewSection}>
      {selectedCard && <img src={selectedCard.imageUrl} alt="" className={styles.cardImage} />}

      {isEditing ? (
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          placeholder="한줄평을 작성해주세요."
          className={styles.inputText}
          autoFocus
        />
      ) : (
        <div className={styles.placeholderText} onClick={startEditing}>
          {selectedCard.title ? selectedCard.title : '한줄평을 작성해주세요.'}
        </div>
      )}
    </div>
  );
}
