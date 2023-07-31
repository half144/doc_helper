import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { ScenariosService } from 'src/app/core/services/scenarios/scenarios.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {
  private route = inject(ActivatedRoute);
  private scenariosService = inject(ScenariosService);

  scenarioId = this.route.snapshot.paramMap.get('id');
  scenario$ = this.scenariosService.getScenarioById(this.scenarioId!);

  scenario = toSignal(this.scenario$);
}
