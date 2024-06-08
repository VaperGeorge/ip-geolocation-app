import { Component, Input } from '@angular/core';
import { IpInfo } from '../../shared';

@Component({
  selector: 'app-user-location',
  standalone: true,
  templateUrl: './user-location.component.html',
  styleUrls: ['./user-location.component.scss'],
})
export class UserLocationComponent {
  @Input() location: IpInfo | null = null;
}
