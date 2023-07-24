import React, { useEffect, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import APIKit from '../spotify';
import './Library.css';
import {AiFillPlayCircle} from "react-icons/ai";
import { IconContext } from "react-icons";
export default function Library() {
  const [playlists, setPlaylists] = useState(null);
  useEffect(() => {
    APIKit.get('me/playlists').then(function (response) {
      setPlaylists(response.data.items);
    })
  }, [])

  const navigate = useNavigate();

  const playPlaylist = (id) => {
    navigate("/player", { state: { id: id } });
  };

  return (
    <div className="screen-container">
      <div className="lib-bdy">
        {playlists?.map(playlists => (
          <div className="playlist-card" key={playlists.id} onClick={() => playPlaylist(playlists.id)}>
            <img src={playlists.images[0].url} className="playlist-img" alt="playlist art"></img>
            <p className='playlist-title'>{playlists.name}</p>
            <p className='playlist-songs'>{playlists.tracks.total} Songs</p>
            <div className="playlist-fade">
              <IconContext.Provider value={{ size: "40px", color:"#e6712e" }}>
                <AiFillPlayCircle />
              </IconContext.Provider>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
