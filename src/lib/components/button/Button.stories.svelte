<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Button from './Button.svelte';
  import { Plus } from 'svelte-heros';

  const variants = [
    'default',
    'primary',
    'secondary',
    'danger',
    'success',
    'warning',
    'info',
    'outline',
  ];

  const { Story } = defineMeta({
    title: 'AJUI/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
      variant: {
        control: 'select',
        options: variants,
        description: 'Defines the button variant style.',
      },
    },
  });
</script>

<Story name="Default" args={{ variant: 'default' }}>Default</Story>
<Story name="Primary" args={{ variant: 'primary' }}>primary</Story>
<Story name="Secondary" args={{ variant: 'secondary' }}>secondary</Story>
<Story name="Danger" args={{ variant: 'danger' }}>Danger</Story>
<Story name="Info" args={{ variant: 'info' }}>Info</Story>
<Story name="Outline" args={{ variant: 'outline' }}>Outline</Story>
<Story name="Success" args={{ variant: 'success' }}>Success</Story>
<Story name="Warning" args={{ variant: 'warning' }}>Warning</Story>
<Story name="With Icon" args={{ variant: 'primary' }}>
  <Plus class="h-5 w-5" /> Add Article
</Story>
