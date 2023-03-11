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
