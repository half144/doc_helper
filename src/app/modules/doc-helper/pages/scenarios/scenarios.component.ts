import { Component, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  filter,
  map,
  startWith,
  tap,
} from 'rxjs';
import { ScenariosService } from 'src/app/core/services/scenarios/scenarios.service';

@Component({
  selector: 'app-scenarios',
  templateUrl: './scenarios.component.html',
  styleUrls: ['./scenarios.component.css'],
})
export class ScenariosComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  modal = inject(NzModalService);
  scenariosService = inject(ScenariosService);

  scenarioFilterForm = this.formBuilder.group({
    cardNumber: [''],
    sprint: [''],
    cardHolder: [''],
    cardReviwer: [''],
  });

  private scenariosBruteData$ = new BehaviorSubject<any[] | null>(null);
  private filtredScenario$ = combineLatest([
    this.scenariosBruteData$,
    this.scenarioFilterForm.valueChanges.pipe(
      startWith(this.scenarioFilterForm.value),
      distinctUntilChanged()
    ),
  ]).pipe(
    filter(([scenarios]) => !!scenarios),
    map(([scenarios, formValue]) => this.filterScenarios(scenarios!, formValue))
  );
  scenarios = toSignal(this.filtredScenario$);

  ngOnInit(): void {
    this.scenariosService
      .getAllScenarios()
      .pipe(
        map((scenarios) => this.mapScenarioToRender(scenarios)),
        tap((mappedScenarios) => this.scenariosBruteData$.next(mappedScenarios))
      )
      .subscribe();
  }

  deleteScenario(scenarioId: any) {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this scenario?',
      nzContent: '<b class="text-red-500">This action is irreversible</b>',
      nzOkText: 'Yes',
      nzOkDanger: true,
      nzOnOk: () => {
        if (!this.scenariosBruteData$.value) return;
        this.scenariosBruteData$.next(
          this.scenariosBruteData$.value.filter(
            (scenario: any) => scenario._id !== scenarioId
          )
        );
        this.scenariosService.deleteScenario(scenarioId).subscribe();
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }

  private mapScenarioToRender(scenarios: any[]) {
    return scenarios.map((scenario: any) => ({
      ...scenario,
      cardTitle: `Card ${scenario.cardNumber} - Sprint ${scenario.sprint}`,
    }));
  }

  private filterScenarios(scenarios: any[], formValue: any) {
    return scenarios?.filter((scenario: any) => {
      const cardNumber = scenario.cardNumber
        ? scenario.cardNumber.toLowerCase()
        : '';
      const sprint = scenario.sprint ? scenario.sprint.toLowerCase() : '';
      const cardHolder = scenario.cardHolder
        ? scenario.cardHolder.toLowerCase()
        : '';
      const cardReviwer = scenario.cardReviwer
        ? scenario.cardReviwer.toLowerCase()
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
      const filterCardReviwer = formValue.cardReviwer
        ? formValue.cardReviwer.toLowerCase()
        : '';

      return (
        cardNumber.includes(filterCardNumber) &&
        sprint.includes(filterSprint) &&
        cardHolder.includes(filterCardHolder) &&
        cardReviwer.includes(filterCardReviwer)
      );
    });
  }
}
