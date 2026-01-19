import type { Meta, StoryObj } from '@storybook/react';
import { PercentSimulator } from './PercentSimulator';
import '../../../theme.css';

const meta: Meta<typeof PercentSimulator> = {
  title: 'Features/Percent/PercentSimulator',
  component: PercentSimulator,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', background: 'var(--color-background)', minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PercentSimulator>;

export const Default: Story = {};
