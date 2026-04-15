import { withThemeByDataAttribute } from '@storybook/addon-themes';

import type { Preview } from '@storybook/react-vite';
import { RouterContextProvider } from '@tanstack/react-router';
import { getRouter } from '../src/router';

import { ThemeProvider } from '../src/common/components/utils';
import { withLocale } from './decorators';

import '../src/styles.css';

const router = getRouter();

const preview: Preview = {
  globalTypes: {
    locale: {
      description: 'i18n locale',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'ko', title: '한국어' },
          { value: 'en', title: 'English' },
        ],
        dynamicTitle: true,
      },
    },
    accent: {
      description: 'Accent color',
      toolbar: {
        icon: 'paintbrush',
        items: ThemeProvider.accents.map((value) => ({
          value,
          title: value.charAt(0).toUpperCase() + value.slice(1),
        })),
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    locale: 'ko',
    accent: 'blue',
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
    (Story, { globals }) => (
      <ThemeProvider accent={globals.accent ?? 'blue'}>
        <Story />
      </ThemeProvider>
    ),
    withLocale,
    (Story) => (
      <RouterContextProvider router={router}>
        <Story />
      </RouterContextProvider>
    ),
  ],
};

export default preview;
