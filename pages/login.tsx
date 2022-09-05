import type { NextPage } from 'next';
import css from '../styles/login.module.css';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCookie, setCookie } from 'cookies-next';

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
          <form onSubmit={submit}>
            <input
              placeholder="이메일"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <br />
            <input
              type="password"
              placeholder="비밀번호"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <br />
            <button type="submit">Submit</button>
          </form>
        </>
      )}
    </>
  );
};

export default Login;
