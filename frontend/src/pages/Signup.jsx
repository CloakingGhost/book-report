import React, { useState } from 'react';
import authApi from '../api/authApi';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();

  // 회원가입 폼 데이터 제출용 state
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    name: '',
    phoneNumber: '',
  });

  // 아이디 중복확인용 state
  const [isUsed, setIsUsed] = useState(false);

  // 아이디 중복확인용 함수
  async function handleUsedUsername() {
    try {
      const response = await authApi.verifyUsername(username);
      const data = response.data;
      setIsUsed(data.used);
    } catch (e) {
      console.error('입력값을 확인해주세요');
    }
  }

  // 회원가입 폼 제출용 함수
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await authApi.signup(userData);
      navigate('/login');
    } catch {
      console.error('입력값을 확인해주세요');
    }
  }

  // 회원가입 폼 입력값
  function handleFormInput(e) {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    setUserData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <>
      <h1>로고</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">아이디</label>
        <div>
          <input
            type="text"
            name="username"
            id="username"
            value={userData.username}
            onChange={handleFormInput}
          />
          <button onClick={handleUsedUsername}>중복확인</button>
          {isUsed && <div>이미 사용중인 아이디입니다.</div>}
        </div>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          name="password"
          id="password"
          value={userData.password}
          onChange={handleFormInput}
        />
        <label htmlFor="checkPassword">비밀번호 확인</label>
        <input type="password" name="checkPassword" id="checkPassword" />
        <label htmlFor="name">이름</label>
        <input type="text" name="name" id="name" value={userData.name} onChange={handleFormInput} />
        <label htmlFor="phone1">전화번호</label>
        <div>
          <input type="tel" id="phone1" name="phone1" /> -
          <input type="tel" id="phone2" name="phone2" /> -
          <input type="tel" id="phone3" name="phone3" />
        </div>
        <button>회원가입</button>
      </form>
    </>
  );
}
