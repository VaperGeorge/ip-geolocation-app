import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { IpResponse } from '../types/IpResponse';
import { BehaviorSubject } from 'rxjs';
import { IpInfo } from '../interfaces';

const API_KEY = '9f5f3cc80c160959d39844019eb545c6';
const BASE_URL = 'http://api.ipstack.com/';

@Injectable({
  providedIn: 'root',
})
export class IpStackService {
  private http = inject(HttpClient);

  private searchHistory$ = new BehaviorSubject<string[]>([]);

  getGeoLocation(ipOrUrl: string) {
    const url = `${BASE_URL}${ipOrUrl}?access_key=${API_KEY}`;
    return this.http.get<IpResponse>(url);
  }

  getIpAddress(domain: string) {
    return this.http.get(`https://dnslookupapi.com/api/v1/${domain}/A`);
  }

  setNewIpToHistory(data: string) {
    const history = [...this.searchHistory$.value, ...[data]];
    this.searchHistory$.next(history);
  }

  getIpsHistory() {
    return this.searchHistory$.asObservable();
  }
}
