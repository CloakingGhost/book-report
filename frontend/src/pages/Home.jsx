import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookReviewCard from '../components/BookReviewCard';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchItems(page);
  }, [page]);

  const fetchItems = async (page) => {
    // API 호출을 통해 데이터를 가져옵니다.
    const response = await fetch(`https://api.example.com/reviews?page=${page}`);
    const data = await response.json();
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
        <BookReviewCard key={index}>{item.title}</BookReviewCard>
      ))}
    </div>
  );
}