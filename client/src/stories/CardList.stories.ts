import type { Meta, StoryObj } from '@storybook/react-vite';


import { CardList } from '../components/CardList';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Card List',
  component: CardList,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof CardList>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const CardListShowCase: Story = {
  args: {
	  cards: [
		{
			value: "K",
			house: "♥",
		},
		{
			value: "Q",
			house: "♥",
		},
		{
			value: "J",
			house: "♥",
		},
		{
			value: "A",
			house: "♥",
		},
	  ]
  },
};

export const CardListShowCaseStacked: Story = {
  args: {
	  cards: [
		{
			value: "K",
			house: "♥",
		},
		{
			value: "Q",
			house: "♥",
		},
		{
			value: "J",
			house: "♥",
		},
		{
			value: "A",
			house: "♥",
		},
	  ],
	  is_stacked: true,

  },
};


