export interface IpLayer {
  results: [
    {
      ipAddress: string;
    }
  ];
  processResponseTime: string;
  domain: string;
  requestType: string;
  warnings: [];
}
