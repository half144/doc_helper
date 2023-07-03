import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ScenariosService } from 'src/app/core/services/scenarios/scenarios.service';

@Component({
  selector: 'app-scenarios',
  templateUrl: './scenarios.component.html',
  styleUrls: ['./scenarios.component.css'],
})
export class ScenariosComponent {
  scenariosService = inject(ScenariosService);

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

  scenarios = toSignal(this.scenarios$);
}