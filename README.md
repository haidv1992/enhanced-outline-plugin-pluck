### Project Name: Enhanced Outline Plugin for Puck

### Demo
[preview.mov](preview.mov)

#### Description
Enhanced Outline Plugin is a versatile plugin for the Puck visual editor, designed to provide a dynamic, tree-based outline component for organizing and managing nested structures within a Puck-based UI. Leveraging Ant Design's Tree component, this plugin offers functionality for adding, copying, pasting, and deleting components directly from the outline view. It supports hierarchical structures, such as content with nested zones, allowing for intuitive drag-and-drop style interaction and comprehensive control over UI component layouts.

### Features
- **Tree-based Outline View**: Visualize component hierarchies with expand/collapse functionality.
- **Copy/Paste Support**: Easily duplicate components within the outline or between different UI instances.
- **Delete Functionality**: Remove unwanted components directly from the outline view.
- **Ant Design Integration**: Uses Ant Design's `Tree` and `Button` components for a clean, interactive UI.
- **Dynamic Data Rendering**: Automatically renders based on Puck's `appState.data` content and zones.

### Installation
To add this plugin to your Puck project, install the package as follows:
```bash
npm install git+https://github.com/haidv1992/enhanced-outline-plugin-pluck.git
```

### Usage
1. **Import and Include in Puck**  
   To use the Enhanced Outline Plugin, include it as a plugin in your Puck instance.

   ```jsx
   import { Puck } from "@measured/puck";
   import { EnhancedOutlinePlugin } from "enhanced-outline-plugin-pluck";

   function MyEditor() {
     return (
       <Puck plugins={[EnhancedOutlinePlugin]}>
         <MyComponents />
       </Puck>
     );
   }

   export default MyEditor;
   ```

2. **Configuring the Outline**  
   The plugin automatically integrates into Puck's UI and renders a tree-based outline. You can use the standard Puck API to interact with the plugin's outline.

### Development
To work on or customize this plugin, clone the repository and run the following commands:

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development mode** (with TypeScript watch):
   ```bash
   npm run dev
   ```

3. **Build the plugin**:
   ```bash
   npm run build
   ```

4. **Run tests**:
   ```bash
   npm run test
   ```

### Example Code
Here’s a basic example showing the Enhanced Outline Plugin in action within a Puck editor instance.

```jsx
import React from "react";
import { Puck } from "@measured/puck";
import { EnhancedOutlinePlugin } from "enhanced-outline-plugin-pluck";

const MyEditor = () => {
  return (
    <Puck plugins={[EnhancedOutlinePlugin]}>
      <div>Your editor content here</div>
    </Puck>
  );
};

export default MyEditor;
```

### File Structure
- **/components**: Contains the main UI components such as `LayerTree` for displaying the tree outline and `ActionbarButtons` for managing component actions (copy/paste/delete).
- **/hooks**: Contains helper hooks such as `useClipboard` for clipboard functionality.
- **/dist**: The compiled output directory.
- **/src**: Source directory for TypeScript files.
- **/styles**: Contains custom CSS and Ant Design overrides to style the outline and buttons.

### License
This plugin is licensed under the MIT License.

### Notes
- This plugin is designed for use with React 18 and requires `@measured/puck` version 0.16.2 or later.
- Compatibility with other versions of Puck or React may vary.

### Repository
For the latest updates and source code, visit the GitHub repository: [enhanced-outline-plugin-pluck](https://github.com/haidv1992/enhanced-outline-plugin-pluck)

This plugin provides a flexible and user-friendly interface for managing complex, nested structures in the Puck UI, improving user productivity and interface organization.

