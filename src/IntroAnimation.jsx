import React, { useState, useEffect } from 'react';
import './IntroAnimation.css';
import logo from './assets/logo_openflexure_emblem_pink.svg';

export default function IntroAnimation({ onConnect }) {
  const [showTitle, setShowTitle] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    // Wait for 1.5 seconds before starting the animation sequence
    const titleTimer = setTimeout(() => {
      setShowTitle(true);
    }, 1500);

    // Show dialog after complete animation (intro + loading animation)
    const dialogTimer = setTimeout(() => {
      setShowDialog(true);
    }, 4000); // 1.5s initial + 1.2s slide + 1.3s buffer for loading bar

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(dialogTimer);
    };
  }, []);

  const handleConnect = () => {
    console.log('Connect clicked');
    if (onConnect) {
      onConnect();
    }
  };

  const handleCancel = () => {
    console.log('Cancel clicked');
    setShowDialog(false);
  };

  return (
    <div className="intro-container">
      <div className="logo-title-group">
        <img
          src={logo}
          className={`logo ${showTitle ? 'moved' : ''}`}
          alt="Open Flexture Connect Logo"
        />
        <div className={`text-container ${showTitle ? 'visible' : ''}`}>
          <h1 className="title-text">
            Open Flexture Connect
          </h1>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>

      {/* Connection Dialog */}
      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <h2 className="dialog-title">Connect to Local Host</h2>
            <p className="dialog-message">
              Would you like to connect to the local host?
            </p>
            <div className="dialog-buttons">
              <button className="btn-cancel" onClick={handleCancel}>
                Cancel
              </button>
              <button className="btn-connect" onClick={handleConnect}>
                Connect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
