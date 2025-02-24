import React, { useState } from 'react';
import authApi from '../api/authApi';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();

  // 전화번호 기록용 state
  const [phoneNumberInput, setPhoneNumberInput] = useState({
    phone1: '',
    phone2: '',
    phone3: '',
  });

  // 회원가입 폼 데이터 제출용 state
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    name: '',
    phoneNumber: '',
  });

  // 아이디 중복확인용 state
  const [isUsed, setIsUsed] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  // 비밀번호 확인용 state
  const [isEqual, setIsEqual] = useState(false);

  // 아이디 중복확인용 함수
  async function handleUsedUsername() {
    try {
      const response = await authApi.verifyUsername(userData.username);
      const data = response.data;
      setIsUsed(data.used);
      if (!isUsed) {
        setIsChecked(true);
      }
    } catch {
      console.error('입력값을 확인해주세요');
    }
  }

  // 비밀번호 확인용 함수
  function handlePasswordCheck(e) {
    if (userData.password == e.target.value) {
      setIsEqual(true);
    } else {
      setIsEqual(false);
    }
  }

  // 회원가입 폼 제출용 함수
  async function handleSubmit(e) {
    e.preventDefault();

    // 아이디 중복확인이 완료되지 않으면 폼 제출 불가
    if (isUsed && !isChecked) {
      alert('아이디 중복확인 버튼을 눌러주세요.');
      return;
    }

    // 비밀번호가 일치하지 않으면 폼 제출 불가
    if (!isEqual) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

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
    setUserData((prev) => ({ ...prev, [name]: value }));
  }

  // 전화번호 입력값
  function handlePhoneNumberInput(e) {
    const { name, value } = e.target;

    const updatedPhoneNumberInput = {
      ...phoneNumberInput,
      [name]: value,
    };

    setPhoneNumberInput(updatedPhoneNumberInput);

    const { phone1, phone2, phone3 } = updatedPhoneNumberInput;

    setUserData((prev) => ({
      ...prev,
      phoneNumber: phone1 + phone2 + phone3,
    }));
  }

  return (
    <>
      <h1>로고</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}
      >
        <label htmlFor="username">아이디</label>
        <div>
          <input
            type="text"
            name="username"
            id="username"
            value={userData.username}
            onChange={handleFormInput}
          />
          <button type="button" onClick={handleUsedUsername}>
            중복확인
          </button>
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
        <input
          type="password"
          name="checkPassword"
          id="checkPassword"
          onChange={handlePasswordCheck}
        />
        <label htmlFor="name">이름</label>
        <input type="text" name="name" id="name" value={userData.name} onChange={handleFormInput} />
        <label htmlFor="phone1">전화번호</label>
        <div>
          <input
            type="tel"
            id="phone1"
            name="phone1"
            value={phoneNumberInput.phone1}
            onChange={handlePhoneNumberInput}
          />
          -
          <input
            type="tel"
            id="phone2"
            name="phone2"
            value={phoneNumberInput.phone2}
            onChange={handlePhoneNumberInput}
          />
          -
          <input
            type="tel"
            id="phone3"
            name="phone3"
            value={phoneNumberInput.phone3}
            onChange={handlePhoneNumberInput}
          />
        </div>
        <button>회원가입</button>
      </form>
    </>
  );
}
