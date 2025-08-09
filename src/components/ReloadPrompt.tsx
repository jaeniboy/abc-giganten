import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

const ReloadPrompt: React.FC = () => {
  // Only render in production or when explicitly enabled
  if (import.meta.env.DEV) {
    return null;
  }
  
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r: ServiceWorkerRegistration | undefined) {
      console.log('SW Registered: ' + r);
    },
    onRegisterError(error: any) {
      console.log('SW registration error', error);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return (
    <div className="pwa-container">
      {(offlineReady || needRefresh) && (
        <div className="pwa-toast">
          <div className="pwa-message">
            {offlineReady ? (
              <span>🎮 ABC Giganten ist jetzt offline verfügbar!</span>
            ) : (
              <span>📱 Neue Version verfügbar - zum Aktualisieren hier klicken!</span>
            )}
          </div>
          <div className="pwa-buttons">
            {needRefresh && (
              <button 
                className="pwa-button pwa-button-primary" 
                onClick={() => updateServiceWorker(true)}
              >
                Aktualisieren
              </button>
            )}
            <button className="pwa-button pwa-button-secondary" onClick={close}>
              Schließen
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReloadPrompt;
