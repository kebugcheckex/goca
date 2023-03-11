import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import './App.css';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import CertificateAuthorityTreeView from './features/ca/CertificateAuthorityTreeView';
import CreateCaDialog from './features/ca/CreateCaDialog';

function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Go Certificate Authority
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 2,
          width: 800,
        }}
      >
        <CertificateAuthorityTreeView />
        <CreateCaDialog />
      </Box>
    </Box>
  );
}

export default App;
