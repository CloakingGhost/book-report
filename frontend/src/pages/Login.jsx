import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authApi from '../api/authApi';
import styles from '../styles/Login.module.css';
import { jwtDecode } from 'jwt-decode'
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    username: false,
    password: false,
    login: false,
  });

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const validateForm = () => {
    const newErrors = {
      username: formData.username === '',
      password: formData.password === '',
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await authApi.login(formData);
      if (response.error) {
        setErrors((prev) => ({ ...prev, login: true }));
      } else {
        const payload = jwtDecode(response.data.accessToken)
        dispatch(login(payload.sub));


        navigate('/');

      }
    } catch (error) {
      console.error('로그인 실패:', error);
      setErrors((prev) => ({ ...prev, login: true }));
    }
  };

  return (
    <div className={styles.container}>
      <Link to="/">
        <h1>로고</h1>
      </Link>

      <form onSubmit={handleSubmit} className={styles.formWrapper}>
        <div className={styles.formGroup}>
          <input
            type="text"
            name="username"
            value={formData.username}
            placeholder="아이디"
            onChange={handleFormInput}
            className={errors.username ? styles.error : ''}
          />
          {errors.username && <div className={styles.errorMessage}>필수 입력 값입니다</div>}
        </div>

        <div className={styles.formGroup}>
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="비밀번호"
            onChange={handleFormInput}
            className={errors.password ? styles.error : ''}
          />
          {errors.password && <div className={styles.errorMessage}>필수 입력 값입니다</div>}
        </div>

        {errors.login && (
          <div className={styles.errorMessage}>아이디와 비밀번호를 확인해주세요</div>
        )}

        <button type="submit" className={styles.submitButton}>
          로그인
        </button>
      </form>

      <div className={styles.subLink}>
        아직 계정이 없으신가요? <Link to="/signup">회원가입</Link>
      </div>
    </div>
  );
}
