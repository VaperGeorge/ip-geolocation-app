import { IpLocation } from './IpLocation';

export interface IpInfo {
  ip: string;
  type: string;
  continent_code: string;
  continent_name: string;
  country_code: string;
  country_name: string;
  region_code: string;
  region_name: string;
  city: string;
  zip: string;
  latitude: number;
  longitude: number;
  location: IpLocation;
  time_zone?: {
    id: string;
    current_time: string;
    gmt_offset: number;
    code: string;
    is_daylight_saving: boolean;
  };
  currency: {
    code: string;
    name: string;
    plural: string;
    symbol: string;
    symbol_native: string;
  };
  connection?: {
    asn: number;
    isp: string;
  };
}
