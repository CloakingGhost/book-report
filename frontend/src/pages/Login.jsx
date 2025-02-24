export default function Login() {
  return (
    <>
      <div>Login</div>
      <label htmlFor="logo">
        <h1>
          <input type="button" id="logo"/>
          로고
        </h1>
      </label>
      <form action="">
        <input name="username" type="text" />
        <div className="blankCheck">필수 입력 값입니다</div>
        <input name="password" type="password" />
        <div className="blankCheck">필수 입력 값입니다</div>
        <div>아이디와 비밀번호를 확인해주세요</div>
        <button>로그인</button>
      </form>

      <div>
        아직 계정이 없으신가요? <button>회원가입</button>
      </div>
    </>
  );
}
