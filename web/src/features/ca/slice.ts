import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  gocaAPI,
  CertificateAuthorityResponse,
  CertificateResponse,
} from './api';

export type Identity = {
  country: string;
  province: string;
  locality: string;
  organization: string;
  organizationUnit: string;
  email: string;
  validFor: number;
  keyBitSize: number;
  dnsNames: Array<string>;
  isIntermediate: boolean;
};

export type Certificate = {
  commonName: string;
  dnsNames: Array<string>;
  issueDate: Date;
  expireDate: Date;
  serialNumber: string;
  certificate: string;
  publicKey: string;
  privateKey: string | null; // in certain cases, private key is not returned
  caCertificate: string;
  csr: string;
  isCa: boolean;
  isIntermediateCa: boolean;
};

export interface CaTreeNode {
  name: string;
  children: Array<CaTreeNode>;
}

export interface CaState {
  rootCaNames: string[];
  certificates: Map<string, Certificate>;
  selectedCertificateName: string | null;
}

const initialState: CaState = {
  rootCaNames: [],
  certificates: new Map<string, Certificate>(),
  selectedCertificateName: null,
};

async function fetchCertificates(commonName: string) {
  const { data } = await gocaAPI<{ data: CertificateAuthorityResponse }>(
    `api/v1/ca/${commonName}`
  );
  // TODO: a lot to fix
}

export const fetchAllCa = createAsyncThunk('ca/fetchAllCa', async () => {
  const { data } = await gocaAPI<{ data: Array<string> }>('api/v1/ca');
});

export const fetchRootCaList = createAsyncThunk(
  'ca/fetchRootCaList',
  async () => {
    const response = await gocaAPI<{ data: Array<string> }>('api/v1/ca');
    return response.data;
  }
);

export const fetchCa = createAsyncThunk(
  'ca/fetchCa',
  async (caName: string) => {
    const response = await gocaAPI<{ data: CertificateAuthorityResponse }>(
      `api/v1/ca/${caName}`
    );
    return response.data;
  }
);

export interface FetchCertificateRequest {
  caName: string;
  certificateName: string;
}
export const fetchCertificate = createAsyncThunk(
  'ca/fetchCertificate',
  async (request: FetchCertificateRequest) => {
    const { caName, certificateName } = request;
    const response = await gocaAPI<{ data: CertificateResponse }>(
      `api/v1/ca/${caName}/certificates/${certificateName}`
    );
    return response.data;
  }
);

export const caSlice = createSlice({
  name: 'ca',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRootCaList.fulfilled, (state, action) => {
      state.rootCaNames = action.payload;
    });
    builder.addCase(fetchCa.fulfilled, (state, action) => {
      updateCaTree(state, action.payload);
    });
  },
});

export const selectRootCaNames = (state: RootState) => state.ca.rootCaNames;
export const selectCurrentCertificate = (state: RootState) =>
  state.ca.selectedCertificateName;

export default caSlice.reducer;
