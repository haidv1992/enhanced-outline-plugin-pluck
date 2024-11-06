// Outline.tsx
import React from "react";
import LayerTree from "./LayerTree";
import {ClipboardProvider} from "../hooks/useClipboard";

const CustomOutline: React.FC = () => {
    return (
        <ClipboardProvider>
            <LayerTree />
        </ClipboardProvider>
    );
};

export default CustomOutline;
