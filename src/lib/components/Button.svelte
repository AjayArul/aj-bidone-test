<script lang="ts">
  import type { ButtonVariant } from '$lib/utils/types';
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let disabled = false;
  export let extraProps: Record<string, any> = {};
  export let variant: ButtonVariant = 'default';
  export let className = '';
</script>

<button
  {type}
  {disabled}
  on:click
  class={`cursor-pointer rounded-lg px-4 py-2 font-medium transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none
      ${
        variant === 'primary'
          ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
          : variant === 'secondary'
            ? 'bg-orange-500 text-white hover:bg-orange-300 focus:ring-orange-400'
            : variant === 'danger'
              ? 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
              : variant === 'success'
                ? 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
                : variant === 'warning'
                  ? 'bg-yellow-500 text-black hover:bg-yellow-600 focus:ring-yellow-400'
                  : variant === 'info'
                    ? 'bg-cyan-600 text-white hover:bg-cyan-700 focus:ring-cyan-500'
                    : variant === 'outline'
                      ? 'border border-gray-400 bg-transparent text-gray-800 hover:border-gray-100 focus:ring-gray-400'
                      : 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 focus:ring-gray-400'
      }
      ${disabled ? 'cursor-not-allowed opacity-50' : ''}
      ${className}
    `}
  {...$$restProps}
>
  <slot />
</button>
