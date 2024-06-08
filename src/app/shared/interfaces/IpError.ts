export interface IpError {
  success: boolean;
  error: {
    code: number;
    type: string;
    info: string;
  };
}
