import {type ReactNode, useMemo, useState} from "react";
import {LoadingContext, spinnerOverlayStyle} from "@/contexts/LoadingContext.ts";

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