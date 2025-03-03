import React, { useEffect, useState } from 'react';
import styles from '../../styles/Card.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addTitleInCard } from '../../store/slices/selectedCardSlice';

export default function CardPreview() {
  const selectedCard = useSelector((state) => state.selectedCard);
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState(selectedCard.title || '');

  useEffect(() => {
    setInputValue(selectedCard.title || '');
  }, [selectedCard.title]);

  const handleInputChange = (e) => {
    const inputText = e.target.value;

    if (inputText.length > 50) {
      inputText = inputText.slice(0, 50);
    }
    setInputValue(inputText);
  };

  const handleBlur = () => {
    if (inputValue.trim() !== selectedCard.title) {
      setInputValue(inputValue.trim())
      dispatch(addTitleInCard({ title: inputValue}));
    }
  };

  return (
    <div
      className={styles.cardPreviewSection}
      onClick={() => document.getElementById('hiddenTextarea').focus()}
    >
      {selectedCard && (
        <img src={selectedCard.imageUrl || null} alt="" className={styles.cardImage} />
      )}

      <div className={styles.displayText}>{inputValue || '한줄평 작성하기'}</div>

      <textarea
        id="hiddenTextarea"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        className={styles.hiddenInput}
      />
    </div>
  );
}
