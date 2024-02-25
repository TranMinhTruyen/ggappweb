export interface LoginRequest {
  account: string;
  password: string;
  deviceInfo: {
    deviceOperationSystem: string;
    deviceName: string;
    deviceMac: string;
    deviceIp: string;
  };
  remember: boolean;
}
