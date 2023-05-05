import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
// import { CertificateResponse } from './api';
import { selectCurrentCertificate } from './slice';
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
        <li>Common Name: {certificate.common_name}</li>
        <li>Issue Date: {certificate.issue_date}</li>
        <li>Expire Date: {certificate.expire_date}</li>
      </ul>
    </Box>
  );
}

export default CertificateView;
