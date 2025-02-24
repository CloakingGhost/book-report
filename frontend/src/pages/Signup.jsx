import React, { useState } from 'react';

export default function Signup() {
  return (
    <>
      <h1>로고</h1>
      <form>
        <label htmlFor="username">아이디</label>
        <div>
          <input type="text" name="username" id="username" />
          <button>중복확인</button>
        </div>
        <label htmlFor="password">비밀번호</label>
        <input type="password" name="password" id="password" />
        <label htmlFor="checkPassword">비밀번호 확인</label>
        <input
          type="password"
          name="checkPassword"
          id="checkPassword"
        />
        <label htmlFor="name">이름</label>
        <input type="text" name="name" id="name" />
        <label htmlFor="phone1">전화번호</label>
        <div>
          <input type="tel" id="phone1" name="phoneNumber" /> -
          <input type="tel" id="phone2" name="phoneNumber" /> -
          <input type="tel" id="phone3" name="phoneNumber" />
        </div>
        <button>회원가입</button>
      </form>
    </>
  );
}
