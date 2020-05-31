import React from 'react';

export const MapMessage = ({text}) => (
  <div style={{
    position: 'absolute',
    zIndex: 10,
    top: 15,
    width: '40%',
    height: '7%',
    maxWidth: 960,
    minWidth: 600,
    overflow: 'hidden',
    background: '#fff',
    margin: '0 auto',
    left: 0,
    right: 0,
    opacity: 0.9,

  }}
  >
    <div className="center-item">
      {text}
    </div>
  </div>
);
