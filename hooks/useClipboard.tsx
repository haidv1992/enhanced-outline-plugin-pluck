// useClipboard.ts
import {createContext, ReactNode, useContext, useEffect, useState} from "react";

interface ClipboardItem {
    type: string;
    props: { [key: string]: any };
}

interface ClipboardContextProps {
    clipboard: ClipboardItem | null;
    setClipboard: (item: ClipboardItem) => void;
    clearClipboard: () => void;
}

const ClipboardContext = createContext<ClipboardContextProps | undefined>(undefined);

export const ClipboardProvider = ({ children }: { children: ReactNode }) => {
    const [clipboard, setClipboardState] = useState<ClipboardItem | null>(null);

    // Load clipboard from localStorage when component mounts
    useEffect(() => {
        const storedClipboard = localStorage.getItem("clipboard");
        if (storedClipboard) {
            setClipboardState(JSON.parse(storedClipboard));
        }
    }, []);

    const setClipboard = (item: ClipboardItem) => {
        setClipboardState(item);
        localStorage.setItem("clipboard", JSON.stringify(item));
    };

    const clearClipboard = () => {
        setClipboardState(null);
        localStorage.removeItem("clipboard");
    };

    return (
        // @ts-ignore
        <ClipboardContext.Provider value={{ clipboard, setClipboard, clearClipboard }}>
            {children}
        </ClipboardContext.Provider>
    );
};

export const useClipboard = (): ClipboardContextProps => {
    const context = useContext(ClipboardContext);
    if (context === undefined) {
        throw new Error("useClipboard must be used within a ClipboardProvider");
    }
    return context;
};
