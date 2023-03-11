import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  CATreeNode,
  fetchCA,
  fetchRootCAList,
  ROOT_NODE_NAME,
  selectCATree,
} from './slice';
import { useEffect } from 'react';

function CertificateAuthorityTreeView() {
  const caTree = useAppSelector(selectCATree);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRootCAList());
  }, [dispatch]);

  const renderTree = (node: CATreeNode) => (
    <TreeItem key={node.name} nodeId={node.name} label={node.name}>
      {Array.isArray(node.children)
        ? node.children.map((treeNode) => renderTree(treeNode))
        : null}
    </TreeItem>
  );

  const onNodeSelect = (_: React.SyntheticEvent, value: string) => {
    if (value === ROOT_NODE_NAME) {
      return;
    }
    dispatch(fetchCA(value));
  };

  return (
    <TreeView
      aria-label="Certificate Authorities"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
      onNodeSelect={onNodeSelect}
    >
      {renderTree(caTree)}
    </TreeView>
  );
}

export default CertificateAuthorityTreeView;
