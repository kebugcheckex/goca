import Grid from '@mui/material/Unstable_Grid2';
import CertificateAuthorityTreeView from './CertificateAuthorityTreeView';
import CertificateView from './CertificateView';
import CreateCaDialog from './CreateCaDialog';
import Box from '@mui/material/Box';

export default function CertificateAuthorityView() {
  return (
    <Box>
      <CreateCaDialog />
      <Grid container spacing={2}>
        <Grid xs={6}>
          <CertificateAuthorityTreeView />
        </Grid>
        <Grid xs={6}>
          <CertificateView />
        </Grid>
      </Grid>
    </Box>
  );
}
