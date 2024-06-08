import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { IpResponse } from '../types/IpResponse';
import { IpLayer } from '../interfaces';
import {
  GEO_BASE_URL,
  GEO_API_KEY,
  API_API_KEY,
  API_BASE_URL,
} from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class IpStackService {
  private http = inject(HttpClient);

  private searchHistory$ = new BehaviorSubject<string[]>([]);

  getGeoLocation(ipOrUrl: string) {
    const url = `${GEO_BASE_URL}${ipOrUrl}?access_key=${GEO_API_KEY}`;
    return this.http.get<IpResponse>(url);
  }

  getIpAddress(domain: string) {
    const convertedValue = domain.replace('https://', '');
    const headers = new HttpHeaders().set('apikey', API_API_KEY);

    return this.http.get<IpLayer>(`${API_BASE_URL}${convertedValue}`, {
      headers,
    });
  }

  setNewIpToHistory(data: string) {
    const history = [...this.searchHistory$.value, ...[data]];
    this.searchHistory$.next(history);
  }

  getIpsHistory() {
    return this.searchHistory$.asObservable();
  }
}
