import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [usernameBlankCheck, setUsernameBlankCheck] = useState(false);
  const [passwordBlankCheck, setPasswordBlankCheck] = useState(false);
  const [error, setError] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.username == '') {
      setUsernameBlankCheck(true);
    } else if (formData.username != '') {
      setUsernameBlankCheck(false);
    }

    if (formData.password == '') {
      setPasswordBlankCheck(true);
    } else if (formData.password != '') {
      setPasswordBlankCheck(false);
    }

    if (formData.username != '' && formData.password != '') {
      try {
        const response = await authApi.login(formData);
        const data = response.data;

        const { status, error } = data.data;
        if (error) {
          setError(error);
        }

        navigate('/');
      } catch {
        console.error();
      }
    }
  };

  return (
    <>
      <div>Login</div>
      <label htmlFor="logo">
        <h1>
          <input type="button" id="logo" onClick={() => navigate(`/`)} hidden />
          로고
        </h1>
      </label>
      <form action="" name="formData" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          placeholder="아이디"
          onChange={handleFormInput}
        />
        {usernameBlankCheck && <div>필수 입력 값입니다</div>}

        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="비밀번호"
          onChange={handleFormInput}
        />
        {passwordBlankCheck && <div>필수 입력 값입니다</div>}

        <br />
        {error && <div>아이디와 비밀번호를 확인해주세요</div>}
        <button>로그인</button>
      </form>

      <div>
        아직 계정이 없으신가요?
        <label htmlFor="signup">
          <input type="button" id="signup" onClick={() => navigate(`/signup`)} hidden />
          회원가입
        </label>
      </div>
    </>
  );
}
