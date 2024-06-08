import {
  Component,
  DestroyRef,
  EventEmitter,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EMPTY, catchError, debounceTime, filter, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';

import { IpInfo, IpStackService } from '../../shared';

/** Checking for correct URL or IP address */
const REGEX =
  /^(?:http[s]?:\/\/(?:[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))$/;

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly ipStackService = inject(IpStackService);
  private readonly toastr = inject(ToastrService);
  private readonly destroyRef = inject(DestroyRef);

  @Output() searchChanged = new EventEmitter<IpInfo>();

  searchForm = this.fb.group({
    search: this.fb.control('', Validators.pattern(REGEX)),
  });

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(
        debounceTime(700),
        filter(() => !this.search.hasError('pattern')),
        switchMap((ipOrUrl) =>
          this.ipStackService.getGeoLocation(ipOrUrl as string)
        ),
        catchError((error) => {
          this.toastr.error(error);
          return EMPTY;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((result) => {
        const { latitude, longitude } = result as IpInfo;
        if (latitude && longitude) {
          this.ipStackService.setNewIpToHistory(this.search.value as string);
          this.searchChanged.emit(result as IpInfo);
        }
      });
  }

  get search() {
    return this.searchForm.controls.search;
  }
}
