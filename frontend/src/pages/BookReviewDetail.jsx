import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from '../styles/BookReviewDetail.module.css';
import reviewApi from '../api/reviewApi';
import { useSelector } from 'react-redux';
import base9 from '../assets/base9.png';

export default function BookReviewDetail() {
  const { reviewId } = useParams();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.username);

  const [reviewDetail, setReviewDetail] = useState({});
  const [isAuthor, setIsAuthor] = useState(false);
  const [clickManageButton, setClickManageButton] = useState(false);

  const [isError, setIsError] = useState(false);

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
        setIsError(!isError);
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

  function handleUpdateReview() {
    alert('유료 결제 후 이용 가능한 서비스입니다.');
  }

  if (isError) {
    return <div>조회할 수 없는 리뷰입니다.</div>;
  }

  if (!reviewDetail.approved && !isAuthor) {
    return <div>비공개글입니다.</div>;
  }

  return (
    <main className={styles.bookReviewDetailContainer}>
      <section className={styles.bookSection}>
        <h2>Book Information</h2>
        <div className={styles.bookCoverImageSection}>
          <div className={styles.bookCoverImage}>
            <div className={styles.mark}>⭐</div>
            <img src={reviewDetail?.items?.imageUrl || base9} alt="없음" />
          </div>
        </div>
        <div className={styles.bookDetailSection}>
          <h3>{reviewDetail?.items?.title}</h3>
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
                <div onClick={handleClickManageButton} className={styles.reviewManageButton}>
                  •••
                </div>
                {clickManageButton && (
                  <div className={styles.manageReviewSection}>
                    <div onClick={handleUpdateReview}>수정</div>
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
