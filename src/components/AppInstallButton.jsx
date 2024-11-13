import React, { useState, useEffect } from 'react';

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

    // Setup PWA installation
    manager.setupPWAInstall();

    // Check installability
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

  // Don't render if not installable
  if (!isInstallable) return null;

  // Button Style
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

// Preset Configurations
AppInstallButton.presets = {
  navbar: {
    style: {
      fontSize: "14px",
      padding: "8px 16px",
      minWidth: "150px"
    }
  },
  hero: {
    style: {
      fontSize: "18px",
      padding: "12px 24px",
      minWidth: "250px"
    }
  },
  card: {
    style: {
      fontSize: "16px",
      padding: "10px 20px",
      minWidth: "200px"
    }
  }
};

export default AppInstallButton;
