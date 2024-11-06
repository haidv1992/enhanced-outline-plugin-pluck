"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Outline.tsx
var react_1 = __importDefault(require("react"));
var LayerTree_1 = __importDefault(require("./LayerTree"));
var useClipboard_1 = require("../hooks/useClipboard");
var Outline = function () {
    return (react_1.default.createElement(useClipboard_1.ClipboardProvider, null,
        react_1.default.createElement(LayerTree_1.default, null)));
};
exports.default = Outline;
