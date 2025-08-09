import React, { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showCustomPrompt, setShowCustomPrompt] = useState(false);
  const [isFirefox, setIsFirefox] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already installed (standalone mode)
    const checkStandalone = () => {
      const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches ||
                              (window.navigator as any).standalone === true ||
                              document.referrer.includes('android-app://');
      setIsStandalone(isStandaloneMode);
    };

    checkStandalone();

    // Detect browser
    const userAgent = navigator.userAgent.toLowerCase();
    const firefoxDetected = userAgent.indexOf('firefox') > -1;
    setIsFirefox(firefoxDetected);

    // Listen for the beforeinstallprompt event (Chrome/Edge)
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Store the event so it can be triggered later
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      console.log('PWA install prompt available');
      
      // Don't show custom prompt immediately - let user interact first
      setTimeout(() => {
        if (!isStandalone) {
          setShowCustomPrompt(true);
        }
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // For Firefox and other browsers without beforeinstallprompt
    if (firefoxDetected && !isStandalone) {
      // Check if service worker is registered (PWA requirement)
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(() => {
          // Show Firefox instructions after SW is ready
          setTimeout(() => {
            setShowCustomPrompt(true);
          }, 5000);
        });
      }
    }

    // Listen for successful PWA installation
    const handleAppInstalled = () => {
      console.log('PWA was installed');
      setShowCustomPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [isStandalone]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Chrome/Edge installation
      try {
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to install prompt: ${outcome}`);
        
        if (outcome === 'accepted') {
          setDeferredPrompt(null);
          setShowCustomPrompt(false);
        }
      } catch (error) {
        console.error('Error during PWA installation:', error);
      }
    } else if (isFirefox) {
      // Show Firefox-specific instructions
      setShowInstructions(true);
    }
  };

  const handleDismiss = () => {
    setShowCustomPrompt(false);
    setShowInstructions(false);
    setDeferredPrompt(null);
    
    // Remember dismissal for 7 days
    localStorage.setItem('abc-giganten-install-dismissed', Date.now().toString());
  };

  // Check if user previously dismissed the prompt
  useEffect(() => {
    const dismissed = localStorage.getItem('abc-giganten-install-dismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
      if (dismissedTime > sevenDaysAgo) {
        setShowCustomPrompt(false);
        return;
      }
    }
  }, []);

  // Don't show anything if already installed
  if (isStandalone || !showCustomPrompt) {
    return null;
  }

  if (showInstructions && isFirefox) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              🦊 Firefox Installation
            </h3>
            <button
              onClick={handleDismiss}
              className="text-gray-400 hover:text-gray-600 text-xl leading-none"
              aria-label="Schließen"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">📱 Für die beste PWA-Erfahrung in Firefox:</h4>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Installieren Sie die <strong>PWAsForFirefox</strong> Erweiterung</li>
                <li>Laden Sie das <strong>native Programm</strong> herunter</li>
                <li>Dann können Sie ABC Giganten wie eine echte App installieren!</li>
              </ol>
            </div>
            
            <div className="bg-blue-50 p-3 rounded">
              <h4 className="font-medium text-blue-900 mb-1">🔗 Installation Links:</h4>
              <div className="space-y-1 text-xs">
                <p><strong>Erweiterung:</strong> <span className="font-mono">addons.mozilla.org</span> → "PWAsForFirefox" suchen</p>
                <p><strong>Programm:</strong> <span className="font-mono">github.com/filips123/PWAsForFirefox</span></p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded">
              <h4 className="font-medium text-gray-900 mb-1">🔄 Alternative:</h4>
              <p className="text-xs">Nutzen Sie Chrome, Edge oder Safari für native PWA-Installation ohne zusätzliche Software.</p>
            </div>
          </div>
          
          <div className="flex gap-2 mt-6">
            <button
              onClick={() => window.open('https://addons.mozilla.org/firefox/addon/pwas-for-firefox/', '_blank')}
              className="flex-1 bg-orange-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-orange-700 transition-colors"
            >
              Erweiterung öffnen
            </button>
            <button
              onClick={handleDismiss}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors"
            >
              Später
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50 max-w-md mx-auto">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-sm mb-1">
            📱 App installieren
          </h3>
          <p className="text-xs opacity-90 mb-3">
            {deferredPrompt 
              ? "Installieren Sie ABC Giganten auf Ihrem Gerät für schnellen Zugriff!"
              : isFirefox 
                ? "Installieren Sie ABC Giganten für offline Nutzung und bessere Performance!"
                : "Fügen Sie ABC Giganten zu Ihrem Startbildschirm hinzu!"
            }
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleInstallClick}
              className="bg-white text-blue-600 px-3 py-1 rounded text-xs font-medium hover:bg-gray-100 transition-colors"
            >
              {deferredPrompt ? "Installieren" : "Anleitung"}
            </button>
            <button
              onClick={handleDismiss}
              className="text-white px-3 py-1 rounded text-xs border border-white/30 hover:bg-white/10 transition-colors"
            >
              Später
            </button>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="text-white/70 hover:text-white ml-2 text-lg leading-none"
          aria-label="Schließen"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default InstallPrompt;
