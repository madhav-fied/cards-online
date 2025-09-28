import type { Meta, StoryObj } from '@storybook/react-vite';


import { ButtonList } from '../components/ButtonList';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Button List',
  component: ButtonList,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof ButtonList>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Simple: Story = {
	args: {
		buttons: [
			{
				children: "Hi",
				onClick: () => window.alert("Hello")
			},
			{
				children: "Bye",
				onClick: () => window.alert("Bye")
			},
			{
				children: "Alert",
				onClick: () => window.alert("Warning")
			},
		]
	}
};
