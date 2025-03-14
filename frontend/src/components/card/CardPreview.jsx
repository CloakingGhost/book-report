import React, { useEffect, useState } from 'react';
import styles from '../../styles/Card.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addTitleInCard } from '../../store/slices/selectedCardSlice';
import base9 from '../../assets/base9.png';

export default function CardPreview() {
  const selectedCard = useSelector((state) => state.selectedCard);
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState(selectedCard.title || '');

  useEffect(() => {
    setInputValue(selectedCard.title || '');
  }, [selectedCard.title]);

  const handleInputChange = (e) => {
    let inputText = e.target.value;

    if (inputText.length > 50) {
      inputText = inputText.slice(0, 50);
    }
    setInputValue(inputText);
  };

  const handleBlur = () => {
    if (inputValue.trim() !== selectedCard.title) {
      setInputValue(inputValue.trim());
      dispatch(addTitleInCard({ title: inputValue }));
    } 
  };

  return (
    <div
      className={styles.cardPreviewSection}
      onClick={() => document.getElementById('hiddenTextarea').focus()}
    >
      {selectedCard && (
        <img
          src={selectedCard.imageUrl || base9}
          alt=""
          className={styles.cardImage}
        />
      )}

      <div className={styles.displayText}>{inputValue || '이곳을 클릭하여\n 한줄평을 작성해보세요!'}</div>

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
