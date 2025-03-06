import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import authApi from '../api/authApi';
import CardComponent from '../components/card/CardComponent';
import style from '../styles/CardComponents.module.css';

export default function UserBookReview() {
  const { username } = useParams();
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      if (hasNext) {
        try {
          const response = await authApi.getUserReviews(username, page);
          const reviews = response.data.userBookReviews || [];

          setHasNext(response.data.hasNext);
          setItems((prevItems) => [...prevItems, ...reviews]);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchReviews();
  }, [username, page]);

  useEffect(() => {
    setItems([]);
    setPage(0);
    setHasNext(true);
  }, [username]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
      if (!loading && hasNext) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <>
      {items.length > 0 ? (
        <div className={style.cardContainer}>
          {items.map((review) => (
            <CardComponent key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <p>리뷰가 없습니다.</p>
      )}
    </>
  );
}
