import React, { useState } from 'react';
import { ButtonUI } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import * as S from './style';
import { ReactComponent as Kakao } from '../../components/Imgs/kakao.svg';
import { ReactComponent as Google } from '../../components/Imgs/google.svg';
import { googleOauth, useAuth } from '../../api/auth.api';
import { useInput } from '../../hooks/useInput';
import { useModal } from '../../hooks/modal.hook';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook';
import { authType, socialCheck } from '../../redux/Slices/auth.slice';

const Login = () => {
  const [userData, changehandler] = useInput();
  const buttons = useAppSelector((state) => state.auth.buttonInfo);
  const dispatch = useAppDispatch();
  const [InputTypes, setInPutTypes] = useState([
    { id: 0, label: '이메일', name: 'email', placeholder: '예) SORT@SORT.COM' },
    { id: 1, label: '비밀번호', name: 'password', placeholder: '' },
  ]);
  const { success, error, authRequest } = useAuth(userData, 'login');
  const { clickHandler } = useModal();

  const loginBtnClick = (social: string) => {
    dispatch(socialCheck(social));
    dispatch(authType('login'));
    googleOauth();
  };

  return (
    <S.Container>
      <S.LogoSection>
        <p className="logo">SORT</p>
        <p className="logo_description" color="true">
          SELL OWN REGION TICKET
        </p>
      </S.LogoSection>
      <S.InputSection>
        {InputTypes.map((li) => {
          return (
            <>
              <p>{li.label}</p>
              <S.InputBox key={li.id}>
                <Input name={li.name} placeholder={li.placeholder} onChange={changehandler} />
              </S.InputBox>
            </>
          );
        })}
      </S.InputSection>
      <S.OptionSection>
        <S.KeepLoggedin>
          <input type="checkbox" />
          <p>로그인 유지하기</p>
        </S.KeepLoggedin>
        <p className="search_pw">비밀번호 찾기</p>
      </S.OptionSection>
      <S.ButtonSection>
        {buttons.map((li) => {
          return (
            <S.ButtonBox>
              <ButtonUI
                key={li.id}
                height="40px"
                background={li.background}
                color={li.color}
                fontsize="14px"
                hover={li.hover}
                onClick={() => loginBtnClick(li.social)}
              >
                <p className="logo">
                  <img src={li.svg} />
                </p>
                <p>{li.name} 로그인</p>
              </ButtonUI>
            </S.ButtonBox>
          );
        })}
      </S.ButtonSection>
      <S.SignupSection>
        <p className="body">회원이 아니신가요?</p>
        <a className="signup" onClick={() => clickHandler('signup')}>
          회원가입
        </a>
      </S.SignupSection>
    </S.Container>
  );
};

export default Login;
