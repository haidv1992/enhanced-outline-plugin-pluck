"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ActionbarButtons.tsx
var react_1 = __importDefault(require("react"));
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var ActionbarButtons = function (_a) {
    var onCopy = _a.onCopy, onPaste = _a.onPaste, onDelete = _a.onDelete, disablePaste = _a.disablePaste;
    return (react_1.default.createElement("div", { style: { display: "flex", gap: "3px", marginLeft: 5 } },
        onCopy && (react_1.default.createElement(antd_1.Tooltip, { title: "Copy" },
            react_1.default.createElement(antd_1.Button, { size: "small", icon: react_1.default.createElement(icons_1.CopyOutlined, null), onClick: onCopy }))),
        onPaste && (react_1.default.createElement(antd_1.Tooltip, { title: "Paste" },
            react_1.default.createElement(antd_1.Button, { size: "small", icon: react_1.default.createElement(icons_1.PlusOutlined, null), onClick: onPaste, disabled: disablePaste }))),
        onDelete && (react_1.default.createElement(antd_1.Tooltip, { title: "Delete" },
            react_1.default.createElement(antd_1.Button, { size: "small", icon: react_1.default.createElement(icons_1.DeleteOutlined, null), onClick: onDelete })))));
};
exports.default = ActionbarButtons;
