import React from 'react'
import "./Login.css";
import { loginEndpoint } from '../../spotify';
import logo from "../../logo/logo.png";
export default function Login() {
    return (
        <div className="login-page">
          <img
            height="250px"
            width="600px"
            src={logo}
            alt="logo-spotify" style={{backgroundBlendMode:"difference"}}
            className="logo"
          />
          <a href={loginEndpoint}>
            <div className="login-btn">LOG IN</div>
          </a>
          <p className="note">NOTE : I am pleased to inform you that we have successfully hosted our project on Netlify. However, before someone can fully utilize our application, we need to grant specific permissions to users through our API. By adding their respective Spotify email accounts to our application, the authorization server will allow access. Failure to do so will result in an error code of 403 being returned.You can provide your spotify email by sending us a mail on - utkarshgarg1803@gmail.com</p>
    </div>
    );
    
}
