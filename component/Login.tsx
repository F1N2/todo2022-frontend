import css from '../styles/Login.module.css';
import { SyntheticEvent, useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { setSignUpPage } from '../features/page/pageSlice';
import { login } from '../module/auth';

const Login = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [email, setEmail] = useState('test@gmail.com');
  const [password, setPassword] = useState('testingPassword');
  const dispatch = useAppDispatch();

  const signUp = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(setSignUpPage());
  };

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await login(email, password, dispatch);
  };

  return (
    <div className={css.container}>
      <div className={css.login_div}>
        <form className={css.form} onSubmit={submit}>
          <span className={css.h1}>로그인</span>
          <span className={css.h2}>이메일</span>
          <input
            className={css.input}
            placeholder="이메일을 입력해주세요."
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <span className={css.h2}>비밀번호</span>
          <input
            className={css.input}
            placeholder="비밀번호를 입력해주세요."
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <div style={{ marginTop: '24px' }}>
            <button
              type="submit"
              className={`${css.button} ${css.button_confirm}`}
              style={{ float: 'left' }}
            >
              로그인
            </button>
            <button
              className={css.button}
              style={{ float: 'right' }}
              onClick={signUp}
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
      <div className={css.introduce_div}></div>
    </div>
  );
};

export default Login;
