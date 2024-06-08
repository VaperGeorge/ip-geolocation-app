import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AllSearchesComponent } from './components/all-searches/all-searches.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { MapLocationComponent } from './components/map-location/map-location.component';
import { UserLocationComponent } from './components/user-location/user-location.component';
import { ReplaySubject, map, pairwise } from 'rxjs';
import { IpInfo } from './shared';
import { AsyncPipe } from '@angular/common';

const components = [
  AllSearchesComponent,
  UserLocationComponent,
  MapLocationComponent,
  SearchBoxComponent,
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, ...components],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ip-geolocation-app';

  location$ = new ReplaySubject<IpInfo>(2);
  previousLocation$ = this.location$.pipe(
    pairwise(),
    map(([p, c]) => p)
  );
}
