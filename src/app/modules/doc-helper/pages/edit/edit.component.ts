import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { ScenariosService } from 'src/app/core/services/scenarios/scenarios.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {
  activatedRoute = inject(ActivatedRoute);
  scenariosService = inject(ScenariosService);

  scenario$ = this.activatedRoute.params.pipe(
    switchMap((params) => {
      return this.scenariosService.getScenarioById(params['id']);
    }),
    tap((scenario) => {
      console.log(scenario);
    })
  );
}
