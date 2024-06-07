import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { IpInfo } from '../interfaces/IpInfo';

const API_KEY = 'YOUR_API_KEY';
const BASE_URL = 'http://api.ipstack.com/';

@Injectable({
  providedIn: 'root',
})
export class IpStackService {
  private http = inject(HttpClient);

  getGeoLocation(ipOrUrl: string) {
    const url = `${BASE_URL}${ipOrUrl}?access_key=${API_KEY}`;
    return this.http.get<IpInfo>(url);
  }
}
