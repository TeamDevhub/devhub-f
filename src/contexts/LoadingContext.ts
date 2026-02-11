import { injectLoadingHandler } from "@/utils/util.api";
import React, {createContext, useContext, useEffect} from 'react';
import {useNavigation} from "react-router-dom";

interface LoadingContextType {
  isLoading: boolean;
  show: () => void;
  hide: () => void;
}

export const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const spinnerOverlayStyle: React.CSSProperties = {
  position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
  backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'center', 
  alignItems: 'center', zIndex: 9999
};

export const UseLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) throw new Error("useLoading must be used within a LoadingProvider");
  return context;
};

export const LoadingBridge = () => {
  const {show, hide} = UseLoading();
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state === 'loading') {
      show();
    } else {
      hide();
    }
  }, [navigation.state, show, hide]);

  useEffect(() => {
    injectLoadingHandler({show, hide});
  }, [show, hide]);

  return null;
};