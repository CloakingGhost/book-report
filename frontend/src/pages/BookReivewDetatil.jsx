import React from 'react';
import { Link } from 'react-router-dom';

export default function BookReivewDetatil() {
  return (
    <main>
      <section>
        <h1>책 정보</h1>
        <div>
          <img src="" alt="" />
          <div>인증마크</div>
        </div>
        <h2>제목</h2>
        <div>작가</div>
        <div>출판사</div>
      </section>
      <section>
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
