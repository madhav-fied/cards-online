import type { Meta, StoryObj } from '@storybook/react-vite';


import { ResultsModal } from '../components/ResultsModal';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Result Modal Show Case',
  component: ResultsModal,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof ResultsModal>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    dealerValue: 31,
    players: [
        {
            playerName: "Alice",
            playerId: "foo",
            status: "lost",
            oldBank: "100",
            wager: "5",
            newBank: "95",
        },
        {
            playerName: "Bob",
            playerId: "foobar",
            status: "win",
            oldBank: "100",
            wager: "5",
            newBank: "105",
        },
    ]
  }
};
