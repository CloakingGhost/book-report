import React, { useState, useEffect } from 'react';
import BookReviewCard from '../components/BookReviewCard';
import styles from '../styles/Home.module.css';
import reviewApi from '../api/reviewApi';

export default function Home() {
  /**
   * 감상문 목록
   */
  const [items, setItems] = useState([]);
  /**
   * 검색어
   */
  const [title, setTitle] = useState('');
  /**
   * 현재 페이지
   */
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchItems(page, title);
  }, [page, title]);

  const handleInput = (e) => {
    setTitle(e.target.value);
    setItems([]);
    setPage(1);
  }
  const fetchItems = async (page, title) => {
    // API 호출을 통해 데이터를 가져옵니다.
    const response = await reviewApi.getReviews(page, title);
    const data = response.items; // 원래 코드
    console.log(data);

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
      <div className={styles.searchBox}>
        <input
          type="search"
          value={title}
          onChange={handleInput}
          placeholder="검색어를 입력하세요." />
      </div>
      <div className={styles.main}>
        {/* 타이틀이 존재 하면서 응답 값이 있을 때 => 타이틀이 포함 된 카드 렌더링
          타이틀이 존재 하면서 응답 값이 없을 때 => 검색 결과가 없습니다.
          타이틀이 없을 때 => ''이 포함된 카드 렌더링(모든 카드 렌더링)
        */}

        {title && items.length ?
          items.filter(item => item.approved).map((item, index) => (
            <BookReviewCard key={`card-${index}`} info={item} />
          ))
          : <p>검색 결과가 없습니다.</p>}
      </div>
    </div>
  );
}