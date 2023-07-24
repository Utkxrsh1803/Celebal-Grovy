import React from 'react';
import "./SidebarButton.css";
import { IconContext } from 'react-icons';
import { Link, useLocation } from 'react-router-dom';

export default function SidebarButton(props) {
  const location=useLocation();
  const isActive=location.pathname===props.to;
  const btnActive=isActive?"button-body active":"button-body";
  return (
    <Link to={props.to}>
      <div className={btnActive}>
        <IconContext.Provider value={{size:'24px'}}>
        {props.icon}
        <p className='button-title'>{props.title}</p>
        </IconContext.Provider>
      </div>

    </Link>

  )
}
