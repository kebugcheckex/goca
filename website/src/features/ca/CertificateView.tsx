import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
// import { CertificateResponse } from './api';
import { selectCurrentCertificate } from './caSlice';
// import Grid from '@mui/material/Unstable_Grid2';

function CertificateView() {
  const certificate = useAppSelector(selectCurrentCertificate);
  // const dispatch = useAppDispatch();
  if (certificate == null) {
    return <div>No certificate selected</div>;
  }
  return (
    <Box>
      <ul>
        <li>Common Name: {certificate.commonName}</li>
        <li>Issue Date: {certificate.issueDate.toLocaleString()}</li>
        <li>Expire Date: {certificate.expireDate.toDateString()}</li>
      </ul>
    </Box>
  );
}

export default CertificateView;
