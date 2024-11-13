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
      // Capture install prompt for web browsers
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        this.installPromptEvent = e;
      });

      // Handle iOS Add to Home Screen detection
      window.addEventListener('load', () => {
        if (this.platform.isIOS && !this.platform.isStandalone) {
          this.showIOSInstallInstructions();
        }
      });
    }
  }

  showIOSInstallInstructions() {
    // Custom method to show iOS installation instructions
    const iosInstallGuide = `
      To install the app on iOS:
      1. Tap the Share button in Safari
      2. Scroll and tap "Add to Home Screen"
      3. Name the app and tap "Add"
    `;
    alert(iosInstallGuide);
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
      // Fallback for Android if prompt is not available
      this.showFallbackInstallInstructions();
      onFailure && onFailure(new Error('Install prompt not available'));
    }
  }

  triggerIOSInstall(onSuccess, onFailure) {
    if (this.platform.isIOS && !this.platform.isStandalone) {
      this.showIOSInstallInstructions();
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
      this.showFallbackInstallInstructions();
      onFailure && onFailure(new Error('Desktop install not available'));
    }
  }

  showFallbackInstallInstructions() {
    alert(`
      PWA Installation Instructions:
      1. Make sure you're using a compatible browser
      2. Look for the install icon in the address bar
      3. Click the install/add button in your browser
    `);
  }
}

const AppInstallButton = ({
  variant = 'danger',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  iconPosition = 'left',
  onInstallSuccess,
  onInstallFailure,
  ...props
}) => {
  const [installManager, setInstallManager] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

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

  // Dynamic button classes
  const buttonClasses = [
    'btn',
    `btn-${variant}`,
    size !== 'md' && `btn-${size}`,
    fullWidth && 'w-100',
    'install-app-btn',
    className
  ].filter(Boolean).join(' ');

  // Determine button text and icon
  const buttonText = installManager?.platform.isMobile 
    ? (children || 'Get App') 
    : (children || 'Install App');
  
  const buttonIcon = installManager?.platform.isMobile 
    ? 'bi-phone' 
    : 'bi-download';

  return (
    <button
      onClick={handleInstallClick}
      className={buttonClasses}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        transition: 'all 0.3s ease',
        ...props.style,
      }}
      {...props}
    >
      {iconPosition === 'left' && <i className={`bi ${buttonIcon}`}></i>}
      {buttonText}
      {iconPosition === 'right' && <i className={`bi ${buttonIcon}`}></i>}
    </button>
  );
};

// Preset configurations remain the same
AppInstallButton.presets = {
  navbar: {
    variant: 'outline-danger',
    size: 'sm',
  },
  hero: {
    variant: 'danger',
    size: 'lg',
    fullWidth: true,
  },
  card: {
    variant: 'danger',
    size: 'md',
  },
};

export default AppInstallButton;
