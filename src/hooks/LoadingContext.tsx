import React, { createContext, useContext, useMemo, useState, type ReactNode, } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  show: () => void;
  hide: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loadingCount, setLoadingCount] = useState(0);

  const loadingActions = useMemo(() => ({
    show: () => setLoadingCount(prev => prev + 1),
    hide: () => setLoadingCount(prev => Math.max(0, prev - 1)),
  }), []);

  const isLoading = loadingCount > 0;

  return (
    <LoadingContext.Provider value={{ isLoading, ...loadingActions }}>
      {children}
      {isLoading && (
        <div style={spinnerOverlayStyle}>
          <div className="spinner">로딩 중...</div>
        </div>
      )}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) throw new Error("useLoading must be used within a LoadingProvider");
  return context;
};

const spinnerOverlayStyle: React.CSSProperties = {
  position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
  backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'center', 
  alignItems: 'center', zIndex: 9999
};