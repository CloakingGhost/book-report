import { useEffect, useState } from 'react';
import styles from '../styles/Header.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import authApi from '../api/authApi';
import logo from '../../public/book.png';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useSelector((state) => state.auth);
  const [isLoggedIn, setIsLoggedIn] = useState(auth.isLoggedIn); // 로그인 상태 관리
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  useEffect(() => {
    setIsProfileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    dispatch(logout());
    setIsLoggedIn(false);
    await authApi.logout();
    navigate('/');
  };

  return (
    <div className={styles.header}>
      {isLoggedIn ? (
        <>
          <Link to="/">
            <img src={logo} alt="" className={styles.logo} />
          </Link>
          <div className={styles.headerRight}>
            <Link to="/reviews/create" className={styles.link}>
              감상문 작성하기
            </Link>
            <div className={styles.profileHover}>
              <button
                className={styles.profileButton}
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              >
                {auth.username}님
              </button>
              {isProfileMenuOpen && (
                <div className={styles.profileMenu}>
                  <Link className={styles.profileMenuLink} to={`/userpage/${auth.username}`}>
                    마이페이지
                  </Link>
                  <div className={styles.profileMenuLink} onClick={handleLogout}>
                    로그아웃
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <h1>비로그인 시</h1>
          <Link to="/login" className={styles.link}>
            로그인
          </Link>
        </>
      )}
    </div>
  );
}
