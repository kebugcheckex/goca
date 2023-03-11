import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

type Props = {};

function CreateCaDialog(_props: Props) {
  const [isShown, setIsShown] = useState(false);

  const onCloseButtonClick = () => setIsShown(false);
  const onCreateCaButtonClick = () => setIsShown(true);
  return (
    <>
      <Dialog onClose={onCloseButtonClick} open={isShown}>
        <DialogTitle>Create a new CA</DialogTitle>
        <Box sx={{ width: 400, height: 600, padding: 2 }}>
          <FormGroup>
            <TextField id="ca-common-name" label="Common Name" />
            <FormControlLabel
              control={<Checkbox />}
              label="Is intermediate CA?"
            />
            <TextField label="Country" />
            <TextField label="Province" />
            <TextField label="Locality" />
            <TextField label="Organization" />
            <TextField label="Organization Unit" />
            <TextField label="Email" />
            <TextField label="Valid for (days)" />
            <Button variant="outlined">Cancel</Button>
            <Button variant="contained">Create</Button>
          </FormGroup>
        </Box>
      </Dialog>
      <Button variant="contained" onClick={onCreateCaButtonClick}>
        Create CA
      </Button>
    </>
  );
}

export default CreateCaDialog;
