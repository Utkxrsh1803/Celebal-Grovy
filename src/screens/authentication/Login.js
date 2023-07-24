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
    </div>
    );
    
}
