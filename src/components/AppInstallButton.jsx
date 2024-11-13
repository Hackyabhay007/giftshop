import React, { useState, useEffect } from 'react';

// App Install Manager Utility
class AppInstallManager {
  constructor() {
    this.deferredPrompt = null;
    this.platform = this.detectPlatform();
  }

  detectPlatform() {
    const userAgent = typeof window !== 'undefined'
      ? window.navigator.userAgent.toLowerCase()
      : '';
    return {
      isAndroid: /android/i.test(userAgent),
      isIOS: /iphone|ipad|ipod/i.test(userAgent),
      isMobile: /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent),
    };
  }

  setupDesktopInstall() {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        this.deferredPrompt = e;
      });
    }
  }

  triggerInstall(onSuccess, onFailure) {
    if (this.platform.isMobile) {
      this.mobilePlatformRedirect(onSuccess, onFailure);
    } else {
      this.desktopInstall(onSuccess, onFailure);
    }
  }

  desktopInstall(onSuccess, onFailure) {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
          onSuccess && onSuccess();
        } else {
          console.log('User dismissed the install prompt');
          onFailure && onFailure();
        }
        this.deferredPrompt = null;
      }).catch((error) => {
        console.error('Install failed', error);
        onFailure && onFailure(error);
      });
    } else {
      onFailure && onFailure(new Error('No install prompt available'));
    }
  }

  mobilePlatformRedirect(onSuccess, onFailure) {
    const installLink = this.platform.isAndroid
      ? 'https://play.google.com/store/apps/details?id=your.package.name'
      : this.platform.isIOS
      ? 'https://apps.apple.com/app/your-app-name/id1234567890'
      : null;

    if (installLink && typeof window !== 'undefined') {
      try {
        window.location.href = installLink;
        onSuccess && onSuccess();
      } catch (error) {
        console.error('Redirect failed', error);
        onFailure && onFailure(error);
      }
    } else {
      onFailure && onFailure(new Error('No install link available'));
    }
  }
}

// Reusable Install Button Component
const AppInstallButton = ({
  variant = 'danger', // Defaulting to red variant
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
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const manager = new AppInstallManager();
    setInstallManager(manager);

    // Desktop setup
    if (!manager.platform.isMobile) {
      manager.setupDesktopInstall();
      setShowInstallButton(true);
    }

    // Mobile setup
    if (manager.platform.isMobile) {
      setShowInstallButton(true);
    }
  }, []);

  const handleInstallClick = () => {
    if (installManager) {
      installManager.triggerInstall(
        () => {
          // Success callback
          onInstallSuccess && onInstallSuccess();
        },
        (error) => {
          // Failure callback
          onInstallFailure && onInstallFailure(error);
        }
      );
    }
  };

  // Determine button text and icon
  const buttonText = installManager?.platform.isMobile
    ? (children || 'Get App')
    : (children || 'Install App');

  const buttonIcon = installManager?.platform.isMobile 
    ? 'bi-phone' 
    : 'bi-download';

  // Dynamic class generation for button styles
  const buttonClasses = [
    'btn',
    `btn-${variant}`,
    size !== 'md' && `btn-${size}`,
    fullWidth && 'w-100',
    'install-app-btn',
    className,
  ].filter(Boolean).join(' ');

  // Don't render if install is not supported
  if (!showInstallButton) return null;

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
      {iconPosition === 'left' && (
        <i className={`bi ${buttonIcon}`}></i>
      )}
      {buttonText}
      {iconPosition === 'right' && (
        <i className={`bi ${buttonIcon}`}></i>
      )}
    </button>
  );
};

// Preset configurations with red theme
AppInstallButton.presets = {
  navbar: {
    variant: 'outline-danger', // Outline red for navbar
    size: 'sm',
  },
  hero: {
    variant: 'danger', // Solid red for hero section
    size: 'lg',
    fullWidth: true,
  },
  card: {
    variant: 'danger', // Solid red for card
    size: 'md',
  }
};

export default AppInstallButton;
