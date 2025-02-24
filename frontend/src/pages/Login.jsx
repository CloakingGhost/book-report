import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    setPassword: '',
  });

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  let blankCheck = false;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await authApi.login(formData);
      const data = response.data;

      const { token } = data.data;
      navigate('/');
    } catch {
      console.error();
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
        {blankCheck && <div>필수 입력 값입니다</div>}
        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="비밀번호"
          onChange={handleFormInput}
        />
        {blankCheck && <div>필수 입력 값입니다</div>}
        <br />
        {/* <div>아이디와 비밀번호를 확인해주세요</div> */}
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
