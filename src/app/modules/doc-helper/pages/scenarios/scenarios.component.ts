import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import {
  BehaviorSubject,
  combineLatest,
  delay,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { ScenariosService } from 'src/app/core/services/scenarios/scenarios.service';

@Component({
  selector: 'app-scenarios',
  templateUrl: './scenarios.component.html',
  styleUrls: ['./scenarios.component.css'],
})
export class ScenariosComponent {
  scenariosService = inject(ScenariosService);
  formBuilder = inject(FormBuilder);
  modal = inject(NzModalService);

  scenarioFilterForm = this.formBuilder.group({
    cardNumber: [''],
    sprint: [''],
    cardHolder: [''],
    cardReviewer: [''],
  });

  scenariosCached$ = new BehaviorSubject([] as any[]);
  scenarios$ = this.scenariosService
    .getAllScenarios()
    .pipe(
      map((scenarios) => {
        return scenarios.map((scenario: any) => {
          return {
            ...scenario,
            cardTitle: `Card ${scenario.cardNumber} - Sprint ${scenario.sprint}`,
          };
        });
      }),
      tap((scenarios) => {
        this.scenariosCached$.next(scenarios);
      })
    )
    .subscribe();

  filtredScenario$ = combineLatest([
    this.scenariosCached$,
    this.scenarioFilterForm.valueChanges.pipe(
      startWith(this.scenarioFilterForm.value),
      distinctUntilChanged()
    ),
  ]).pipe(
    map(([scenarios, formValue]) => {
      return scenarios.filter((scenario: any) => {
        const cardNumber = scenario.cardNumber
          ? scenario.cardNumber.toLowerCase()
          : '';
        const sprint = scenario.sprint ? scenario.sprint.toLowerCase() : '';
        const cardHolder = scenario.cardHolder
          ? scenario.cardHolder.toLowerCase()
          : '';
        const cardReviewer = scenario.cardReviewer
          ? scenario.cardReviewer.toLowerCase()
          : '';

        const filterCardNumber = formValue.cardNumber
          ? formValue.cardNumber.toLowerCase()
          : '';
        const filterSprint = formValue.sprint
          ? formValue.sprint.toLowerCase()
          : '';
        const filterCardHolder = formValue.cardHolder
          ? formValue.cardHolder.toLowerCase()
          : '';
        const filterCardReviewer = formValue.cardReviewer
          ? formValue.cardReviewer.toLowerCase()
          : '';

        return (
          cardNumber.includes(filterCardNumber) &&
          sprint.includes(filterSprint) &&
          cardHolder.includes(filterCardHolder) &&
          cardReviewer.includes(filterCardReviewer)
        );
      });
    })
  );

  scenarios = toSignal(this.filtredScenario$);

  deleteScenario(scenarioId: any) {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this scenario?',
      nzContent: '<b class="text-red-500">This action is irreversible</b>',
      nzOkText: 'Yes',
      nzOkDanger: true,
      nzOnOk: () => {
        this.scenariosCached$.next(
          this.scenariosCached$.value.filter(
            (scenario: any) => scenario.id !== scenarioId
          )
        );
        this.scenariosService.deleteScenario(scenarioId).subscribe();
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }
}
