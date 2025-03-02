import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/BookReviewDetail.module.css';

export default function BookReviewDetail() {
  return (
    <main className={styles.bookReviewDetailContainer}>
      <section className={styles.bookSection}>
        <h2>Book Information</h2>
        <div className={styles.bookCoverImageSection}>
          <div className={styles.bookCoverImage}>
            <div className={styles.mark}>⭐</div>
            <img src="임시" alt="없음" />
          </div>
        </div>
        <div className={styles.bookDetailSection}>
          <h3>해리포터 불의 잔</h3>
          <div>작가 | 출판사</div>
        </div>
      </section>
      <div className={styles.dividedLine}></div>
      <section className={styles.bookReviewSection}>
        <section>
          <Link to={'/userpage/:username'}>
            <h1>apricity2u</h1>
          </Link>
          <div className={styles.postUserDetail}>
            <div>최초 작성일 2025.04.04</div>
            <div>🔒🔓</div>
            <div>•••</div>
            {/* <div className={styles.manageReviewSection}>
              <div>수정</div>
              <hr />
              <div>삭제</div>
              <hr />
              <div>비공개 | 공개</div>
            </div> */}
          </div>
        </section>
        <article className={styles.bookReview}>
          <h3>한줄평</h3>
          <p>내용</p>
        </article>
      </section>
    </main>
  );
}
