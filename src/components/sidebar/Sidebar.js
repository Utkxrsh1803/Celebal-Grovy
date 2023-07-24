import React, { useEffect } from 'react'
import "./Sidebar.css";
import SidebarButton from './SidebarButton';
import { useState } from 'react';
import { MdLibraryMusic } from "react-icons/md";
import { FaRegPlayCircle, FaSignOutAlt } from "react-icons/fa";
import apiClient from '../../spotify';
export default function Sidebar() {

    const [image,setImage]=useState("https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Mangekyou_Sharingan_Sasuke_%28Eternal%29.svg/450px-Mangekyou_Sharingan_Sasuke_%28Eternal%29.svg.png");

    useEffect(()=>{
        apiClient.get("me").then(response=>{console.log(response)
        setImage(response.data.images[0].url);
        })
    },[])


    return (
    
    <div className="sidebar-container">


        <img src={image}className='profile-image' alt="Profile"></img>


        <div className='side-bttn'>
            <SidebarButton title="Player" to="/player" icon={<FaRegPlayCircle/>} />
            <SidebarButton title="Library" to="/" icon={<MdLibraryMusic/>} />
        </div>
        <SidebarButton title="Sign Out" to="" icon={<FaSignOutAlt/>}></SidebarButton>

    </div>)
}
