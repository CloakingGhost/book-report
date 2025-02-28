import { useState } from 'react';
import styles from '../styles/Header.module.css';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  return (
    <div className={styles.header}>
      {isLoggedIn ? (
        <>
          <h1>로그인 시</h1>
          <div className={styles.headerRight}>
            <Link to="/reviews/create" className={styles.link}>
              감상문 작성하기
            </Link>
            <div className={styles.profileHover}>
              <button
                className={styles.profileButton}
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              >
                OOO님
              </button>
              {isProfileMenuOpen && (
                <div className={styles.profileMenu}>
                  <Link className={styles.profileMenuLink} to="/profile">
                    마이페이지
                  </Link>
                  <Link className={styles.profileMenuLink} to="/logout">
                    로그아웃
                  </Link>
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
