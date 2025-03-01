import React from 'react';
import style from '../styles/BookReviewCard.module.css';
import { Link } from 'react-router-dom';
Link
function BookReviewCard({ bookReviewId, title, imageUrl, approved }) {
  return (
    <div className={style.bookReviewCard}>
      <p>{title.length > 20 ? title.substring(0, 20) + '...' : title}</p>
    </div>
  );
};

export default BookReviewCard;