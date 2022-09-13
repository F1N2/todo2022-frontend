import css from '../styles/SignUp.module.css';
import { useAppDispatch } from '../app/hooks';
import { SyntheticEvent, useState } from 'react';
import { setLoginPage } from '../features/page/pageSlice';
import { signup } from '../module/auth';

const SignUp = () => {
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [name, setName] = useState('윤도현');
  const [email, setEmail] = useState('test@gmail.com');
  const [password, setPassword] = useState('testingPassword');
  const dispatch = useAppDispatch();

  const login = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(setLoginPage());
  };

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await signup(name, email, password, dispatch);
  };

  return (
    <div className={css.container}>
      <div className={css.login_div}>
        <form className={css.form} onSubmit={submit}>
          <span className={css.h1}>회원가입</span>
          <span className={css.h2}>이름</span>
          <input
            className={css.input}
            placeholder="이름을 입력해주세요."
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
          <span className={css.h2}>이메일</span>
          <input
            className={css.input}
            type="email"
            placeholder="이메일을 입력해주세요."
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
              회원가입
            </button>
            <button
              className={css.button}
              style={{ float: 'right' }}
              onClick={login}
            >
              로그인
            </button>
          </div>
        </form>
      </div>
      <div className={css.introduce_div}></div>
    </div>
  );
};

export default SignUp;