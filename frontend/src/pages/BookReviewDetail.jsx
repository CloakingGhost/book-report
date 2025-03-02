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
      <section className={styles.bookReviewSection}>
        <section>
          <Link to={'/userpage/:username'}>
            <h1>유저 아이디</h1>
          </Link>
          <div>작성날짜</div>
          <div>모달 버튼</div>
          <div>
            <div>감상문 수정</div>
            <div>감상문 삭제</div>
            <div>감상문 비공개/공개</div>
          </div>
          <div>자물쇠</div>
        </section>
        <article>
          <h2>감상문</h2>
          <h3>한줄평</h3>
          <p>내용</p>
        </article>
      </section>
    </main>
  );
}
