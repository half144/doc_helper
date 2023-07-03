import { Component, inject } from '@angular/core';
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

  data = [
    {
      title: 'Card 322',
      developer: 'Rafael Vinicius Pinheiro de Souza',
      tester: 'Rafael Vinicius Pinheiro de Souza',
      status: 'Em desenvolvimento',
      sprint: 'Sprint 33',
    },
    {
      title: 'Card 322',
      developer: 'Rafael Vinicius Pinheiro de Souza',
      tester: 'Rafael Vinicius Pinheiro de Souza',
      status: 'Em desenvolvimento',
      sprint: 'Sprint 33',
    },
    {
      title: 'Card 322',
      developer: 'Rafael Vinicius Pinheiro de Souza',
      tester: 'Rafael Vinicius Pinheiro de Souza',
      status: 'Em desenvolvimento',
      sprint: 'Sprint 33',
    },
    {
      title: 'Card 322',
      developer: 'Rafael Vinicius Pinheiro de Souza',
      tester: 'Rafael Vinicius Pinheiro de Souza fdfafsa fskdskad isidoasidosa',
      status: 'Em desenvolvimento',
      sprint: 'Sprint 33',
    },
    {
      title: 'Card 322',
      developer: 'Rafael Vinicius Pinheiro de Souza',
      tester: 'Rafael Vinicius Pinheiro de Souza',
      status: 'Em desenvolvimento',
      sprint: 'Sprint 33',
    },
    {
      title: 'Card 322',
      developer: 'Rafael Vinicius Pinheiro de Souza',
      tester: 'Rafael Vinicius Pinheiro de Souza fdfafsa fskdskad isidoasidosa',
      status: 'Em desenvolvimento',
      sprint: 'Sprint 33',
    },
    {
      title: 'Card 322',
      developer: 'Rafael Vinicius Pinheiro de Souza',
      tester: 'Rafael Vinicius Pinheiro de Souza',
      status: 'Em desenvolvimento',
      sprint: 'Sprint 33',
    },
    {
      title: 'Card 322',
      developer: 'Rafael Vinicius Pinheiro de Souza',
      tester: 'Rafael Vinicius Pinheiro de Souza fdfafsa fskdskad isidoasidosa',
      status: 'Em desenvolvimento',
      sprint: 'Sprint 33',
    },
    {
      title: 'Card 322',
      developer: 'Rafael Vinicius Pinheiro de Souza',
      tester: 'Rafael Vinicius Pinheiro de Souza',
      status: 'Em desenvolvimento',
      sprint: 'Sprint 33',
    },
    {
      title: 'Card 322',
      developer: 'Rafael Vinicius Pinheiro de Souza',
      tester: 'Rafael Vinicius Pinheiro de Souza fdfafsa fskdskad isidoasidosa',
      status: 'Em desenvolvimento',
      sprint: 'Sprint 33',
    },
    {
      title: 'Card 322',
      developer: 'Rafael Vinicius Pinheiro de Souza',
      tester: 'Rafael Vinicius Pinheiro de Souza',
      status: 'Em desenvolvimento',
      sprint: 'Sprint 33',
    },
    {
      title: 'Card 322',
      developer: 'Rafael Vinicius Pinheiro de Souza',
      tester: 'Rafael Vinicius Pinheiro de Souza fdfafsa fskdskad isidoasidosa',
      status: 'Em desenvolvimento',
      sprint: 'Sprint 33',
    },
    {
      title: 'Card 322',
      developer: 'Rafael Vinicius Pinheiro de Souza',
      tester: 'Rafael Vinicius Pinheiro de Souza',
      status: 'Em desenvolvimento',
      sprint: 'Sprint 33',
    },
  ];
}
