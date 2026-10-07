"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Hls from "hls.js";

const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

// Props: src (.m3u8 ya .mp4), poster, nextHref (agli movie ka link, auto-play next ke liye)
export default function Player({ src, poster, nextHref }) {
  const router = useRouter();
  const wrap = useRef(null);
  const video = useRef(null);
  const hls = useRef(null);
  const [levels, setLevels] = useState([]);
  const [audios, setAudios] = useState([]);
  const [subs, setSubs] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(0);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (src.endsWith(".m3u8") && Hls.isSupported()) {
      const h = new Hls();
      hls.current = h;
      h.loadSource(src);
      h.attachMedia(v);
      h.on(Hls.Events.MANIFEST_PARSED, (_, d) =>
        setLevels(d.levels.map((l, i) => ({ i, label: l.height ? `${l.height}p` : `${Math.round(l.bitrate / 1000)}kbps` })))
      );
      // Audio/subtitle options sirf tab bante hain jab stream mein hon
      h.on(Hls.Events.AUDIO_TRACKS_UPDATED, (_, d) =>
        setAudios(d.audioTracks.map((t, i) => ({ i, label: t.name || t.lang || `Track ${i + 1}` })))
      );
      h.on(Hls.Events.SUBTITLE_TRACKS_UPDATED, (_, d) =>
        setSubs(d.subtitleTracks.map((t, i) => ({ i, label: t.name || t.lang || `Sub ${i + 1}` })))
      );
      return () => { h.destroy(); hls.current = null; setLevels([]); setAudios([]); setSubs([]); };
    }
    v.src = src; // MP4 ya Safari ka native HLS
  }, [src]);

  const toggle = () => (video.current.paused ? video.current.play() : video.current.pause());
  const full = () => (document.fullscreenElement ? document.exitFullscreen() : wrap.current.requestFullscreen());

  return (
    <div className="player" ref={wrap}>
      <video
        ref={video}
        poster={poster}
        playsInline
        onClick={toggle}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setTime(e.target.currentTime)}
        onLoadedMetadata={(e) => setDur(e.target.duration)}
        onEnded={() => nextHref && router.push(nextHref)}
      />
      <div className="controls">
        <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
        <input type="range" min="0" max={dur || 0} step="0.1" value={time} aria-label="Seek"
          onChange={(e) => (video.current.currentTime = Number(e.target.value))} />
        <span className="time">{fmt(time)} / {fmt(dur || 0)}</span>

        {levels.length > 1 && (
          <select aria-label="Quality" defaultValue={-1} onChange={(e) => (hls.current.currentLevel = Number(e.target.value))}>
            <option value={-1}>Auto</option>
            {levels.map((l) => <option key={l.i} value={l.i}>{l.label}</option>)}
          </select>
        )}
        {audios.length > 1 && (
          <select aria-label="Audio" onChange={(e) => (hls.current.audioTrack = Number(e.target.value))}>
            {audios.map((a) => <option key={a.i} value={a.i}>{a.label}</option>)}
          </select>
        )}
        {subs.length > 0 && (
          <select aria-label="Subtitles" defaultValue={-1}
            onChange={(e) => { hls.current.subtitleTrack = Number(e.target.value); hls.current.subtitleDisplay = Number(e.target.value) >= 0; }}>
            <option value={-1}>Subtitles off</option>
            {subs.map((s) => <option key={s.i} value={s.i}>{s.label}</option>)}
          </select>
        )}
        <button onClick={full}>Fullscreen</button>
      </div>
    </div>
  );
}
