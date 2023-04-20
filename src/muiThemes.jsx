import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#6a8f8b',
      darker: '#516866',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

export default theme;