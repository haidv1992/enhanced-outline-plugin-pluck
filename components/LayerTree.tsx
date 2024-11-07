// LayerTree.tsx
import React, {useState} from "react";
import {Input, message, Tree} from "antd";
import {usePuck} from "@measured/puck";
import {DownOutlined} from "@ant-design/icons";
import ActionbarButtons from "./ActionbarButtons";
import {useClipboard} from "../hooks/useClipboard";
// @ts-ignore
import styles from "../styles/styles.module.css";

const LayerTree: React.FC = () => {
    const { dispatch, appState } = usePuck();
    const { clipboard, setClipboard } = useClipboard();
    // const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
    const [editingKey, setEditingKey] = useState<string | null>(null);
    const [titleInput, setTitleInput] = useState<string>("");

    const handleCopy = (item: any) => {
        setClipboard(item);
        localStorage.setItem("clipboard", JSON.stringify(item));
        message.success("Copied to clipboard!");
    };

    const handlePaste = (zoneKey: string) => {
        let itemToPaste = clipboard;

        if (!itemToPaste) {
            const storedClipboard = localStorage.getItem("clipboard");
            if (storedClipboard) {
                itemToPaste = JSON.parse(storedClipboard);
            }
        }

        if (!itemToPaste) {
            message.warning("Clipboard is empty!");
            return;
        }

        const newItem = {
            ...itemToPaste,
            props: {
                ...itemToPaste.props,
                id: `${itemToPaste.type}-${Date.now()}`,
            },
        };

        const updatedZones = {
            ...appState.data.zones,
            // @ts-ignore

            [zoneKey]: [...(appState.data.zones[zoneKey] || []), newItem],
        };

        dispatch({
            type: "setData",
            data: {
                ...appState.data,
                zones: updatedZones,
            },
        });
        message.success("Pasted item!");
    };

    const handleDelete = (itemId: string, zoneKey: string) => {
        if (appState.data.zones && appState.data.zones[zoneKey]) {
            const updatedZoneContent = appState.data.zones[zoneKey].filter(
                (item: any) => item.props.id !== itemId
            );

            dispatch({
                type: "setData",
                data: {
                    ...appState.data,
                    zones: {
                        ...appState.data.zones,
                        [zoneKey]: updatedZoneContent,
                    },
                },
            });
            // message.success("Deleted item!");
        } else {
            const updatedContent = appState.data.content.filter(
                (item: any) => item.props.id !== itemId
            );

            dispatch({
                type: "setData",
                data: {
                    ...appState.data,
                    content: updatedContent,
                },
            });
            message.success("Deleted item!");
        }
    };

    const handleSelect = (index: number, zoneKey: string) => {
        dispatch({
            type: "setUi",
            ui: {
                itemSelector: {
                    index,
                    zone: zoneKey === "root" ? undefined : zoneKey,
                },
            },
        });
    };

    const handleEdit = (itemId: string, currentTitle: string) => {
        setEditingKey(itemId);
        setTitleInput(currentTitle);
    };

    const handleSave = (itemId: string, zoneKey: string) => {
        // @ts-ignore

        const isZone = zoneKey && appState.data.zones[zoneKey];
        const updatedData = isZone
            ? {
                ...appState.data,
                zones: {
                    ...appState.data.zones,
                    // @ts-ignore

                    [zoneKey]: appState.data.zones[zoneKey].map((item: any) =>
                        item.props.id === itemId
                            ? {
                                ...item,
                                props: { ...item.props, outline_title: titleInput },
                            }
                            : item
                    ),
                },
            }
            : {
                ...appState.data,
                content: appState.data.content.map((item: any) =>
                    item.props.id === itemId
                        ? { ...item, props: { ...item.props, outline_title: titleInput } }
                        : item
                ),
            };

        dispatch({
            type: "setData",
            data: updatedData,
        });

        setEditingKey(null);
    };
    // @ts-ignore

    const renderTreeNodes = (items: any[], zoneKey: string = "root") =>
        items.map((item: any, index) => {
            const itemId = item.props.id;
            const itemTitle = item.props.outline_title || item.type;
            const childZoneKeys = appState.data.zones
                ? Object.keys(appState.data.zones).filter((zone) =>
                    zone.startsWith(`${itemId}:`)
                )
                : [];
            // @ts-ignore

            const childrenNodes = childZoneKeys.map((childZoneKey, index) => {
                // @ts-ignore

                const zoneItems = appState.data.zones[childZoneKey] || [];
                return {
                    title: (
                        <div className={styles.layerTreeItem}>
                            <span>{`Zone: ${index}`}</span>
                            <ActionbarButtons
                                onPaste={() => handlePaste(childZoneKey)}
                                disablePaste={!clipboard && !localStorage.getItem("clipboard")}
                            />
                        </div>
                    ),
                    key: childZoneKey,
                    children: renderTreeNodes(zoneItems, childZoneKey),
                };
            });

            return {
                title: (
                    <div
                        className={styles.layerTreeItem}
                        onClick={() => handleSelect(index, zoneKey)}
                        onDoubleClick={() => handleEdit(itemId, itemTitle)}
                    >
                        {editingKey === itemId ? (
                            <Input
                                value={titleInput}
                                onChange={(e) => setTitleInput(e.target.value)}
                                onPressEnter={() => handleSave(itemId, zoneKey)}
                                onBlur={() => handleSave(itemId, zoneKey)}
                                autoFocus
                            />
                        ) : (
                            <span>{itemTitle}</span>
                        )}
                        <ActionbarButtons
                            onCopy={() => handleCopy(item)}
                            onDelete={() => handleDelete(itemId, zoneKey)}
                            {...(childZoneKeys.length <= 1 ? { onPaste: () => handlePaste(zoneKey) } : {})}
                            disablePaste={!clipboard && !localStorage.getItem("clipboard")}
                        />
                    </div>
                ),
                key: itemId,
                children: childrenNodes,
            };
        });

    const treeData = renderTreeNodes(appState.data.content);

    return (
        <Tree
            className={styles.layerTree}
            switcherIcon={<DownOutlined />}
            treeData={treeData}
            showLine
            draggable
            height={200}
            defaultExpandAll={true}
        />
    );
};

export default LayerTree;
