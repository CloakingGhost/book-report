import React, { useState } from 'react';
import authApi from '../api/authApi';

export default function Signup() {
  const [username, setUsername] = useState('');
  // 아이디 중복확인용 state
  const [isUsed, setIsUsed] = useState(false);

  // 아이디 중복확인용 api
  async function handleDuplicatedUsername() {
    try {
      const response = await authApi.verifyUsername(username);
      const data = response.data;
      setIsUsed(data.used);
    } catch (e) {
      e.message('입력값을 확인해주세요');
    }
  }

  function handleInputUsername(e) {
    setUsername(e.target.value);
  }
  return (
    <>
      <h1>로고</h1>
      <form>
        <label htmlFor="username">아이디</label>
        <div>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={handleInputUsername}
          />
          <button onClick={handleDuplicatedUsername}>중복확인</button>
          {isUsed && <div>이미 사용중인 아이디입니다.</div>}
        </div>
        <label htmlFor="password">비밀번호</label>
        <input type="password" name="password" id="password" />
        <label htmlFor="checkPassword">비밀번호 확인</label>
        <input type="password" name="checkPassword" id="checkPassword" />
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
