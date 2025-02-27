import { useState, useEffect } from 'react';
import authApi from '../api/authApi';
import { useNavigate, Link } from 'react-router-dom';
import styles from '../styles/Signup.module.css';

export default function Signup() {
  const navigate = useNavigate();

  // 상태 변수 정의
  const [phoneNumber, setPhoneNumber] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    phoneNumber: '',
  });
  const [isUsed, setIsUsed] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isEqual, setIsEqual] = useState(false);
  const [errors, setErrors] = useState({
    username: false,
    password: false,
    name: false,
  });

  // 입력값별 정규표현식
  const validateInput = (type, value) => {
    const patterns = {
      username: /^[a-zA-Z0-9]{4,16}$/, // 아이디: 4~16자, 영문 대소문자+숫자만
      password: /^[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;<>,.?~]{6,20}$/, // 비밀번호: 6~20자, 특수문자 포함 가능
    };
    return patterns[type]?.test(value) ?? false;
  };

  // 아이디 중복확인
  const handleUsedUsername = async () => {
    if (!formData.username) {
      alert('아이디를 입력하세요.');
      return;
    }

    try {
      const response = await authApi.verifyUsername(formData.username);
      const data = response.data;
      setIsUsed(data.used);
      alert('사용 가능한 아이디입니다.');
      setIsChecked(!data.used);
    } catch {
      console.error('입력값을 확인해주세요');
      setIsUsed(true);
    }
  };

  // 전화번호 입력값 처리
  const handlePhoneNumberInput = (e) => {
    const { value } = e.target;
    const originPhoneNumber = value.replace(/\D/g, '').slice(0, 11);

    const formatPhoneNumber = (originPhoneNumber) => {
      const length = originPhoneNumber.length;
      if (length <= 3) {
        return originPhoneNumber; // 3자 이하
      } else if (length <= 7) {
        return originPhoneNumber.replace(/(\d{3})(\d{0,4})/, (match, p1, p2) => {
          return `${p1}-${p2}`;
        }); // 4자 이하
      } else {
        return originPhoneNumber.replace(/(\d{3})(\d{4})(\d{0,4})/, (match, p1, p2, p3) => {
          return `${p1}-${p2}${p3 ? '-' + p3 : ''}`;
        }); // 8자 이상
      }
    };

    setPhoneNumber(formatPhoneNumber(originPhoneNumber));
    setFormData((prev) => ({ ...prev, phoneNumber: originPhoneNumber }));
  };

  // 회원가입 폼 제출
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isChecked) {
      alert('아이디 중복확인이 필요합니다.');
      setErrors((prev) => ({ ...prev, username: true }));
      return;
    }

    if (!isEqual) {
      alert('비밀번호가 일치하지 않습니다.');
      setErrors((prev) => ({ ...prev, password: true }));
      return;
    }

    for (const key in formData) {
      if (!formData[key]) {
        alert(`${key} 입력 요망`);
        return;
      }
    }

    try {
      await authApi.signup({ ...formData });
      navigate('/login');
    } catch {
      console.error('입력값을 확인해주세요');
    }
  };

  // 비밀번호 확인
  const handlePasswordCheck = () => {
    if (formData.password === '' && checkPassword === '') {
      setIsEqual(false);
    } else {
      setIsEqual(formData.password === checkPassword);
    }
  };

  // 폼 입력값 처리
  const handleFormInput = (e) => {
    const { name, value } = e.target;
    if (name === 'checkPassword') {
      setCheckPassword(value.trim());
    } else {
      setFormData((prev) => ({ ...prev, [name]: value.trim() }));
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  // 비밀번호 확인 사이드 이펙트
  useEffect(() => {
    handlePasswordCheck();
  }, [checkPassword, formData.password]);

  // 아이디 중복확인 사이드 이펙트
  useEffect(() => {
    setIsUsed(false);
    setIsChecked(false);
  }, [formData.username]);

  return (
    <div className={styles.container}>
      <Link to="/">
        <h1>로고</h1>
      </Link>

      <form onSubmit={handleSubmit} className={styles.formWrapper}>
        <div className={styles.formGroup}>
          <div className={styles.usernameGroup}>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              placeholder="아이디"
              onChange={handleFormInput}
              className={errors.username ? styles.error : ''}
            />
            <button type="button" onClick={handleUsedUsername} className={styles.checkButton}>
              중복 확인
            </button>
          </div>
          {isUsed && <div className={styles.errorMessage}>이미 사용중인 아이디입니다.</div>}
          <div className={styles.formHint}>
            아이디는 영문 대소문자, 숫자를 혼합하여 4~16글자로 입력해주세요.
          </div>
        </div>

        <div className={styles.formGroup}>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            placeholder="비밀번호"
            onChange={handleFormInput}
            className={errors.password ? styles.error : ''}
          />
          <div className={styles.formHint}>
            비밀번호는 영문 대소문자, 숫자, 특수문자를 혼합하여 6~20글자로 입력해주세요.
          </div>
        </div>

        <div className={styles.formGroup}>
          <input
            type="password"
            name="checkPassword"
            id="checkPassword"
            value={checkPassword}
            placeholder="비밀번호 확인"
            onChange={handleFormInput}
            className={errors.password ? styles.error : ''}
          />
          {isEqual && <div className={styles.formHint}>비밀번호가 일치합니다.</div>}
        </div>

        <div className={styles.formGroup}>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            placeholder="이름"
            onChange={handleFormInput}
            className={errors.name ? styles.error : ''}
          />
          {errors.name && <div className={styles.errorMessage}>필수 입력 값입니다</div>}
        </div>

        <div className={styles.formGroup}>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="전화번호"
            value={phoneNumber}
            onChange={handlePhoneNumberInput}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          회원가입
        </button>
      </form>

      <div className={styles.subLink}>
        이미 계정이 있으신가요? <Link to="/login">로그인</Link>
      </div>
    </div>
  );
}
