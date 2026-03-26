import { injectLoadingHandler } from "@/utils/util.api";
import {createContext, useContext, useEffect} from 'react';
import {useNavigation} from "react-router-dom";

interface LoadingContextType {
  isLoading: boolean;
  show: () => void;
  hide: () => void;
}

export const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) throw new Error("useLoading must be used within a LoadingProvider");
  return context;
};

export const LoadingBridge = () => {
  const {show, hide} = useLoading();
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