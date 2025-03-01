import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import styles from '../styles/RootLayout.module.css';
export default function RootLayout() {
  return (
    <>
      <div className={styles.rootLayout}>
        <Header />
        <Outlet></Outlet>
      </div>
    </>
  );
}
