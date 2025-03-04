import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from '../styles/BookReviewDetail.module.css';
import reviewApi from '../api/reviewApi';
import { useSelector } from 'react-redux';

export default function BookReviewDetail() {
  const { reviewId } = useParams();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.username);

  const [reviewDetail, setReviewDetail] = useState({});
  const [isAuthor, setIsAuthor] = useState(false);
  const [clickManageButton, setClickManageButton] = useState(false);

  useEffect(() => {
    async function fetchBookReviewDetail() {
      try {
        const response = await reviewApi.getReviewDetail(reviewId);
        const data = response.data;
        setReviewDetail(data);

        if (data.username == auth) {
          setIsAuthor(true);
        }
      } catch (e) {
        console.error('감상문 조회에 실패했습니다.');
      }
    }
    fetchBookReviewDetail();
  }, [reviewId]);

  async function handleDeleteReview() {
    try {
      alert('정말 삭제하시겠습니까?');
      const response = await reviewApi.deleteReview(reviewId);
      alert('감상문 삭제 성공');
      navigate('/');
    } catch (e) {
      console.error('감상문 삭제 실패');
    }
  }

  async function handleApprovalStatus() {
    try {
      const response = await reviewApi.patchReviewPrivateStatus(reviewId);
      const data = response.data;

      setReviewDetail((prev) => ({ ...prev, ...data }));

      alert('감상문 공개범위를 변경했습니다.');
    } catch {
      console.error('감상문 공개범위 변경 실패');
    }
  }

  function handleClickManageButton() {
    setClickManageButton(!clickManageButton);
  }

  if (!reviewDetail.approved && !isAuthor) {
    return <div>비공개글입니다</div>;
  }

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
          <Link to={'/'} state={{ title: reviewDetail?.items?.title }}>
            <h3>{reviewDetail?.items?.title}</h3>
          </Link>
          <div>{reviewDetail?.items?.author}</div>
          <div>{reviewDetail?.items?.publisher}</div>
        </div>
      </section>
      <div className={styles.dividedLine}></div>
      <section className={styles.bookReviewSection}>
        <section>
          <Link to={`/userpage/${reviewDetail?.username}`}>
            <h1>Review by "{reviewDetail?.username}"</h1>
          </Link>
          <div className={styles.postUserDetail}>
            <div>{reviewDetail?.createdAt.slice(0, 10)}</div>
            {isAuthor && reviewDetail?.approved ? <div>🔓</div> : <div>🔒</div>}
            {isAuthor && (
              <div>
                <div onClick={handleClickManageButton}>•••</div>
                {clickManageButton && (
                  <div className={styles.manageReviewSection}>
                    <Link to={`/reviews/modify/${reviewId}`}>
                      <div>수정</div>
                    </Link>
                    <hr />
                    <div onClick={handleDeleteReview}>삭제</div>
                    <hr />
                    <div onClick={handleApprovalStatus}>
                      {reviewDetail?.approved ? '비공개' : '공개'}
                    </div>
                  </div>
                )}
              </div>
            )}
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
