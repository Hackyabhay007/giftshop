import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

// App Install Manager Utility
class AppInstallManager {
  constructor() {
    this.deferredPrompt = null;
    this.platform = this.detectPlatform();
    this.installPromptEvent = null;
  }

  detectPlatform() {
    const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent.toLowerCase() : '';
    return {
      isAndroid: /android/i.test(userAgent),
      isIOS: /iphone|ipad|ipod/i.test(userAgent),
      isMobile: /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent),
      isStandalone: window.matchMedia('(display-mode: standalone)').matches
    };
  }

  setupPWAInstall() {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        this.installPromptEvent = e;
      });
    }
  }

  triggerInstall(onSuccess, onFailure) {
    if (this.platform.isAndroid) {
      this.triggerAndroidPWAInstall(onSuccess, onFailure);
    } else if (this.platform.isIOS) {
      this.triggerIOSInstall(onSuccess, onFailure);
    } else {
      this.triggerDesktopPWAInstall(onSuccess, onFailure);
    }
  }

  triggerAndroidPWAInstall(onSuccess, onFailure) {
    if (this.installPromptEvent) {
      this.installPromptEvent.prompt();
      this.installPromptEvent.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          onSuccess && onSuccess();
        } else {
          onFailure && onFailure();
        }
        this.installPromptEvent = null;
      }).catch(onFailure);
    } else {
      onFailure && onFailure(new Error('Install prompt not available'));
    }
  }

  triggerIOSInstall(onSuccess, onFailure) {
    if (this.platform.isIOS && !this.platform.isStandalone) {
      alert(`
        To install the app on iOS:
        1. Tap the Share button in Safari
        2. Scroll and tap "Add to Home Screen"
        3. Name the app and tap "Add"
      `);
      onSuccess && onSuccess();
    } else {
      onFailure && onFailure(new Error('iOS installation not supported'));
    }
  }

  triggerDesktopPWAInstall(onSuccess, onFailure) {
    if (this.installPromptEvent) {
      this.installPromptEvent.prompt();
      this.installPromptEvent.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          onSuccess && onSuccess();
        } else {
          onFailure && onFailure();
        }
        this.installPromptEvent = null;
      }).catch(onFailure);
    } else {
      onFailure && onFailure(new Error('Desktop install not available'));
    }
  }
}

// App Install Button Component
const AppInstallButton = ({
  children = 'Install App',
  onInstallSuccess,
  onInstallFailure,
  className = '',
  style = {},
  ...props
}) => {
  const [installManager, setInstallManager] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const manager = new AppInstallManager();
    setInstallManager(manager);
    manager.setupPWAInstall();

    const checkInstallability = () => {
      const isEligibleForInstall = 
        manager.installPromptEvent || 
        (manager.platform.isIOS && !manager.platform.isStandalone);
      
      setIsInstallable(!!isEligibleForInstall);
    };

    checkInstallability();
    window.addEventListener('beforeinstallprompt', checkInstallability);

    return () => {
      window.removeEventListener('beforeinstallprompt', checkInstallability);
    };
  }, []);

  const handleInstallClick = () => {
    if (installManager) {
      installManager.triggerInstall(
        () => {
          console.log('App install initiated');
          onInstallSuccess && onInstallSuccess();
        },
        (error) => {
          console.error('Installation failed', error);
          onInstallFailure && onInstallFailure(error);
        }
      );
    }
  };

  if (!isInstallable) return null;

  const buttonStyle = {
    backgroundColor: isHovered ? "#990100" : "transparent",
    color: isHovered ? "white" : "#990100",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "2px solid #990100",
    cursor: "pointer",
    fontSize: "16px",
    transition: "all 0.3s ease",
    maxWidth: "100%",
    minWidth: "200px",
    transform: isHovered ? "scale(1.05)" : "scale(1)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    textTransform: "uppercase",
    fontWeight: 600,
    letterSpacing: "1px",
    boxShadow: isHovered 
      ? "0 4px 6px rgba(153, 1, 0, 0.3)" 
      : "none",
    ...style
  };

  return (
    <button
      onClick={handleInstallClick}
      style={buttonStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`install-btn ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const InstallationSteps = () => {
    const [currentPlatform, setCurrentPlatform] = useState('');
  
    useEffect(() => {
      const manager = new AppInstallManager();
      if (manager.platform.isAndroid) setCurrentPlatform('android');
      else if (manager.platform.isIOS) setCurrentPlatform('ios');
      else setCurrentPlatform('desktop');
    }, []);
  
    const platformSteps = {
      android: [
        {
          title: "Open in Chrome",
          description: "Ensure you're using Google Chrome browser",
          icon: (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="48" 
              height="48" 
              viewBox="0 0 48 48" 
              fill="none"
            >
              <path 
                d="M23.9999 4C12.9539 4 4 12.954 4 24C4 35.046 12.9539 44 23.9999 44C35.0459 44 44 35.046 44 24C44 12.954 35.0459 4 23.9999 4Z" 
                fill="#4285F4"
              />
              <path 
                d="M24 20.5455H41.4857C41.6514 21.3882 41.7428 22.2615 41.7428 23.1636C41.7428 30.5639 35.9308 36.3636 24 36.3636C13.4666 36.3636 5.05715 28.0169 5.05715 24C5.05715 19.9831 13.4666 11.6364 24 11.6364C29.4552 11.6364 34.2324 13.5847 37.7143 16.5818L32.1429 21C30.2552 19.3558 27.2848 17.4545 24 17.4545C19.1771 17.4545 15.2286 21.3091 15.2286 24C15.2286 26.6909 19.1771 30.5455 24 30.5455C28.8762 30.5455 30.8571 27.3273 31.2 25.0909H24V20.5455Z" 
                fill="white"
              />
            </svg>
          )
        },
        {
          title: "Tap Install",
          description: "Look for the install banner at the bottom of the screen",
          icon: (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="48" 
              height="48" 
              viewBox="0 0 48 48" 
              fill="none"
            >
              <circle 
                cx="24" 
                cy="24" 
                r="20" 
                fill="#F0F0F0" 
                stroke="#990100" 
                strokeWidth="3"
              />
              <path 
                d="M24 14V34" 
                stroke="#990100" 
                strokeWidth="3" 
                strokeLinecap="round"
              />
              <path 
                d="M14 24H34" 
                stroke="#990100" 
                strokeWidth="3" 
                strokeLinecap="round"
              />
              <path 
                d="M24 34L19 29H29L24 34Z" 
                fill="#990100"
              />
            </svg>
          )
        },
        {
          title: "Confirm Installation",
          description: "Click 'Install' in the popup",
          icon: (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="48" 
              height="48" 
              viewBox="0 0 48 48" 
              fill="none"
            >
              <circle 
                cx="24" 
                cy="24" 
                r="20" 
                fill="#F0F0F0" 
                stroke="#4CAF50" 
                strokeWidth="3"
              />
              <path 
                d="M14 24L20 30L34 16" 
                stroke="#4CAF50" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          )
        }
      ],
      ios: [
        {
          title: "Open in Safari",
          description: "Use Safari browser on your iOS device",
          icon: (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="48" 
              height="48" 
              viewBox="0 0 48 48" 
              fill="none"
            >
              <circle 
                cx="24" 
                cy="24" 
                r="20" 
                fill="#F0F0F0"
              />
              <path 
                d="M24 8C15.1635 8 8 15.1635 8 24C8 32.8365 15.1635 40 24 40C32.8365 40 40 32.8365 40 24C40 15.1635 32.8365 8 24 8ZM24 36C16.268 36 10 29.732 10 24C10 18.268 16.268 12 24 12C31.732 12 38 18.268 38 24C38 29.732 31.732 36 24 36Z" 
                fill="#007AFF"
              />
              <path 
                d="M24 16L26.24 21.76L32 24L26.24 26.24L24 32L21.76 26.24L16 24L21.76 21.76L24 16Z" 
                fill="#007AFF"
              />
            </svg>
          )
        },
        {
          title: "Tap Share",
          description: "Click the share button at the bottom of the screen",
          icon: (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="48" 
              height="48" 
              viewBox="0 0 48 48" 
              fill="none"
            >
              <circle 
                cx="24" 
                cy="24" 
                r="20" 
                fill="#F0F0F0" 
                stroke="#990100" 
                strokeWidth="3"
              />
              <path 
                d="M24 16L30 22M24 16L18 22M24 16V32" 
                stroke="#990100" 
                strokeWidth="3" 
                strokeLinecap="round"
              />
            </svg>
          )
        },
        {
          title: "Add to Home Screen",
          description: "Scroll and select 'Add to Home Screen'",
          icon: (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="48" 
              height="48" 
              viewBox="0 0 48 48" 
              fill="none"
            >
              <circle 
                cx="24" 
                cy="24" 
                r="20" 
                fill="#F0F0F0" 
                stroke="#4CAF50" 
                strokeWidth="3"
              />
              <path 
                d="M24 16V32" 
                stroke="#4CAF50" 
                strokeWidth="3" 
                strokeLinecap="round"
              />
              <path 
                d="M16 24H32" 
                stroke="#4CAF50" 
                strokeWidth="3" 
                strokeLinecap="round"
              />
            </svg>
          )
        }
      ],
      desktop: [
        {
          title: "Modern Browser",
          description: "Use Chrome, Edge, or Firefox",
          icon: (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="48" 
              height="48" 
              viewBox="0 0 48 48" 
              fill="none"
            >
              <circle 
                cx="24" 
                cy="24" 
                r="20" 
                fill="#F0F0F0" 
                stroke="#1A73E8" 
                strokeWidth="3"
              />
              <path 
                d="M24 8C14.6 8 7 15.6 7 24C7 32.4 14.6 40 24 40C33.4 40 41 32.4 41 24C41 15.6 33.4 8 24 8ZM24 12C28.4 12 32.4 14.2 35.2 17.6L30.6 21.8C29 20.2 26.6 19.2 24 19.2C19.8 19.2 16.4 22 15.4 25.8L10.2 22C12.2 16.4 17.6 12 24 12ZM24 36C19.6 36 15.6 33.8 12.8 30.4L17.4 26.2C19 27.8 21.4 28.8 24 28.8C28.2 28.8 31.6 26 32.6 22.2L37.8 26C35.8 31.6 30.4 36 24 36Z" 
                fill="#1A73E8"
              />
            </svg>
          )
        },
        {
          title: "Install Prompt",
          description: "Look for the install icon in the address bar",
          icon: (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="48" 
              height="48" 
              viewBox="0 0 48 48" 
              fill="none"
            >
              <circle 
                cx="24" 
                cy="24" 
                r="20" 
                fill="#F0F0F0" 
                stroke="#990100" 
                strokeWidth="3"
              />
              <path 
                d="M24 16V32" 
                stroke="#990100" 
                strokeWidth="3" 
                strokeLinecap="round"
              />
              <path 
                d="M16 24H32" 
                stroke="#990100" 
                strokeWidth="3" 
                strokeLinecap="round"
              />
              <path 
                d="M24 32L19 27H29L24 32Z" 
                fill="#990100"
              />
            </svg>
          )
        },
        {
          title: "Click Install",
          description: "Follow the browser's installation prompt",
          icon: (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="48" 
              height="48" 
              viewBox="0 0 48 48" 
              fill="none"
            >
              <circle 
                cx="24" 
                cy="24" 
                r="20" 
                fill="#F0F0F0" 
                stroke="#4CAF50" 
                strokeWidth="3"
              />
              <path 
                d="M14 24L20 30L34 16" 
                stroke="#4CAF50" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          )
        }
      ]
    };
  
    return (
      <div className="container py-5">
        <h2 
          className="text-center mb-5" 
          style={{ 
            color: '#990100', 
            fontWeight: 700 
          }} 
          >
          How to Install Our App
        </h2>
  
        <div className="row justify-content-center">
          {platformSteps[currentPlatform || 'desktop'].map((step, index) => (
            <div 
              key={index} 
              className="col-md-4 mb-4"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div 
                className="installation-step-card h-100 text-center p-4 position-relative" 
                style={{
                  background: 'linear-gradient(145deg, #ffffff, #f6f6f6)',
                  borderRadius: '15px',
                  boxShadow: '0 10px 25px rgba(153, 1, 0, 0.1)',
                  border: '1px solid rgba(153, 1, 0, 0.05)',
                  transition: 'all 0.3s ease',
                  transform: 'translateY(0)',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 15px 30px rgba(153, 1, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(153, 1, 0, 0.1)';
                }}
              >
                {/* Step Number */}
                <div 
                  className="step-number position-absolute" 
                  style={{
                    top: '10px',
                    left: '15px',
                    fontSize: '2rem',
                    color: 'rgba(153, 1, 0, 0.1)',
                    fontWeight: 700,
                    zIndex: 1
                  }}
                >
                  {index + 1}
                </div>
  
                {/* Icon Container */}
                <div 
                  className="icon-container mb-3 mx-auto" 
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
                    boxShadow: '5px 5px 10px #d1d1d1, -5px -5px 10px #ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    zIndex: 2
                  }}
                >
                  {step.icon}
                </div>
  
                {/* Step Details */}
                <h5 
                  className="step-title mb-3" 
                  style={{ 
                    color: '#990100', 
                    fontWeight: 600 
                  }}
                >
                  {step.title}
                </h5>
  
                <p 
                  className="step-description text-muted" 
                  style={{ 
                    fontSize: '0.9rem',
                    lineHeight: 1.6 
                  }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
  
        {/* Optional: Helpful Tip */}
        <div 
          className="text-center mt-4 p-3" 
          style={{
            background: 'rgba(153, 1, 0, 0.05)',
            borderRadius: '10px'
          }}
        >
          <p className="mb-0" style={{ color: '#990100' }}>
            <i className="bi bi-info-circle me-2"></i>
            Having trouble? Check our 
            <a 
              href="/contactus" 
              className="ms-1" 
              style={{ color: '#990100', textDecoration: 'underline' }}
            >
              Contact page
            </a>
          </p>
        </div>
  
        {/* Styles and Animations */}
        <style jsx>{`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
  
          .installation-step-card {
            will-change: transform;
            animation: float 4s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
          }
        `}</style>
      </div>
    );
  };

  
 

const AppInstallPage = () => {
  return (
    <div className="app-install-page">
      <Head>
        <title>Install Our App</title>
        <meta name="description" content="Easy steps to install our Progressive Web App" />
      </Head>

      <div 
        className="container-fluid install-hero"
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f1f1f1 100%)',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            {/* Left Side - Illustration */}
            <div className="col-md-6 text-center mb-4 mb-md-0">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 500 500" 
                width="100%" 
                height="auto"
                style={{ maxWidth: '400px', margin: '0 auto' }}
              >
                {/* PWA Installation Illustration */}
                <circle cx="250" cy="250" r="200" fill="#990100" fillOpacity="0.1" />
                <path 
                  d="M250 100 L300 200 L200 200 Z" 
                  fill="#990100" 
                />
                <path 
                  d="M200 300 Q250 350, 300 300" 
                  fill="none" 
                  stroke="#990100" 
                  strokeWidth="10" 
                />
                <text 
                  x="250" 
                  y="400" 
                  textAnchor="middle" 
                  fontSize="30" 
                  fill="#990100"
                >
                  PWA
                </text>
              </svg>
            </div>

            {/* Right Side - Content */}
            <div className="col-md-6">
              <div className="install-content">
                <h1 
                  className="display-4 mb-4" 
                  style={{ 
                    color: "#990100", 
                    fontWeight: 700,
                    textShadow: '2px 2px 4px rgba(153,1,0,0.1)'
                  }}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="50" 
                    height="50" 
                    viewBox="0 0 24 24" 
                    fill="#990100" 
                    className="me-3"
                  >
                    <path d="M16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2m-5.15 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56M14.34 14H9.66c-.1-.66-.16-1.32-.16-2 0-.68.06-1.34.16-2h4.68c.09.66.16 1.32.16 2 0 .68-.07 1.34-.16 2M12 19.96c-.83-1.2-1.5-2.53-1.91-3.96h3.82c-.41 1.43-1.08 2.76-1.91 3.96M8 8H5.08A8.44 8.44 0 0 1 12 4c2.24 0 4.22.82 5.74 2.12C16.95 6.75 15.54 6 14 6H8M5.08 16H8c.35 1.25.85 2.44 1.52 3.56C6.24 18.55 4.84 17.42 5.08 16m-2.59-2c.16.64.26 1.31.26 2s-.1 1.36-.26 2h3.38c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2M12 4.04c.83 1.2 1.5 2.54 1.91 3.96h-3.82c.41-1.42 1.08-2.76 1.91-3.96M18.92 8c-.76-1.11-1.73-2.06-2.85-2.81A8.04 8.04 0 0 1 19 8h-.08m-9.27 5H8v2h3v-1.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V15h3v-2h-3.35c-.24-.72-.97-1.2-1.65-1.2s-1.41.48-1.65 1.2z"/>
                  </svg>
                  Install Our App
                </h1>

                <p 
                  className="lead mb-4" 
                  style={{ 
                    color: "#333", 
                    lineHeight: 1.6 
                  }}
                >
                  Experience our app seamlessly on any device with our Progressive Web App. 
                  Get instant access, offline support, and a native-like experience.
                </p>

                <div className="mb-4">
                  <AppInstallButton>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="currentColor" 
                      className="me-2"
                    >
                      <path d="M16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2m-5.15 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56M14.34 14H9.66c-.1-.66-.16-1.32-.16-2 0-.68.06-1.34.16-2h4.68c.09.66.16 1.32.16 2 0 .68-.07 1.34-.16 2M12 19.96c-.83-1.2-1.5-2.53-1.91-3.96h3.82c-.41 1.43-1.08 2.76-1.91 3.96M8 8H5.08A8.44 8.44 0 0 1 12 4c2.24 0 4.22.82 5.74 2.12C16.95 6.75 15.54 6 14 6H8M5.08 16H8c.35 1.25.85 2.44 1.52 3.56C6.24 18.55 4.84 17.42 5.08 16m-2.59-2c.16.64.26 1.31.26 2s-.1 1.36-.26 2h3.38c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2M12 4.04c.83 1.2 1.5 2.54 1.91 3.96h-3.82c.41-1.42 1.08-2.76 1.91-3.96M18.92 8c-.76-1.11-1.73-2.06-2.85-2.81A8.04 8.04 0 0 1 19 8h-.08M8 10h8v2H8z"/>
                    </svg>
                    Install Now
                  </AppInstallButton>
                </div>

                <div className="features mt-4">
                <div className="row feature-highlights">
  {[
    {
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="48" 
          height="48" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#990100" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4l3 3" />
        </svg>
      ),
      text: "Instant Access",
      description: "Rapid loading and immediate interaction"
    },
    {
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="48" 
          height="48" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#990100" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M21.2 15c.7-1.2 1-2.5.8-3.8-.3-1.8-1.8-3.3-3.6-3.6-2-.3-3.7.8-4.4 2.5" />
          <path d="M15 18.3c-1.8.8-3.8.7-5.6-.2-2-1-3.3-3-3.3-5.2 0-1.9 1-3.8 2.5-4.8" />
          <circle cx="12" cy="12" r="10" />
          <path d="m2 2 20 20" />
        </svg>
      ),
      text: "Offline Support",
      description: "Seamless experience without internet"
    },
    {
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="48" 
          height="48" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#990100" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <path d="M12 18h.01" />
        </svg>
      ),
      text: "Mobile-Friendly",
      description: "Optimized for all device types"
    }
  ].map((feature, index) => (
    <div key={index} className="col-md-4 mb-4">
      <div 
        className="feature-card h-100 p-4 text-center" 
        style={{
          background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
          borderRadius: '15px',
          boxShadow: '0 10px 25px rgba(153, 1, 0, 0.1)',
          transition: 'all 0.3s ease',
          transform: 'translateY(0)',
          border: '1px solid rgba(153, 1, 0, 0.1)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-10px)';
          e.currentTarget.style.boxShadow = '0 15px 30px rgba(153, 1, 0, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 10px 25px rgba(153, 1, 0, 0.1)';
        }}
      >
        <div 
          className="feature-icon mb-3" 
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
            boxShadow: '5px 5px 10px #d1d1d1, -5px -5px 10px #ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 15px'
          }}
        >
          {feature.icon}
        </div>
        <h5 
          className="feature-title mb-2" 
          style={{ 
            color: '#990100', 
            fontWeight: 600 
          }}
        >
          {feature.text}
        </h5>
        <p 
          className="feature-description text-muted" 
          style={{ 
            fontSize: '0.9rem',
            lineHeight: 1.6 
          }}
        >
          {feature.description}
        </p>
      </div>
    </div>
  ))}
</div>

{/* Optional: Add some custom styles */}
<style jsx>{`
  .feature-highlights {
    position: relative;
    z-index: 1;
  }

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }

  .feature-card {
    will-change: transform;
    animation: float 4s ease-in-out infinite;
    animation-delay: ${Math.random() * 2}s;
  }
`}</style>

                </div>
              </div>
            </div>
          </div>

          <InstallationSteps />

          <div className="text-center mt-5">
            <Link href="/" className="btn btn-outline-dark">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="me-2"
              >
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
              </svg>
              Back to Home
            </Link>
          </div>
         

          </div>
        </div>

        {/* Background Decorative Elements */}
        <div 
          className="bg-decoration" 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            zIndex: -1,
            opacity: 0.1
          }}
        >
          {/* Subtle geometric background pattern */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="100%" 
            height="100%" 
            viewBox="0 0 1440 810" 
            preserveAspectRatio="xMinYMin slice"
          >
            <g fill="none" stroke="#990100" strokeWidth="1">
              {[...Array(20)].map((_, i) => (
                <circle 
                  key={i}
                  cx={Math.random() * 1440} 
                  cy={Math.random() * 810} 
                  r={Math.random() * 100}
                  opacity={0.1}
                />
              ))}
            </g>
          </svg>
        </div>
      </div>

  );
};

// Optional: Add some custom styles
const styles = `
  .app-install-page {
    font-family: 'Inter', sans-serif;
  }

  .install-hero {
    position: relative;
    overflow: hidden;
  }

  .features .feature-item {
    transition: transform 0.3s ease;
  }

  .features .feature-item:hover {
    transform: translateY(-10px);
  }

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0px); }
  }

  .install-content {
    animation: float 5s ease-in-out infinite;
  }
`;

// Add styles to the document
if (typeof window !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

export default AppInstallPage;

