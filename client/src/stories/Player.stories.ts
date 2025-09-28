import type { Meta, StoryObj } from '@storybook/react-vite';

import { Player } from '../components/Player';
import type { CardProps } from '../components/Card';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Player',
  component: Player,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof Player>;

export default meta;

type Story = StoryObj<typeof meta>;

const cards: Array<CardProps> =  [
	{
		value: "K",
		house: "♥",
	},
	{
		value: "Q",
		house: "♥",
	},
	{
		value: "Q",
		house: "♥",
	},
	{
		value: "Q",
		house: "♥",
	},
	{
		value: "Q",
		house: "♥",
	},
];


// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Simple: Story = {
	args: {
		cards: cards,
        name: "Alice",
        bank: "100",
        wager: "10",
        status: "playing",  
    }
};
