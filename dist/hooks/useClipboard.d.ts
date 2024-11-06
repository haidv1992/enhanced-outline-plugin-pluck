import { ReactNode } from "react";
interface ClipboardItem {
    type: string;
    props: {
        [key: string]: any;
    };
}
interface ClipboardContextProps {
    clipboard: ClipboardItem | null;
    setClipboard: (item: ClipboardItem) => void;
    clearClipboard: () => void;
}
export declare const ClipboardProvider: ({ children }: {
    children: ReactNode;
}) => import("react").JSX.Element;
export declare const useClipboard: () => ClipboardContextProps;
export {};
