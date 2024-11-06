"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useClipboard = exports.ClipboardProvider = void 0;
// useClipboard.ts
var react_1 = require("react");
var ClipboardContext = (0, react_1.createContext)(undefined);
var ClipboardProvider = function (_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)(null), clipboard = _b[0], setClipboardState = _b[1];
    // Load clipboard from localStorage when component mounts
    (0, react_1.useEffect)(function () {
        var storedClipboard = localStorage.getItem("clipboard");
        if (storedClipboard) {
            setClipboardState(JSON.parse(storedClipboard));
        }
    }, []);
    var setClipboard = function (item) {
        setClipboardState(item);
        localStorage.setItem("clipboard", JSON.stringify(item));
    };
    var clearClipboard = function () {
        setClipboardState(null);
        localStorage.removeItem("clipboard");
    };
    return (
    // @ts-ignore
    React.createElement(ClipboardContext.Provider, { value: { clipboard: clipboard, setClipboard: setClipboard, clearClipboard: clearClipboard } }, children));
};
exports.ClipboardProvider = ClipboardProvider;
var useClipboard = function () {
    var context = (0, react_1.useContext)(ClipboardContext);
    if (context === undefined) {
        throw new Error("useClipboard must be used within a ClipboardProvider");
    }
    return context;
};
exports.useClipboard = useClipboard;
