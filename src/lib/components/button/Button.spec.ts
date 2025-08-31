import { act, fireEvent, render } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import Button from './Button.svelte';

describe('Button.svelte', () => {
  it('renders with default props', () => {
    const { getByRole } = render(Button, { props: { type: 'button' } });
    const button = getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('border', 'bg-white');
  });

  it('applies primary variant styles', () => {
    const { getByRole } = render(Button, { props: { variant: 'primary' } });
    const button = getByRole('button');
    expect(button).toHaveClass('bg-blue-600');
  });

  it('applies variant classes correctly', async () => {
    const { getByRole, rerender } = render(Button, { props: { variant: 'primary' } });
    let button = getByRole('button');
    expect(button).toHaveClass('bg-blue-600');

    await act(() => rerender({ variant: 'danger' }));
    button = getByRole('button');
    expect(button).toHaveClass('bg-red-600');

    await act(() => rerender({ variant: 'success' }));
    button = getByRole('button');
    expect(button).toHaveClass('bg-green-600');
  });

  it('disables the button when disabled=true', () => {
    const { getByRole } = render(Button, { props: { disabled: true } });
    const button = getByRole('button') as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    expect(button).toHaveClass('cursor-not-allowed');
  });

  it('uses provided type attribute', async () => {
    const { getByRole, rerender } = render(Button, { props: { type: 'submit' } });
    let button = getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');

    await act(() => rerender({ type: 'reset' }));
    button = getByRole('button');
    expect(button).toHaveAttribute('type', 'reset');
  });

  it('fires click event when clicked', async () => {
    const handleClick = vi.fn();
    const { getByRole, component } = render(Button, {
      props: { type: 'button', variant: 'primary' },
    });

    const button = getByRole('button');
    button.addEventListener('click', handleClick);
    await fireEvent.click(button);

    expect(handleClick).toHaveBeenCalled();
  });
});
