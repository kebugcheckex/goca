export interface CertificateAuthorityResponse {
  certificates: Array<string>;
  common_name: string;
  csr: boolean;
  dns_names: Array<string>;
  issue_date: string;
  expire_date: string;
  // files: define this later
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
