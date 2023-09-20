import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import {
  CaTreeNode,
  fetchCa,
  fetchRootCas,
  selectRootCertificateNodes,
} from './caSlice';

function CertificateAuthorityTreeView() {
  const rootCaNodes = useAppSelector(selectRootCertificateNodes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRootCas());
  }, [dispatch]);

  // const renderTree = (treeNode: CaTreeNode) => (
  //   <TreeItem key={treeNode.commonName} nodeId={treeNode.commonName} label={treeNode.commonName}>
  //     {treeNode.childCommonNames.map(childCommonName => renderTree(childCommonName))}
  //   </TreeItem>
  // );

  // const onNodeSelect = (_: React.SyntheticEvent, value: string) => {
  //   dispatch(fetchCa(value));
  // };

  return (
    <Box>
      Test
      {/* <TreeView
        aria-label="Certificate Authorities"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 400, flexGrow: 1 }}
        onNodeSelect={onNodeSelect}
      >
        {Object.keys(certi)
          .filter((node) => node.parentName == null)
          .map((node) => renderTreeNode(node))}
      </TreeView> */}
    </Box>
  );
}

export default CertificateAuthorityTreeView;
