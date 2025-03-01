import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookReviewCard from '../components/BookReviewCard';
import styles from '../styles/Home.module.css';
import reviewApi from '../api/reviewApi';

export default function Home() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchItems(page, title);
  }, [page, title]);

  const fetchItems = async (page, title) => {
    // API 호출을 통해 데이터를 가져옵니다.
    const response = await reviewApi.getReviews(page, title);
    const data = response.items;
    setItems((prevItems) => [...prevItems, ...data]);
  };

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.container}>
      {items.map((item, index) => (
        // TODO 컴포넌트에 props로 데이터를 전달합니다. 
        <BookReviewCard key={card - { index }} info={item} />
      ))}
    </div>
  );
}