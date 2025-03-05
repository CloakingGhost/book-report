import React, { useState, useEffect, useRef } from 'react';
import BookReviewCard from '../components/card/BookReviewCard';
import styles from '../styles/Home.module.css';
import reviewApi from '../api/reviewApi';

export default function Home() {
  /** 감상문 목록 */
  const [items, setItems] = useState([]);
  /** 다음 데이터 존재 여부 */
  const [nextInfo, setNextInfo] = useState({
    hasNext: false,
    nextPage: 0,
  });

  /** Load 중인가를 판별하는 boolean */
  const [isLoaded, setIsLoaded] = useState(false);
  /** 검색어 */
  const [title, setTitle] = useState('');


  useEffect(() => {
    fetchItems(0); // 초기값 불러오기
  }, [title]);


  const handleInput = (e) => {
    setTitle(e.target.value);
    setItems([]); // 기존 데이터 초기화
  };

  /** 관찰대상 target */
  const observerRef = useRef(null);

  const observer = (node) => {

    if (isLoaded) return;

    observerRef.current && observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(async ([entry]) => {
      if (entry.isIntersecting && nextInfo.hasNext) {
        await fetchItems(nextInfo.nextPage);
      }
    });

    node && observerRef.current.observe(node);

  };



  // isLoaded가 true일 때 && 마지막 페이지가 아닌 경우 => 요청보내기
  const fetchItems = async (pageNum) => {
    console.log("📡 Fetching items...");

    setIsLoaded(true); //로딩 true

      const response = await reviewApi.getReviews(pageNum, title);
      console.log(response);

      // 응답 데이터
      const data = response.data.items;
      // 다음 페이지가 있는지 여부
      const hasNext = response.data.hasNext;
    console.log(hasNext);
    
      // 공개 데이터만 필터링
      const filteredData = data.filter((item) => item.approved);
      // 랜덤 정렬
      const shuffledData = filteredData.sort(() => Math.random() - 0.5);

      // 받아온 데이터 리스트에 추가
      setItems((prevItems) => ([...prevItems, ...shuffledData]));
      setNextInfo({
        hasNext: hasNext,
        nextPage: nextInfo.nextPage + 1,
    }); // 다음 데이터 존재 여부 최신화




      // 다음 요청 전까지 요청 그만 보내도록 false로 변경
      setIsLoaded(false); // 데이터를 받아왔으므로 false로 변경

  };




  return (
    <div className={styles.container}>
      <div className={styles.searchBox}>
        <input
          type="search"
          value={title}
          onChange={handleInput}
          placeholder="검색어를 입력하세요." />
      </div>
      {/* 타이틀이 존재 하면서 응답 값이 있을 때 => 타이틀이 포함 된 카드 렌더링
          타이틀이 존재 하면서 응답 값이 없을 때 => 검색 결과가 없습니다.
          타이틀이 없을 때 => ''이 포함된 카드 렌더링(모든 카드 렌더링)
        */}
      <div className={styles.main}>
        {title ? (
          items.length ? (
            items.map((item, index) => <BookReviewCard key={`card-${index}`} info={item} />)
          ) : (
            <p>검색 결과가 없습니다.</p>
          )
        ) : (
          items.map((item, index) => <BookReviewCard key={`card-${index}`} info={item} />)
        )}
        {
          nextInfo.hasNext && <div ref={observer} />
        }
        {
          isLoaded && <div> Loading </div>
        }
      </div>
    </div>
  );
}