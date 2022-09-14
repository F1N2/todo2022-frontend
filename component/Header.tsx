import css from '../styles/Header.module.css';
import { useAppDispatch } from '../app/hooks';
import { logout } from '../module/auth';
import { useRouter } from 'next/router';
import PageWrapper from './PageWrapper';
const Header = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <header className={css.header}>
      <PageWrapper className={css.wrapper}>
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
            <a
              className={css.header_text}
              onClick={() => logout(dispatch, router)}
            >
              로그아웃
            </a>
          </li>
        </ul>
      </PageWrapper>
    </header>
  );
};

export default Header;
