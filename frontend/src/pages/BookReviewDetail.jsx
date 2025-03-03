import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from '../styles/BookReviewDetail.module.css';
import reviewApi from '../api/reviewApi';

export default function BookReviewDetail() {
  const { reviewId } = useParams();

  const [reviewDetail, setReviewDetail] = useState({});

  useEffect(() => {
    async function fetchBookReviewDetail() {
      try {
        const response = await reviewApi.getReviewDetail(reviewId);
        const data = response.data;
        setReviewDetail(data);
      } catch (e) {
        console.error('감상문 조회에 실패했습니다.');
      }
    }
    fetchBookReviewDetail();
  }, [reviewId]);

  /* 
  TODO
  - 메인으로 이동 시 책 제목으로 감상문 검색되게 하기
  - 감상문 관리버튼은 작성자만 사용 가능하게  
  */

  return (
    <main className={styles.bookReviewDetailContainer}>
      <section className={styles.bookSection}>
        <h2>Book Information</h2>
        <div className={styles.bookCoverImageSection}>
          <div className={styles.bookCoverImage}>
            <div className={styles.mark}>⭐</div>
            <img src={reviewDetail?.items?.imageUrl} alt="없음" />
          </div>
        </div>
        <div className={styles.bookDetailSection}>
          <Link to={`?title=${reviewDetail?.items?.title}`}>
            <h3>{reviewDetail?.items?.title}</h3>
          </Link>
          <div>
            {reviewDetail?.items?.author} | {reviewDetail?.items?.publisher}
          </div>
        </div>
      </section>
      <div className={styles.dividedLine}></div>
      <section className={styles.bookReviewSection}>
        <section>
          <Link to={`/userpage/${reviewDetail?.username}`}>
            <h1>Review by "{reviewDetail?.username}"</h1>
          </Link>
          <div className={styles.postUserDetail}>
            <div>{reviewDetail?.createdAt}</div>
            {reviewDetail?.approved ? <div>🔒</div> : <div>🔓</div>}
            <div>•••</div>
            <div className={styles.manageReviewSection}>
              <Link to={`/reviews/modify/${reviewId}`}>
                <div>수정</div>
              </Link>
              <hr />
              <div>삭제</div>
              <hr />
              <div>비공개 | 공개</div>
            </div>
          </div>
        </section>
        <hr />
        <article className={styles.bookReview}>
          <h3>{reviewDetail?.title}</h3>
          <p>{reviewDetail?.content}</p>
        </article>
      </section>
    </main>
  );
}
