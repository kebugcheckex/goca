import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { gocaAPI, CertificateAuthorityResponse } from './api';

export const ROOT_NODE_NAME = 'Root CAs';

export interface CATreeNode {
  name: string;
  children: Array<CATreeNode>;
}

export interface CATreeState {
  caTreeRoot: CATreeNode;
}

const initialState: CATreeState = {
  caTreeRoot: { name: ROOT_NODE_NAME, children: [] },
};

export const fetchRootCAList = createAsyncThunk(
  'ca/fetchRootCAList',
  async () => {
    const response = await gocaAPI<{ data: Array<string> }>('api/v1/ca');
    return response.data;
  }
);

export const fetchCA = createAsyncThunk(
  'ca/createAsyncThunk',
  async (caName: string) => {
    const response = await gocaAPI<{ data: CertificateAuthorityResponse }>(
      `api/v1/ca/${caName}`
    );
    return response.data;
  }
);

function updateCATree(
  node: CATreeNode,
  response: CertificateAuthorityResponse
) {
  // TODO This logic is flawed. When the user clicks on a tree node, it is
  // reloaded. However, all its child nodes are lost, if they were loaded before
  const index = node.children.findIndex(
    (treeNode) => treeNode.name === response.common_name
  );
  if (index > -1) {
    node.children[index] = {
      name: response.common_name,
      children:
        response.certificates != null
          ? response.certificates.map((cert_name) => ({
              name: cert_name,
              children: [],
            }))
          : [],
    };
    return;
  }
  node.children.forEach((childNode) => updateCATree(childNode, response));
}

export const caSlice = createSlice({
  name: 'ca',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRootCAList.fulfilled, (state, action) => {
      state.caTreeRoot = {
        name: ROOT_NODE_NAME,
        children: action.payload.map((caName) => ({
          name: caName,
          children: [],
        })),
      };
    });
    builder.addCase(fetchCA.fulfilled, (state, action) => {
      updateCATree(state.caTreeRoot, action.payload);
      console.log(`after update`, state.caTreeRoot);
    });
  },
});

export const selectCATree = (state: RootState) => state.ca.caTreeRoot;

export default caSlice.reducer;
