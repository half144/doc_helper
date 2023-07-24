import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ScenariosService } from 'src/app/core/services/scenarios/scenarios.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {
  activatedRoute = inject(ActivatedRoute);
  scenariosService = inject(ScenariosService);

  scenario$ = this.activatedRoute.params.pipe(
    switchMap((params) => this.scenariosService.getScenarioById(params['id']))
  );

  scenario = toSignal(this.scenario$);
}
