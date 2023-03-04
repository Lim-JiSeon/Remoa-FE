import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { Cookies } from "react-cookie";
import axios from "axios";
import SocialLoginContainer from "./SocialLoginContainer";
import { getCookie, loadCookie } from "../cookies";
const Style = {
  StyledButton: styled.button`
    width: 10rem;
    height: 3rem;
    background-color: white;
    color: #464646;
    font-size: 15px;
    border: solid 2px white;
    cursor: pointer;
    letter-spacing: 0.1em;
    font-weight: 550;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 50px;
    margin-left: 10px;
  `,
};

function LoginCheck() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);

  /*const cookies = new Cookies();
  const authCheck = () => {
    // 페이지에 들어올 때 쿠키로 사용자 체크
    // httpOnly가 true로 설정되어있어서 접근하지 못했음
    // cookie가 존재하면 logout 버튼, 존재하지 않으면 login 버튼
    const cookie = cookies.get("JSESSIONID");
    if (cookie !== undefined) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };*/

  // cookie로 진행하면 보안 문제에 매우 취약
  // localStorage나 sessionStorage를 권장

  useEffect(() => {
    if (sessionStorage.getItem("id") !== null) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  const logoutOnClick = () => {
    axios
      .post("http://localhost:8080/user/logout")
      .then((res) => {
        console.log(res);
        // 여기서 JSESSIONID가 삭제되어야 되는데 안되고 있다.
        // 머선 오류냐
      })
      .catch((err) => {
        console.log(err);
      });
    //cookies.remove("JSESSIONID", { path: "/" });
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("new");
    setIsLogin(false);
    navigate("/");
  };
  const loginOnClick = () => {
    navigate("/sociallogin");
  };
  return (
    <div>
      {isLogin ? (
        <Style.StyledButton onClick={logoutOnClick}>
          로그아웃
        </Style.StyledButton>
      ) : (
        <Style.StyledButton onClick={loginOnClick}>로그인</Style.StyledButton>
      )}
    </div>
  );
}

export default LoginCheck;
