
import "./AudioPlayer.css";
import ProgressBar from './ProgressBar';
import WaveAnimation from './WaveAnimation';
import Controls from './Controls';
import React, { useState, useRef, useEffect } from "react";

export default function AudioPlayer({ currentTrack, currentIndex, setCurrentIndex, total }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  const audioSrc = total[currentIndex]?.track.preview_url;

  const audioRef = useRef(new Audio());
  const intervalRef = useRef();
  const isReady = useRef(false);

  const { duration } = audioRef.current;
  const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;

  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        handleNext();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, 1000);
  };

  useEffect(() => {
    if (audioSrc) {
      audioRef.current.pause();
      audioRef.current = new Audio(audioSrc);
      setTrackProgress(0);
      isReady.current = false;
    }

    if (isPlaying && audioSrc) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    }

    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, [isPlaying, audioSrc, currentIndex]);

  const handleNext = () => {
    if (currentIndex < total.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else setCurrentIndex(0);
  };

  const handlePrev = () => {
    if (currentIndex - 1 < 0) setCurrentIndex(total.length - 1);
    else setCurrentIndex(currentIndex - 1);
  };

  const addZero = (n) => {
    return n > 9 ? "" + n : "0" + n;
  };

  const artists = currentTrack?.album?.artists.map((artist) => artist.name) || [];

  return (
    <div className='player-body flex'>
      <div className='p-left-body'></div>
      <ProgressBar
        percentage={currentPercentage}
        isPlaying={true}
        image={currentTrack?.album?.images[0]?.url}
        size={270}
        color={"#e30e27"}
      />
      <div className='p-right-body flex'>
        <p className="song-title">{currentTrack?.name}</p>
        <p className="song-artist">{artists.join(" | ")}</p>
        <div className="player-right-bottom flex">
          <div className="song-duration flex">
            <p className="duration">0:{addZero(Math.round(trackProgress))}</p>
            <WaveAnimation isPlaying={isPlaying} />
            <p className="duration">0:30</p>
          </div>
          <Controls
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            handleNext={handleNext}
            handlePrev={handlePrev}
            total={total}
          />
        </div>
      </div>
    </div>
  )
}
