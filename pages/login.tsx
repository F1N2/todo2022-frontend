import type { NextPage } from 'next';
import css from '../styles/login.module.css';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCookie, setCookie } from 'cookies-next';
import Header from '../component/Header';
import PageWrapper from '../component/PageWrapper';

const Login: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (getCookie('login')) return await router.push('/');
      setLoading(false);
    })();
  }, []);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
      return alert('올바른 이메일 형식을 입력해주세요.');
    if (password.length < 8 || password.length > 32)
      return alert('비밀번호를 8~32글자로 입력해주세요.');

    try {
      const data = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (data.status == 201) {
        setCookie('login', true);
        return await router.push('/');
      }
      if (data.status == 400)
        return alert('계정이 존재하지 않거나 비밀번호가 틀렸습니다.');

      return alert('알 수 없는 오류가 발생하였습니다.');
    } catch (e) {
      return alert('알 수 없는 오류가 발생하였습니다.');
    }
  };

  return (
    <>
      {!isLoading && (
        <>
          <Header />
          <PageWrapper>
            <form onSubmit={submit} className={css.container}>
              <h1 style={{ marginTop: 0 }}>로그인</h1>
              <input
                className={css.input}
                placeholder="이메일"
                required
                onChange={(e) => setEmail(e.target.value.trim())}
                value={email}
              />
              <br />
              <input
                className={css.input}
                type="password"
                placeholder="비밀번호"
                required
                onChange={(e) => setPassword(e.target.value.trim())}
                value={password}
              />
              <br />
              <button className={css.button} type="submit">
                로그인
              </button>
            </form>
          </PageWrapper>
        </>
      )}
    </>
  );
};

export default Login;
