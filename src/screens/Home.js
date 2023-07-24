import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Player from './Player';
import Library from './Library';
import "./Home.css";
import Sidebar from '../components/sidebar/Sidebar';
import Login from './authentication/Login';
import { setClientToken } from '../spotify';

export default function Home() {

    const [token, setToken] = useState("");

    useEffect(() => {

        const token = window.localStorage.getItem("token");
        const hash = window.location.hash;//to get #value in URL
        window.location.hash = "";//to clear URL after getting token

        if (!token && hash) {
            const _token = hash.split("&")[0].split("=")[1]; //TO SPLIT THE HASH VALUE AND GET TOKEN
            window.localStorage.setItem("token", _token);
            setToken(_token);
            setClientToken(_token);
        }
        else {
            setToken(token);
            setClientToken(token);
        }
    }, []);

    return !token ? (<Login />) : (
        <BrowserRouter>
            <div className='main'>
                <Sidebar />
                <Routes>
                    <Route path="/" element={<Library />} />
                    <Route path="/player" element={<Player />} />
                </Routes>
            </div>
        </BrowserRouter>

    )
}
