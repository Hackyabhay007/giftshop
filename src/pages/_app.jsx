import React, { useEffect, useState } from 'react';
import store from "@/redux/store";
import { Provider, useDispatch } from "react-redux";
import ReactModal from "react-modal";
import Head from "next/head";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Cookies from "js-cookie";
import { userLoggedIn } from "@/redux/features/auth/authSlice";
import '../styles/index.scss';
import { registerSW } from '../lib/pwa';
import "@fontsource/tangerine";

// Bootstrap JS and Modal setup
if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
  ReactModal.setAppElement("body");
}

// Google OAuth setup
const NEXT_PUBLIC_GOOGLE_CLIENT_ID = '23455951198-r713jg4kfn9bnp8bs2trs5kk92tfubef.apps.googleusercontent.com';

// Component to hydrate Redux state on load
function HydrateAuthState() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userInfo = Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : null;

    if (userInfo) {
      dispatch(
        userLoggedIn({
          accessToken: userInfo.accessToken,
          user: userInfo.user,
        })
      );
    }
  }, [dispatch]);

  return null;
}

// Network Status Component for Offline Indication
function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Remove offline class from body
      document.body.classList.remove('offline');
    };

    const handleOffline = () => {
      setIsOnline(false);
      // Add offline class to body to prevent interactions
      document.body.classList.add('offline');
    };

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check
    const checkOnlineStatus = () => {
      const status = navigator.onLine;
      setIsOnline(status);
      
      if (!status) {
        document.body.classList.add('offline');
      } else {
        document.body.classList.remove('offline');
      }
    };

    checkOnlineStatus();

    // Periodic online check
    const intervalId = setInterval(checkOnlineStatus, 5000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(intervalId);
      document.body.classList.remove('offline');
    };
  }, []);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    
    // Attempt to reload
    try {
      // Attempt to fetch a small resource to check connectivity
      fetch('/api/health', { method: 'GET', cache: 'no-store' })
        .then(response => {
          if (response.ok) {
            // Reload the page if successful
            window.location.reload();
          }
        })
        .catch(() => {
          // If fetch fails, show a message
          console.log('Still unable to connect');
        });
    } catch (error) {
      console.error('Retry failed', error);
    }
  };

  if (!isOnline) {
    return (
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          textAlign: 'center',
          padding: '20px',
          backdropFilter: 'blur(10px)',
          animation: 'fadeIn 0.5s ease-out'
        }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="120" 
          height="120" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="white" 
          strokeWidth="1" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          style={{ 
            marginBottom: '30px',
            animation: 'pulse 2s infinite'
          }}
        >
          <path d="M1 1l22 22" />
          <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
          <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
          <path d="M10.71 5.05A16 16 0 0 1 22.55 5" />
          <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
          <line x1="12" y1="20" x2="12.01" y2="20" />
        </svg>

        <h1 
          style={{ 
            fontSize: '2rem', 
            marginBottom: '20px',
            color: '#fff'
          }}
        >
          No Internet Connection
        </h1>

        <p 
          style={{ 
            fontSize: '1rem', 
            marginBottom: '30px',
            maxWidth: '400px',
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.8)'
          }}
        >
          {retryCount > 2 
            ? "We're having trouble connecting. Please check your network settings." 
            : "Please check your network connection and try again. Some features require an active internet connection."}
        </p>

        <button 
          onClick={handleRetry}
          disabled={retryCount > 2}
          style={{
            padding: '12px 24px',
            backgroundColor: retryCount > 2 ? '#666' : 'white',
            color: retryCount > 2 ? '#999' : '#990100',
            border: 'none',
            borderRadius: '50px',
            fontSize: '1rem',
            cursor: retryCount > 2 ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: retryCount > 2 ? 0.5 : 1
          }}
          onMouseOver={(e) => {
            if (retryCount <= 2) {
              e.target.style.transform = 'scale(1.05)';
            }
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={{ marginRight: '10px' }}
          >
            <path d="M23 4v6h-6"></path>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
          </svg>
          {retryCount > 2 ? 'Connection Failed' : 'Retry Connection'}
        </button>
      </div>
    );
  }

  return null;
}

export default function App({ Component, pageProps }) {
  // Register Service Worker on client-side
  useEffect(() => {
    registerSW();
  }, []);

  return (
    <>
      <Head>
        {/* PWA Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#990100" />
        
        {/* Manifest and Icons */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      
 
        {/* iOS Specific Tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes"></meta>
        {/* SEO and Additional Meta */}
        <meta name="description" content="My Sweet Wishes - Personalized Gift Shopping" />
        <title>My Sweet Wishes</title>

        {/* Global Styles and Animations */}
        <style jsx global>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }

          /* Prevent any interactions when offline */
          body.offline {
            pointer-events: none;
            user-select: none;
            overflow: hidden;
          }

          body.offline * {
            cursor: not-allowed !important;
          }
        `}</style>
      </Head>

      <GoogleOAuthProvider clientId={NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <Provider store={store}>
          <div id="root">
            {/* Network Status Indicator */}
            <NetworkStatus />

            {/* Hydrate Redux state from cookies */}
            <HydrateAuthState />

            <Component {...pageProps} />
          </div>
        </Provider>
      </GoogleOAuthProvider>
    </>
  );
}
