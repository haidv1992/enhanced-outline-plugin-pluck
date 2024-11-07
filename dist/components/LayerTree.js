"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// LayerTree.tsx
var react_1 = __importStar(require("react"));
var antd_1 = require("antd");
var puck_1 = require("@measured/puck");
var icons_1 = require("@ant-design/icons");
var ActionbarButtons_1 = __importDefault(require("./ActionbarButtons"));
var useClipboard_1 = require("../hooks/useClipboard");
// @ts-ignore
var styles_module_css_1 = __importDefault(require("../styles/styles.module.css"));
var LayerTree = function () {
    var _a = (0, puck_1.usePuck)(), dispatch = _a.dispatch, appState = _a.appState;
    var _b = (0, useClipboard_1.useClipboard)(), clipboard = _b.clipboard, setClipboard = _b.setClipboard;
    // const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
    var _c = (0, react_1.useState)(null), editingKey = _c[0], setEditingKey = _c[1];
    var _d = (0, react_1.useState)(""), titleInput = _d[0], setTitleInput = _d[1];
    var handleCopy = function (item) {
        setClipboard(item);
        localStorage.setItem("clipboard", JSON.stringify(item));
        antd_1.message.success("Copied to clipboard!");
    };
    var handlePaste = function (zoneKey) {
        var _a;
        var itemToPaste = clipboard;
        if (!itemToPaste) {
            var storedClipboard = localStorage.getItem("clipboard");
            if (storedClipboard) {
                itemToPaste = JSON.parse(storedClipboard);
            }
        }
        if (!itemToPaste) {
            antd_1.message.warning("Clipboard is empty!");
            return;
        }
        var newItem = __assign(__assign({}, itemToPaste), { props: __assign(__assign({}, itemToPaste.props), { id: "".concat(itemToPaste.type, "-").concat(Date.now()) }) });
        var updatedZones = __assign(__assign({}, appState.data.zones), (_a = {}, _a[zoneKey] = __spreadArray(__spreadArray([], (appState.data.zones[zoneKey] || []), true), [newItem], false), _a));
        dispatch({
            type: "setData",
            data: __assign(__assign({}, appState.data), { zones: updatedZones }),
        });
        antd_1.message.success("Pasted item!");
    };
    var handleDelete = function (itemId, zoneKey) {
        var _a;
        if (appState.data.zones && appState.data.zones[zoneKey]) {
            var updatedZoneContent = appState.data.zones[zoneKey].filter(function (item) { return item.props.id !== itemId; });
            dispatch({
                type: "setData",
                data: __assign(__assign({}, appState.data), { zones: __assign(__assign({}, appState.data.zones), (_a = {}, _a[zoneKey] = updatedZoneContent, _a)) }),
            });
            // message.success("Deleted item!");
        }
        else {
            var updatedContent = appState.data.content.filter(function (item) { return item.props.id !== itemId; });
            dispatch({
                type: "setData",
                data: __assign(__assign({}, appState.data), { content: updatedContent }),
            });
            antd_1.message.success("Deleted item!");
        }
    };
    var handleSelect = function (index, zoneKey) {
        dispatch({
            type: "setUi",
            ui: {
                itemSelector: {
                    index: index,
                    zone: zoneKey === "root" ? undefined : zoneKey,
                },
            },
        });
    };
    var handleEdit = function (itemId, currentTitle) {
        setEditingKey(itemId);
        setTitleInput(currentTitle);
    };
    var handleSave = function (itemId, zoneKey) {
        // @ts-ignore
        var _a;
        var isZone = zoneKey && appState.data.zones[zoneKey];
        var updatedData = isZone
            ? __assign(__assign({}, appState.data), { zones: __assign(__assign({}, appState.data.zones), (_a = {}, _a[zoneKey] = appState.data.zones[zoneKey].map(function (item) {
                    return item.props.id === itemId
                        ? __assign(__assign({}, item), { props: __assign(__assign({}, item.props), { outline_title: titleInput }) }) : item;
                }), _a)) }) : __assign(__assign({}, appState.data), { content: appState.data.content.map(function (item) {
                return item.props.id === itemId
                    ? __assign(__assign({}, item), { props: __assign(__assign({}, item.props), { outline_title: titleInput }) }) : item;
            }) });
        dispatch({
            type: "setData",
            data: updatedData,
        });
        setEditingKey(null);
    };
    // @ts-ignore
    var renderTreeNodes = function (items, zoneKey) {
        if (zoneKey === void 0) { zoneKey = "root"; }
        return items.map(function (item, index) {
            var itemId = item.props.id;
            var itemTitle = item.props.outline_title || item.type;
            var childZoneKeys = appState.data.zones
                ? Object.keys(appState.data.zones).filter(function (zone) {
                    return zone.startsWith("".concat(itemId, ":"));
                })
                : [];
            // @ts-ignore
            var childrenNodes = childZoneKeys.map(function (childZoneKey, index) {
                // @ts-ignore
                var zoneItems = appState.data.zones[childZoneKey] || [];
                return {
                    title: (react_1.default.createElement("div", { className: styles_module_css_1.default.layerTreeItem },
                        react_1.default.createElement("span", null, "Zone: ".concat(index)),
                        react_1.default.createElement(ActionbarButtons_1.default, { onPaste: function () { return handlePaste(childZoneKey); }, disablePaste: !clipboard && !localStorage.getItem("clipboard") }))),
                    key: childZoneKey,
                    children: renderTreeNodes(zoneItems, childZoneKey),
                };
            });
            return {
                title: (react_1.default.createElement("div", { className: styles_module_css_1.default.layerTreeItem, onClick: function () { return handleSelect(index, zoneKey); }, onDoubleClick: function () { return handleEdit(itemId, itemTitle); } },
                    editingKey === itemId ? (react_1.default.createElement(antd_1.Input, { value: titleInput, onChange: function (e) { return setTitleInput(e.target.value); }, onPressEnter: function () { return handleSave(itemId, zoneKey); }, onBlur: function () { return handleSave(itemId, zoneKey); }, autoFocus: true })) : (react_1.default.createElement("span", null, itemTitle)),
                    react_1.default.createElement(ActionbarButtons_1.default, __assign({ onCopy: function () { return handleCopy(item); }, onDelete: function () { return handleDelete(itemId, zoneKey); } }, (childZoneKeys.length <= 1 ? { onPaste: function () { return handlePaste(zoneKey); } } : {}), { disablePaste: !clipboard && !localStorage.getItem("clipboard") })))),
                key: itemId,
                children: childrenNodes,
            };
        });
    };
    var treeData = renderTreeNodes(appState.data.content);
    return (react_1.default.createElement(antd_1.Tree, { className: styles_module_css_1.default.layerTree, switcherIcon: react_1.default.createElement(icons_1.DownOutlined, null), treeData: treeData, showLine: true, draggable: true, height: 200, defaultExpandAll: true }));
};
exports.default = LayerTree;
