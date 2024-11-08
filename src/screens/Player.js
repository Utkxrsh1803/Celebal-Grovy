import React, { useState } from 'react';
import "./Player.css";
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import apiClient from '../spotify';
import SongCard from '../components/sidebar/songCard/SongCard';
import Queue from '../components/sidebar/queue/Queue';
import AudioPlayer from '../components/audioPlayer/AudioPlayer';
import Widgets from '../components/Widgets/Widgets';

export default function Player() {
  const location=useLocation();
  const[tracks,setTracks]=useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (location.state) {
      apiClient.get("playlists/" + location.state?.id + "/tracks")   //location.state -- > id=id 
                                                                      //https://api.spotify.com/v1/playlists/123/tracks
        .then((res) => {
          setTracks(res.data.items);
          setCurrentTrack(res.data?.items[0]?.track);
        });
    }
  }, [location.state]);

  useEffect(() => {
    setCurrentTrack(tracks[currentIndex]?.track);
  }, [currentIndex, tracks]);

  console.log(currentTrack);
  console.log(tracks)
  console.log("lol");
  
  return (
    <div  className="screen-container flex">
      <div className='left-body'>  
      <AudioPlayer currentTrack={currentTrack} total={tracks} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}></AudioPlayer>
      <Widgets artistID={currentTrack?.album?.artists[0]?.id}></Widgets>
      </div>
    
      <div className='right-body'>
        <SongCard album={currentTrack?.album}/>
        <Queue  tracks={tracks} setCurrentIndex={setCurrentIndex}/>
      </div>
    </div>
  )
}
