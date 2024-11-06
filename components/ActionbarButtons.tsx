// ActionbarButtons.tsx
import React from "react";
import {Button, Tooltip} from "antd";
import {CopyOutlined, DeleteOutlined, PlusOutlined} from "@ant-design/icons";

interface ActionbarButtonsProps {
    onCopy?: () => void;
    onPaste?: () => void;
    onDelete?: () => void;
    disablePaste?: boolean;
}

const ActionbarButtons: React.FC<ActionbarButtonsProps> = ({
                                                               onCopy,
                                                               onPaste,
                                                               onDelete,
                                                               disablePaste,
                                                           }) => {
    return (
        <div style={{ display: "flex", gap: "3px" ,marginLeft: 5}}>
            {onCopy && (
                <Tooltip title="Copy">
                    <Button size="small" icon={<CopyOutlined />} onClick={onCopy} />
                </Tooltip>
            )}
            {onPaste && (
                <Tooltip title="Paste">
                    <Button
                        size="small"
                        icon={<PlusOutlined />}
                        onClick={onPaste}
                        disabled={disablePaste}
                    />
                </Tooltip>
            )}
            {onDelete && (
                <Tooltip title="Delete">
                    <Button  size="small" icon={<DeleteOutlined />} onClick={onDelete} />
                </Tooltip>
            )}
        </div>
    );
};

export default ActionbarButtons;
