import type { Meta, StoryObj } from "@storybook/vue3-vite";

import MyButton from "../components/MyButton.vue";

const meta = {
  title: "Example/Button",
  component: MyButton,
} satisfies Meta<typeof MyButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    default: "Click me!",
  },
};
