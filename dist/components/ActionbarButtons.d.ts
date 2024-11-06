import React from "react";
interface ActionbarButtonsProps {
    onCopy?: () => void;
    onPaste?: () => void;
    onDelete?: () => void;
    disablePaste?: boolean;
}
declare const ActionbarButtons: React.FC<ActionbarButtonsProps>;
export default ActionbarButtons;
