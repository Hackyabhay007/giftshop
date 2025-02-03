export class AppInstallManager {
    constructor() {
      this.deferredPrompt = null;
      this.platform = this.detectPlatform();
    }
  
    detectPlatform() {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return {
        isAndroid: /android/i.test(userAgent),
        isIOS: /iphone|ipad|ipod/i.test(userAgent),
        isWindows: /windows/i.test(userAgent),
        isMacOS: /macintosh/i.test(userAgent),
        isMobile: /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
      };
    }
  
    // Desktop Installation
    setupDesktopInstall() {
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        this.deferredPrompt = e;
      });
    }
  
    // Mobile-specific methods
    getMobileInstallLink() {
      if (this.platform.isAndroid) {
        return 'https://play.google.com/store/apps/details?id=your.package.name';
      }
      if (this.platform.isIOS) {
        return 'https://apps.apple.com/app/your-app-name/id1234567890';
      }
      return null;
    }
  
    // Cross-platform install trigger
    triggerInstall() {
      if (this.platform.isMobile) {
        this.mobilePlatformRedirect();
      } else {
        this.desktopInstall();
      }
    }
  
    // Desktop Chrome/Edge Install
    desktopInstall() {
      if (this.deferredPrompt) {
        this.deferredPrompt.prompt();
        this.deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
          }
          this.deferredPrompt = null;
        });
      }
    }
  
    // Mobile Platform Redirect
    mobilePlatformRedirect() {
      const installLink = this.getMobileInstallLink();
      if (installLink) {
        window.location.href = installLink;
      } else {
        alert('App not available for your platform');
      }
    }
  }
  