import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder } from '@angular/forms';
import {
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

  scenarioFilterForm = this.formBuilder.group({
    cardNumber: [''],
    sprint: [''],
    cardHolder: [''],
    cardReviewer: [''],
  });

  scenarios$ = this.scenariosService.getAllScenarios().pipe(
    map((scenarios) => {
      return scenarios.map((scenario: any) => {
        return {
          ...scenario,
          cardTitle: `Card ${scenario.cardNumber} - Sprint ${scenario.sprint}`,
        };
      });
    })
  );

  filteredScenarios$ = this.scenarioFilterForm.valueChanges.pipe(
    startWith(this.scenarioFilterForm.value),
    distinctUntilChanged(),
    switchMap((formValue) => {
      return this.scenarios$.pipe(
        map((scenarios) => {
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
    })
  );

  scenarios = toSignal(this.filteredScenarios$);
}
