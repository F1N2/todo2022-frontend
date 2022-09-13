import css from '../styles/Header.module.css';
import { useAppDispatch } from '../app/hooks';
import { logout } from '../module/auth';
const Header = () => {
  const dispatch = useAppDispatch();

  return (
    <header className={css.header}>
      <ul className={css.ul}>
        <li>
          <a className={css.header_text} href="/">
            할 일
          </a>
        </li>
        <li>
          <a className={css.header_text} href="/statistics">
            통계
          </a>
        </li>
        <li>
          <a className={css.header_text} onClick={() => logout(dispatch)}>
            로그아웃
          </a>
        </li>
      </ul>
    </header>
  );
};

export default Header;
