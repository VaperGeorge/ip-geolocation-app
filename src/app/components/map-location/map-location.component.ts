import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AngularOpenlayersModule } from 'ng-openlayers';

@Component({
  selector: 'app-map-location',
  standalone: true,
  imports: [AngularOpenlayersModule],
  templateUrl: './map-location.component.html',
  styleUrls: ['./map-location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapLocationComponent {
  @Input() latitude!: number;

  @Input() longitude!: number;

  @Input() isForHistory = false;
}
