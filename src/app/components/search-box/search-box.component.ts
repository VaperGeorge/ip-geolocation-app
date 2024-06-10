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
import {
  EMPTY,
  Observable,
  catchError,
  concatMap,
  debounceTime,
  filter,
  switchMap,
  tap,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';

import {
  IpInfo,
  IpStackService,
  REGEX,
  IP_PATTERN,
  IpResponse,
} from '../../shared';

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
  @Output() loading = new EventEmitter<boolean>(false);

  searchForm = this.fb.group({
    search: this.fb.control('', Validators.pattern(REGEX)),
  });

  ngOnInit(): void {
    const ipStream$ = this.getValueChangesStream();
    const urlStream$ = this.getValueChangesStream(false);

    ipStream$
      .pipe(
        switchMap((ipOrUrl) =>
          this.ipStackService.getGeoLocation(ipOrUrl as string)
        )
      )
      .subscribe(this.resultHandler.bind(this));

    urlStream$
      .pipe(
        switchMap((ipOrUrl) =>
          this.ipStackService.getIpAddress(ipOrUrl as string)
        ),
        concatMap((ipInfo) => {
          const ip = ipInfo.results[0].ipAddress;
          return this.ipStackService.getGeoLocation(ip);
        })
      )
      .subscribe(this.resultHandler.bind(this));
  }

  private getValueChangesStream(
    isIpValue: boolean = true
  ): Observable<string | null> {
    const checkIsIp = (v: string) =>
      isIpValue
        ? !!v?.match(IP_PATTERN)?.length
        : !!!v?.match(IP_PATTERN)?.length;

    return this.search.valueChanges.pipe(
      debounceTime(700),
      filter((v) => !this.search.hasError('pattern') && checkIsIp(v as string)),
      tap(() => this.loading.emit(true)),
      catchError((error) => {
        this.toastr.error(error);
        return EMPTY;
      }),
      takeUntilDestroyed(this.destroyRef)
    );
  }

  private resultHandler(result: IpResponse) {
    const { latitude, longitude } = result as IpInfo;
    if (latitude && longitude) {
      this.ipStackService.setNewIpToHistory(this.search.value as string);
      this.searchChanged.emit(result as IpInfo);
    }

    this.loading.emit(false);
  }

  get search() {
    return this.searchForm.controls.search;
  }
}
