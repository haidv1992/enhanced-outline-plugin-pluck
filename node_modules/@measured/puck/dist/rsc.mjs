import {
  __spreadProps,
  __spreadValues,
  init_react_import,
  resolveAllData,
  rootDroppableId,
  setupZone
} from "./chunk-7IH6SUIT.mjs";

// rsc.tsx
init_react_import();

// components/ServerRender/index.tsx
init_react_import();
import { Fragment, jsx } from "react/jsx-runtime";
function DropZoneRender({
  zone,
  data,
  areaId = "root",
  config
}) {
  let zoneCompound = rootDroppableId;
  let content = (data == null ? void 0 : data.content) || [];
  if (!data || !config) {
    return null;
  }
  if (areaId && zone && zone !== rootDroppableId) {
    zoneCompound = `${areaId}:${zone}`;
    content = setupZone(data, zoneCompound).zones[zoneCompound];
  }
  return /* @__PURE__ */ jsx(Fragment, { children: content.map((item) => {
    const Component = config.components[item.type];
    if (Component) {
      return /* @__PURE__ */ jsx(
        Component.render,
        __spreadProps(__spreadValues({}, item.props), {
          puck: {
            renderDropZone: ({ zone: zone2 }) => /* @__PURE__ */ jsx(
              DropZoneRender,
              {
                zone: zone2,
                data,
                areaId: item.props.id,
                config
              }
            )
          }
        }),
        item.props.id
      );
    }
    return null;
  }) });
}
function Render({
  config,
  data
}) {
  var _a;
  if ((_a = config.root) == null ? void 0 : _a.render) {
    const rootProps = data.root.props || data.root;
    const title = rootProps.title || "";
    return /* @__PURE__ */ jsx(
      config.root.render,
      __spreadProps(__spreadValues({}, rootProps), {
        puck: {
          renderDropZone: ({ zone }) => /* @__PURE__ */ jsx(DropZoneRender, { zone, data, config }),
          isEditing: false
        },
        title,
        editMode: false,
        id: "puck-root",
        children: /* @__PURE__ */ jsx(DropZoneRender, { config, data, zone: rootDroppableId })
      })
    );
  }
  return /* @__PURE__ */ jsx(DropZoneRender, { config, data, zone: rootDroppableId });
}
export {
  Render,
  resolveAllData
};
