export interface IpLocation {
  geoname_id: number;
  capital: string;
  languages: Array<{
    code: string;
    name: string;
    native: string;
  }>;
  country_flag: string;
  country_flag_emoji: string;
  country_flag_emoji_unicode: string;
  calling_code: string;
  is_eu: boolean;
}
