// A node script to create a new component and its storybook file
// Usage: node newComponent.js <componentName>
// Example: node newComponent.js MyComponent

const fs = require("fs");
const path = require("path");

const componentName = process.argv[2];
const targetPath = path.join(__dirname, "..", "components");
const componentPath = path.join(targetPath, `${componentName}.tsx`);
const storybookPath = path.join(targetPath, `${componentName}.stories.tsx`);

const componentTemplate = `import { FC } from "react";

interface ${componentName}Props {}

const ${componentName}: FC<${componentName}Props> = ({}) => {
  return null;
};

export default ${componentName};`;

const storybookTemplate = `import type { Meta, StoryObj } from "@storybook/react";
import ${componentName} from "./${componentName}";

const meta = {
  title: "Components/${componentName}",
  component: ${componentName},
} satisfies Meta<typeof ${componentName}>;

export default meta;

type Story = StoryObj<typeof ${componentName}>;

export const Primary: Story = { args: {} };`;

fs.writeFileSync(componentPath, componentTemplate);
fs.writeFileSync(storybookPath, storybookTemplate);
