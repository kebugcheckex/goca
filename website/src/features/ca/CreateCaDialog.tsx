import { useState } from 'react';
import Button from '@mui/material/Button';
import { css } from '@emotion/css';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useImmer } from 'use-immer';

type Props = {};

function CreateCaDialog(_props: Props) {
  const [isShown, setIsShown] = useState(false);
  const [caData, setCaData] = useImmer({
    commonName: '',
    country: '',
    province: '',
    locality: '',
    organization: '',
    organizationUnit: '',
    email: '',
    validFor: 0,
    keyBitSize: 2048,
    dnsNames: [],
    isIntermediate: false,
  });

  const onCloseButtonClick = () => setIsShown(false);
  const onCreateCaButtonClick = () => setIsShown(true);

  // TODO figure out a better way to handle text fields changes
  // Looks like draft object cannot use [] to dynamically index fields
  const onCommonNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setCaData((draft) => {
      draft.commonName = event.target.value;
    });

  const onIsIntermediateChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setCaData((draft) => {
      draft.isIntermediate = event.target.checked;
    });

  const onCountryChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setCaData((draft) => {
      draft.country = event.target.value;
    });

  const onProvinceChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setCaData((draft) => {
      draft.province = event.target.value;
    });

  const onLocalityChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setCaData((draft) => {
      draft.locality = event.target.value;
    });

  const onOrganizationChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setCaData((draft) => {
      draft.organization = event.target.value;
    });

  const onOrganizationUnitChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) =>
    setCaData((draft) => {
      draft.organizationUnit = event.target.value;
    });

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setCaData((draft) => {
      draft.email = event.target.value;
    });

  const onValidForChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setCaData((draft) => {
      // TODO handle NaN
      draft.validFor = parseInt(event.target.value);
    });

  const onCreateButtonClick = () => {
    console.log(caData);
  };

  return (
    <>
      <Dialog onClose={onCloseButtonClick} open={isShown}>
        <DialogTitle>Create a new CA</DialogTitle>
        <Box sx={{ width: 400, height: 800, padding: 2 }}>
          <FormGroup>
            <TextField
              id="ca-common-name"
              margin="dense"
              label="Common Name"
              value={caData.commonName}
              onChange={onCommonNameChange}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={caData.isIntermediate}
                  onChange={onIsIntermediateChange}
                />
              }
              label="Is intermediate CA?"
            />
            <TextField
              label="Country"
              margin="dense"
              value={caData.country}
              onChange={onCountryChange}
            />
            <TextField
              label="Province"
              margin="dense"
              value={caData.province}
              onChange={onProvinceChange}
            />
            <TextField
              label="Locality"
              margin="dense"
              value={caData.locality}
              onChange={onLocalityChange}
            />
            <TextField
              label="Organization"
              margin="dense"
              value={caData.organization}
              onChange={onOrganizationChange}
            />
            <TextField
              label="Organization Unit"
              margin="dense"
              value={caData.organizationUnit}
              onChange={onOrganizationUnitChange}
            />
            <TextField
              label="Email"
              margin="dense"
              value={caData.email}
              onChange={onEmailChange}
            />
            <TextField
              label="Valid for (days)"
              margin="dense"
              value={caData.validFor.toString()}
              onChange={onValidForChange}
            />
          </FormGroup>
          <Button variant="outlined">Cancel</Button>
          <Button variant="contained" onClick={onCreateButtonClick}>
            Create
          </Button>
        </Box>
      </Dialog>
      <Button
        sx={{ marginBottom: 2 }}
        variant="contained"
        onClick={onCreateCaButtonClick}
      >
        Create CA
      </Button>
    </>
  );
}

export default CreateCaDialog;
