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
  isCA: boolean;
  isIntermediateCA: boolean;
};

export type Identity = {
  country: string;
  province: string;
  locality: string;
  organization: string;
  organizationUnit: string;
  email: string;
  validFor: number;
  keyBitSize: number;
  DnsNames: Array<string>;
};
