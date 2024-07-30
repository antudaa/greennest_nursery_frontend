// redux/context/WarningContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WarningContextType {
    showWarning: (callback: () => void) => void;
    hideWarning: () => void;
    isWarningVisible: boolean;
    confirmNavigation: () => void;
}

const WarningContext = createContext<WarningContextType | undefined>(undefined);

export const WarningProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isWarningVisible, setIsWarningVisible] = useState(false);
    const [onConfirmCallback, setOnConfirmCallback] = useState<(() => void) | null>(null);

    const showWarning = (callback: () => void) => {
        setOnConfirmCallback(() => callback);
        setIsWarningVisible(true);
    };

    const hideWarning = () => setIsWarningVisible(false);

    const confirmNavigation = () => {
        if (onConfirmCallback) {
            onConfirmCallback();
        }
        hideWarning();
    };

    return (
        <WarningContext.Provider value={{ showWarning, hideWarning, isWarningVisible, confirmNavigation }}>
            {children}
        </WarningContext.Provider>
    );
};

export const useWarning = () => {
    const context = useContext(WarningContext);
    if (!context) {
        throw new Error('useWarning must be used within a WarningProvider');
    }
    return context;
};
