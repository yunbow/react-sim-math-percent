import type { Meta, StoryObj } from '@storybook/react';
import { PercentGrid } from './PercentGrid';
import '../../../../theme.css';

const meta: Meta<typeof PercentGrid> = {
  title: 'Features/Percent/PercentGrid',
  component: PercentGrid,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', background: 'var(--color-background)' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PercentGrid>;

export const Default: Story = {
  args: {
    baseValue: 100,
    percentValue: 20,
    operation: 'discount',
    animatedCells: 0,
    showIncrease: false,
    showResult: false,
  },
};

export const DiscountAnimating: Story = {
  args: {
    baseValue: 100,
    percentValue: 20,
    operation: 'discount',
    animatedCells: 20,
    showIncrease: false,
    showResult: false,
  },
};

export const DiscountResult: Story = {
  args: {
    baseValue: 100,
    percentValue: 20,
    operation: 'discount',
    animatedCells: 20,
    showIncrease: false,
    showResult: true,
  },
};

export const IncreaseAnimating: Story = {
  args: {
    baseValue: 100,
    percentValue: 30,
    operation: 'increase',
    animatedCells: 30,
    showIncrease: true,
    showResult: false,
  },
};

export const IncreaseResult: Story = {
  args: {
    baseValue: 100,
    percentValue: 30,
    operation: 'increase',
    animatedCells: 30,
    showIncrease: true,
    showResult: true,
  },
};
