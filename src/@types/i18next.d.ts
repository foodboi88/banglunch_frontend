/* eslint-disable @typescript-eslint/no-empty-interface */
import 'react-i18next';
import { resources } from 'i18n/i18next-config';

declare module 'react-i18next' {
  type DefaultResources = typeof resources['en'];
  interface Resources extends DefaultResources {}
}