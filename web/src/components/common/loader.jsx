import React from 'react';
import Lottie from 'react-lottie';

const Loader = () => (
  <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 600}}>
    <Lottie
      options={{
        loop: true,
        autoplay: true,
        animationData: require('../../animations/loader.json'),
      }}
      height={150}
      width={150}
    />
  </div>
);

export default Loader;
