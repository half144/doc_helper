import { switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, computed, inject } from '@angular/core';
import { ProjectsService } from 'src/app/core/services/projects/projects.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-config-page',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
})
export class ConfigComponent {
  projectsService = inject(ProjectsService);
  route = inject(ActivatedRoute);

  project$ = this.route.params.pipe(
    switchMap((params) => this.projectsService.getProjectData(params['id']))
  );

  project = toSignal(this.project$);
}
