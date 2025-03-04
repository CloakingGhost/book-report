import React from 'react';
import style from '../../styles/BookReviewCard.module.css';
import { Link } from 'react-router-dom';

function BookReviewCard({ info }) {
  console.log('BookReviewCard', info);
  const { id, title, imageUrl, approved } = info;
  return (
    <Link to={`/reviews/${id}`}>
      <div className={style.bookReviewCard}>
        <div className={style.imageContainer}>
          <img src={imageUrl} alt={title} />
          <p>{title.length > 20 ? title.substring(0, 20) + '...' : title}</p>
        </div>
        {!approved && 비공개}
      </div>


    </Link>
  );
};

export default BookReviewCard;