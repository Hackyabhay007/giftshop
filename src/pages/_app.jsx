import store from "@/redux/store";
import { Provider, useDispatch } from "react-redux";
import ReactModal from "react-modal";
import { useEffect,useState } from "react";
import Head from "next/head";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Cookies from "js-cookie";
import { userLoggedIn } from "@/redux/features/auth/authSlice";
import '../styles/index.scss';
import { registerSW } from '../lib/pwa'; // New PWA registration utility

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

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    }
  }, []);

  return (
    <>
      {!isOnline && (
        <div className="offline-banner">
          You are currently offline. Some features may be limited.
        </div>
      )}
    </>
  );
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
        
        {/* SEO and Additional Meta */}
        <meta name="description" content="My Sweet Wishes - Personalized Gift Shopping" />
        <title>My Sweet Wishes</title>
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

