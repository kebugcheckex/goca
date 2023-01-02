import React from 'react';
import {Certificate} from '../DataTypes';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import FolderIcon from '@mui/icons-material/Folder';
import ListItemText from '@mui/material/ListItemText';

type Props = {
  certificates: Array<Certificate>
}

function CertificateList(props: Props) {
  const listItems = props.certificates.map(certificate => {
    return (
      <ListItem>
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText
          primary="Single-line item"
          secondary="Secondary text"
        />
      </ListItem>
    )
  })
  return <List>{listItems}</List>;
}

export default CertificateList;
