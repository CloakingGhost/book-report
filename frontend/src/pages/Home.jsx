import React, { useState, useEffect, useRef } from 'react';
import BookReviewCard from '../components/card/BookReviewCard';
import styles from '../styles/Home.module.css';
import reviewApi from '../api/reviewApi';

export default function Home() {
  /** 감상문 목록 */
  const [items, setItems] = useState([]);
  /** back에 요청할 페이지 데이터 순서 정보 */
  const [offset, setOffset] = useState(0);
  /** 관찰대상 target */
  const [target, setTarget] = useState(null);
  /** Load 중인가를 판별하는 boolean */
  const [isLoaded, setIsLoaded] = useState(false);

  /**
   * 데이터를 모두 불러왔을 때 추가 요청을 방지하는 상태
   * 
   * @constant {boolean} stop - 마지막 데이터를 모두 불러왔을 경우 `true`
   * @function setStop - `stop` 상태를 업데이트하는 함수
   */
  const [stop, setStop] = useState(false);

  /** 검색어 */
  const [title, setTitle] = useState('');

  const handleInput = (e) => {
    setTitle(e.target.value);
    setItems([]); // 기존 데이터 초기화
    setOffset(0); // 새 검색어에 대해 처음부터 로드
    setStop(false); // 새로운 검색이므로 stop 해제
    setIsLoaded(true); // 새로운 데이터 요청 트리거
  };

  useEffect(() => {
    let observer;
    if (target && !stop) {
      // callback 함수로 onIntersect를 지정
      observer = new IntersectionObserver(onIntersect, {
        threshold: 1,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  // isLoaded가 변할 때 실행
  useEffect(() => {
    fetchItems(true);
  }, [title, isLoaded]);


  // isLoaded가 true일 때 && 마지막 페이지가 아닌 경우 => 요청보내기
  const fetchItems = async (reset = false) => {
    if (isLoaded && !stop) {
      const response = await reviewApi.getReviews(reset ? 0 : offset, title); // offset이 0이면 처음부터, 아니면 offset부터
      console.log(response);

      // 응답 데이터
      const data = response.data.items;
      // 다음 페이지가 있는지 여부
      const hasNext = response.data.hasNext;

      // 공개 데이터만 필터링
      const filteredData = data.filter((item) => item.approved === true);
      // 랜덤 정렬
      const shuffledData = filteredData.sort(() => Math.random() - 0.5);
      // 받아온 데이터를 보여줄 전체 리스트에 concat으로 넣어준다
      setItems((prevItems) => (reset ? shuffledData : [...prevItems, ...shuffledData]));
      // 다음 요청할 데이터 offset 정보
      setOffset((prevOffset) => (reset ? data.length : prevOffset + data.length));
      // 다음 요청 전까지 요청 그만 보내도록 false로 변경
      setIsLoaded(false);

      if (!hasNext) {
        // 전체 데이터를 다 불러온 경우(불러온 값이 12개 보다 적다면
        //  -> 매번 12개씩 불러오기로 했으므로 해당 값보다 작으면 마지막 페이지) 아예 로드를 중지
        setStop(true);
      }
    }
  };


  // callback
  const onIntersect = async ([entry], observer) => {
    // entry 요소가 교차되거나 Load중이 아니면
    if (entry.isIntersecting && !isLoaded) {
      // 관찰은 일단 멈추고
      observer.unobserve(entry.target);
      // 데이터 불러오기
      // 데이터를 받아오도록 true 로 변경
      setIsLoaded(true);

      // 불러온 후 다시 관찰 실행
      observer.observe(entry.target);
    }
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
        <div ref={setTarget}></div>

      </div>
    </div>
  );
}