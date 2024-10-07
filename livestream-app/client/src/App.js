import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';

const App = () => {
  const [overlays, setOverlays] = useState([]);
  const [videoUrl, setVideoUrl] = useState(''); // RTSP stream URL
  const [hlsUrl, setHlsUrl] = useState(''); // HLS stream URL
  const [newOverlay, setNewOverlay] = useState({
    text: '',
    logo_url: '',
    position: { x: 0, y: 0 },
    size: { width: 100, height: 50 }
  });

  // Fetch overlays from the backend
  useEffect(() => {
    fetchOverlays();
  }, []);

  const fetchOverlays = () => {
    axios.get('http://127.0.0.1:5000/api/overlays').then(response => {
      setOverlays(response.data);
    }).catch(error => {
      console.error("Error fetching overlays:", error);
    });
  };

  // Handle creating a new overlay
  const createOverlay = () => {
    axios.post('http://127.0.0.1:5000/api/overlays', newOverlay)
      .then(response => {
        setOverlays([...overlays, newOverlay]);
        setNewOverlay({ text: '', logo_url: '', position: { x: 0, y: 0 }, size: { width: 100, height: 50 } });
      })
      .catch(error => {
        console.error("Error creating overlay:", error);
      });
  };

  // Handle starting the stream
  const startStream = () => {
    axios.post('http://127.0.0.1:5000/start-stream', { rtsp_url: videoUrl })
      .then(response => {
        console.log(response.data.message);
        setHlsUrl('http://127.0.0.1:5000/hls_output/output.m3u8'); // Update the path to your HLS stream
      })
      .catch(error => {
        console.error("Error starting stream:", error);
      });
  };

  // Render video stream and overlays
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '600px' }}>
      <h1>Livestream Video Player</h1>
      <input
        type="text"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        placeholder="Enter RTSP URL"
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <button onClick={startStream}>Start Stream</button>
      
      {hlsUrl && (
        <ReactPlayer url={hlsUrl} playing controls width="100%" height="auto" />
      )}

      {/* Display overlays */}
      {overlays.map((overlay, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: overlay.position.y,
            left: overlay.position.x,
            width: overlay.size.width,
            height: overlay.size.height,
            background: `url(${overlay.logo_url})`,
            backgroundSize: 'cover',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            textAlign: 'center',
            pointerEvents: 'none', // Allows clicks to go through the overlay
          }}
        >
          <p style={{ margin: 0 }}>{overlay.text}</p>
        </div>
      ))}

      {/* Form to create a new overlay */}
      <div style={{ marginTop: '20px' }}>
        <h2>Create Overlay</h2>
        <input
          type="text"
          value={newOverlay.text}
          onChange={(e) => setNewOverlay({ ...newOverlay, text: e.target.value })}
          placeholder="Overlay Text"
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <input
          type="text"
          value={newOverlay.logo_url}
          onChange={(e) => setNewOverlay({ ...newOverlay, logo_url: e.target.value })}
          placeholder="Logo URL"
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <button onClick={createOverlay}>Create Overlay</button>
      </div>
    </div>
  );
};

export default App;
