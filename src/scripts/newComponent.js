// A node script to create a new component and its storybook file
// Usage: node newComponent.js <componentName>
// Example: node newComponent.js MyComponent

const fs = require("fs");
const path = require("path");

const componentName = process.argv[2];
const targetPath = path.join(__dirname, "..", "components");
const componentPath = path.join(targetPath, `${componentName}.tsx`);
const storybookPath = path.join(targetPath, `${componentName}.stories.tsx`);
const testPath = path.join(targetPath, `${componentName}.test.tsx`);

const componentTemplate = `interface ${componentName}Props {}

const ${componentName}: React.FC<${componentName}Props> = ({}) => {
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

const testTemplate = `import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ${componentName} from "./${componentName}";
import { render } from "@/utils/testUtils";

describe("${componentName}", () => {
  it("renders", async () => {
    render(<${componentName} />); 
  });
});
`;

fs.writeFileSync(componentPath, componentTemplate);
fs.writeFileSync(storybookPath, storybookTemplate);
fs.writeFileSync(testPath, testTemplate);
