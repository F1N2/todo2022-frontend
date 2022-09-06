import css from '../styles/Header.module.css';
import PageWrapper from './PageWrapper';

const Header = ({ logged = false }: { logged?: boolean }) => {
  return (
    <header className={css.header}>
      <PageWrapper
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div className={css.logo}>
          <span>TO-DO</span>
        </div>
        <div>
          {logged ? (
            <ul className={css.ul}>
              <li>
                <a className={css.header_text} href="#today">
                  오늘의 다짐
                </a>
              </li>
              <li>
                <a className={css.header_text} href="#todo">
                  목표
                </a>
              </li>
              <li>
                <a className={css.header_text} href="/logout">
                  로그아웃
                </a>
              </li>
            </ul>
          ) : (
            <ul className={css.ul}>
              <li>
                <a className={css.header_text} href="/login">
                  로그인
                </a>
              </li>
              <li>
                <a className={css.header_text} href="/signup">
                  회원가입
                </a>
              </li>
            </ul>
          )}
        </div>
      </PageWrapper>
    </header>
  );
};

export default Header;
