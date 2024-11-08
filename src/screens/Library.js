import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import APIKit from '../spotify';
import './Library.css';
import { AiFillPlayCircle } from "react-icons/ai";
import { IconContext } from "react-icons";

export default function Library() {
  const [playlists, setPlaylists] = useState([]);
  
  useEffect(() => {
    APIKit.get('/me/playlists')
      .then((response) => {
        if (response.data && response.data.items) {
          setPlaylists(response.data.items);
          console.log(response);
          console.log(response.data.items);
        }
      })
      .catch(error => console.error("Error fetching playlists:", error));
  }, []);

  const navigate = useNavigate();

  const playPlaylist = (id) => {
    navigate("/player", { state: { id: id } });
  };

  return (
    <div className="screen-container">
    <div className="lib-bdy">
      {playlists.map((playlist) => (
        <div className="playlist-card" key={playlist.id} onClick={() => playPlaylist(playlist.id)}>
          {/* Check if playlist.images exists and has at least one image */}
          {playlist.images && playlist.images.length > 0 && (
            <img 
              src={playlist.images[0].url} 
              className="playlist-img" 
              alt="playlist art" 
            />
          )}
          <p className="playlist-title">{playlist.name}</p>
          <p className="playlist-songs">{playlist.tracks.total} Songs</p>
          <div className="playlist-fade">
            <IconContext.Provider value={{ size: "40px", color: "#e6712e" }}>
              <AiFillPlayCircle />
            </IconContext.Provider>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
}
