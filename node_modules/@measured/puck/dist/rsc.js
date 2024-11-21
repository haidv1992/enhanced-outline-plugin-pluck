"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// rsc.tsx
var rsc_exports = {};
__export(rsc_exports, {
  Render: () => Render,
  resolveAllData: () => resolveAllData
});
module.exports = __toCommonJS(rsc_exports);

// ../tsup-config/react-import.js
var import_react = __toESM(require("react"));

// lib/root-droppable-id.ts
var rootDroppableId = "default-zone";

// lib/setup-zone.ts
var setupZone = (data, zoneKey) => {
  if (zoneKey === rootDroppableId) {
    return data;
  }
  const newData = __spreadProps(__spreadValues({}, data), {
    zones: data.zones ? __spreadValues({}, data.zones) : {}
  });
  newData.zones[zoneKey] = newData.zones[zoneKey] || [];
  return newData;
};

// components/ServerRender/index.tsx
var import_jsx_runtime = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: content.map((item) => {
    const Component = config.components[item.type];
    if (Component) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        Component.render,
        __spreadProps(__spreadValues({}, item.props), {
          puck: {
            renderDropZone: ({ zone: zone2 }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      config.root.render,
      __spreadProps(__spreadValues({}, rootProps), {
        puck: {
          renderDropZone: ({ zone }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropZoneRender, { zone, data, config }),
          isEditing: false
        },
        title,
        editMode: false,
        id: "puck-root",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropZoneRender, { config, data, zone: rootDroppableId })
      })
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropZoneRender, { config, data, zone: rootDroppableId });
}

// lib/get-changed.ts
var getChanged = (newItem, oldItem) => {
  return newItem ? Object.keys(newItem.props || {}).reduce((acc, item) => {
    const newItemProps = (newItem == null ? void 0 : newItem.props) || {};
    const oldItemProps = (oldItem == null ? void 0 : oldItem.props) || {};
    return __spreadProps(__spreadValues({}, acc), {
      [item]: oldItemProps[item] !== newItemProps[item]
    });
  }, {}) : {};
};

// lib/resolve-component-data.ts
var cache = { lastChange: {} };
var resolveAllComponentData = (content, config, onResolveStart, onResolveEnd) => __async(void 0, null, function* () {
  return yield Promise.all(
    content.map((item) => __async(void 0, null, function* () {
      return yield resolveComponentData(
        item,
        config,
        onResolveStart,
        onResolveEnd
      );
    }))
  );
});
var resolveComponentData = (item, config, onResolveStart, onResolveEnd) => __async(void 0, null, function* () {
  const configForItem = config.components[item.type];
  if (configForItem.resolveData) {
    const { item: oldItem = null, resolved = {} } = cache.lastChange[item.props.id] || {};
    if (item && item === oldItem) {
      return resolved;
    }
    const changed = getChanged(item, oldItem);
    if (onResolveStart) {
      onResolveStart(item);
    }
    const { props: resolvedProps, readOnly = {} } = yield configForItem.resolveData(item, { changed, lastData: oldItem });
    const { readOnly: existingReadOnly = {} } = item || {};
    const newReadOnly = __spreadValues(__spreadValues({}, existingReadOnly), readOnly);
    const resolvedItem = __spreadProps(__spreadValues({}, item), {
      props: __spreadValues(__spreadValues({}, item.props), resolvedProps)
    });
    if (Object.keys(newReadOnly).length) {
      resolvedItem.readOnly = newReadOnly;
    }
    cache.lastChange[item.props.id] = {
      item,
      resolved: resolvedItem
    };
    if (onResolveEnd) {
      onResolveEnd(resolvedItem);
    }
    return resolvedItem;
  }
  return item;
});

// lib/resolve-root-data.ts
var cache2 = {};
function resolveRootData(data, config) {
  return __async(this, null, function* () {
    var _a, _b, _c, _d, _e;
    if (((_a = config.root) == null ? void 0 : _a.resolveData) && data.root.props) {
      if (((_b = cache2.lastChange) == null ? void 0 : _b.original) === data.root) {
        return cache2.lastChange.resolved;
      }
      const changed = getChanged(data.root, (_c = cache2.lastChange) == null ? void 0 : _c.original);
      const rootWithProps = data.root;
      const resolvedRoot = yield (_e = config.root) == null ? void 0 : _e.resolveData(rootWithProps, {
        changed,
        lastData: ((_d = cache2.lastChange) == null ? void 0 : _d.original) || {}
      });
      cache2.lastChange = {
        original: data.root,
        resolved: resolvedRoot
      };
      return __spreadProps(__spreadValues(__spreadValues({}, data.root), resolvedRoot), {
        props: __spreadValues(__spreadValues({}, data.root.props), resolvedRoot.props)
      });
    }
    return data.root;
  });
}

// lib/default-data.ts
var defaultData = (data) => __spreadProps(__spreadValues({}, data), {
  root: data.root || {},
  content: data.content || []
});

// lib/resolve-all-data.ts
function resolveAllData(data, config, onResolveStart, onResolveEnd) {
  return __async(this, null, function* () {
    const defaultedData = defaultData(data);
    const dynamicRoot = yield resolveRootData(defaultedData, config);
    const { zones = {} } = data;
    const zoneKeys = Object.keys(zones);
    const resolvedZones = {};
    for (let i = 0; i < zoneKeys.length; i++) {
      const zoneKey = zoneKeys[i];
      resolvedZones[zoneKey] = yield resolveAllComponentData(
        zones[zoneKey],
        config,
        onResolveStart,
        onResolveEnd
      );
    }
    return __spreadProps(__spreadValues({}, defaultedData), {
      root: dynamicRoot,
      content: yield resolveAllComponentData(
        defaultedData.content,
        config,
        onResolveStart,
        onResolveEnd
      ),
      zones: resolvedZones
    });
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Render,
  resolveAllData
});
