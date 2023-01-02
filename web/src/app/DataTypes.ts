export type Certificate = {
  commonName: string,
  dnsNames: Array<string>,
  issueDate: Date,
  expireDate: Date,
  serialNumber: string,
  certificate: string,
  publicKey: string,
  privateKey: string|null,  // in certain cases, private key is not returned
  caCertificate: string,
  csr: string,
}

export type CertificateAuthority = {
  commonName: string,
  dnsNames: Array<string>,
  issueDate: Date,
  expireDate: Date,
  serialNumber: string,
  intermediate: boolean,
  publicKey: string,
  privateKey: string|null,  // in certain cases, private key is not returned
  certificates: Array<string>, // TODO on the frontend, it may be better to store the Certificate object instead
  revokedCertificates: Array<string>,
}
