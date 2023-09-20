import { serialize } from 'v8';
import { Certificate } from './caSlice';

export interface CertificateAuthorityResponse {
  certificates: Array<string>;
  common_name: string;
  csr: boolean;
  dns_names: Array<string>;
  issue_date: string;
  expire_date: string;
  files: {
    ca_certificate: string;
    certificate: string;
    csr: string;
    private_key: string;
    public_key: string;
  };
  intermediate: boolean;
  revoked_certificates: Array<string>;
  serial_number: string;
  status: string; // TODO might change this to an enum or no use this at all
}

export interface CertificateResponse {
  common_name: string;
  dns_names: Array<string>;
  expire_date: string; // better convert to a int timestamp
  issue_date: string;
  files: {
    ca_certificate: string;
    certificate: string;
    csr: string;
    private_key: string;
    public_key: string;
  };
  serial_number: string;
}

export function gocaAPI<T>(path: string): Promise<T> {
  return fetch(path)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to fetch ${path}, status ${response.statusText}`
        );
      }
      return response.json() as Promise<T>;
    })
    .catch((error) => {
      throw error; // TODO more error handling
    });
}

export function convertCaResponseToCertificate(
  response: CertificateAuthorityResponse
): Certificate {
  const {
    common_name,
    dns_names,
    issue_date,
    expire_date,
    intermediate,
    files,
    serial_number,
  } = response;
  return {
    commonName: common_name,
    dnsNames: dns_names,
    issueDate: new Date(issue_date),
    expireDate: new Date(expire_date),
    serialNumber: serial_number,
    certificate: files.certificate,
    publicKey: files.public_key,
    privateKey: files.private_key,
    caCertificate: files.ca_certificate,
    csr: files.csr,
    isCa: true,
    isIntermediateCa: intermediate,
  };
}

export function convertCertificateResponseToCertificate(
  response: CertificateResponse
): Certificate {
  const {
    common_name,
    dns_names,
    expire_date,
    issue_date,
    serial_number,
    files,
  } = response;
  return {
    commonName: common_name,
    dnsNames: dns_names,
    issueDate: new Date(issue_date),
    expireDate: new Date(expire_date),
    serialNumber: serial_number,
    certificate: files.certificate,
    publicKey: files.public_key,
    privateKey: files.private_key,
    caCertificate: files.ca_certificate,
    csr: files.csr,
    isCa: false,
    isIntermediateCa: false,
  };
}
