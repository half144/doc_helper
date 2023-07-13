import { Component, Input, OnInit, Signal, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormBuilder } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import {
  Observable,
  Subject,
  combineLatest,
  distinctUntilChanged,
  map,
  of,
  startWith,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-scenarios',
  templateUrl: './scenarios.component.html',
  styleUrls: ['./scenarios.component.css'],
})
export class ScenariosComponent implements OnInit {
  @Input() scenarios$!: Observable<any>;

  formBuilder = inject(FormBuilder);
  modal = inject(NzModalService);

  filtredScenarios$!: Observable<any>;
  scenarioFilterForm = this.formBuilder.group({
    cardNumber: [''],
    sprint: [''],
    cardHolder: [''],
    cardReviwer: [''],
  });

  ngOnInit(): void {
    this.filtredScenarios$ = combineLatest([
      this.scenarios$,
      this.scenarioFilterForm.valueChanges.pipe(
        startWith(this.scenarioFilterForm.value),
        distinctUntilChanged()
      ),
    ]).pipe(
      tap(() => console.log('scenarios$')),
      map(([scenarios, formValue]: [scenarios: any, formValue: any]) =>
        this.filterScenarios(scenarios!, formValue)
      ),
      map((scenarios) => this.mapScenarios(scenarios))
    );
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

  private mapScenarios(scenarios: any[]) {
    return scenarios.map((scenario) => ({
      ...scenario,
      cardTitle: `Card ${scenario.cardNumber} - Sprint ${scenario.sprint}`,
    }));
  }
}
