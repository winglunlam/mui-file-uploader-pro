import { ThemeOptions } from '@mui/material/styles';

export const createUploaderTheme = (options: ThemeOptions = {}): ThemeOptions => {
  return {
    ...options,
  };
};

export const defaultUploaderTheme: ThemeOptions = {};
