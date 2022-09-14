import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { setLoginPage } from '../features/page/pageSlice';
import {
  login as loginReducer,
  logout as logoutReducer,
} from '../features/user/userSlice';
import { NextRouter } from 'next/router';

export const info = async () => {
  try {
    const data = await fetch('/api/auth', { method: 'POST' });
    if (data.status == 401 || data.status == 404) return null;
    return await data.json();
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const signup = async (
  name: string,
  email: string,
  password: string,
  dispatch: Dispatch<AnyAction>,
) => {
  if (name.length < 3 || name.length > 16)
    return alert('이름을 3~16글자로 입력해주세요.');
  if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
    return alert('올바른 이메일 형식을 입력해주세요.');
  if (password.length < 8 || password.length > 32)
    return alert('비밀번호를 8~32글자로 입력해주세요.');
  try {
    const data = await fetch('/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    if (data.status == 201) return dispatch(setLoginPage());
    if (data.status == 400) return alert('이 이메일은 이미 사용중입니다.');
    return alert('알 수 없는 오류가 발생하였습니다.');
  } catch (e) {
    return alert('알 수 없는 오류가 발생하였습니다.');
  }
};

export const login = async (
  email: string,
  password: string,
  dispatch: Dispatch<AnyAction>,
) => {
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
    const user = await data.json();
    if (data.status == 201)
      return dispatch(
        loginReducer({
          ...user,
          created: new Date(user.created),
          updated: new Date(user.updated),
        }),
      );
    if (data.status == 400)
      return alert('계정이 존재하지 않거나 비밀번호가 틀렸습니다.');

    return alert('알 수 없는 오류가 발생하였습니다.');
  } catch (e) {
    return alert('알 수 없는 오류가 발생하였습니다.');
  }
};

export const logout = async (
  dispatch: Dispatch<AnyAction>,
  router: NextRouter,
) => {
  await fetch('/api/auth/logout', { method: 'POST' });
  dispatch(logoutReducer());
  await router.push('/');
};
