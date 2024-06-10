import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IpStackService } from '../../shared';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-all-searches',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './all-searches.component.html',
  styleUrls: ['./all-searches.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllSearchesComponent {
  private readonly ipStackService = inject(IpStackService);

  ipHistory$ = this.ipStackService.getIpsHistory();
}
