import React, { useState, useEffect } from 'react';
import BootScreen from './components/os/BootScreen';
import LoginScreen from './components/os/LoginScreen';
import Desktop from './components/os/Desktop';
import MobileProfile from './components/MobileProfile';
import { AnimatePresence } from 'framer-motion';
import { OSProvider } from './context/OSContext';

function App() {
  const [osState, setOsState] = useState('boot'); // boot, login, desktop
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleBootComplete = () => {
    setOsState('login');
  };

  const handleLogin = () => {
    setOsState('desktop');
  };

  if (isMobile) {
    return <MobileProfile />;
  }

  return (
    <OSProvider>
      <div className="w-full h-screen overflow-hidden bg-black font-ubuntu">
        <AnimatePresence mode="wait">
          {osState === 'boot' && (
            <BootScreen key="boot" onComplete={handleBootComplete} />
          )}
          {osState === 'login' && (
            <LoginScreen key="login" onLogin={handleLogin} />
          )}
          {osState === 'desktop' && (
            <Desktop key="desktop" />
          )}
        </AnimatePresence>
      </div>
    </OSProvider>
  );
}

export default App;
