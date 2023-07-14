import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { ProjectsService } from 'src/app/core/services/projects/projects.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent {
  projectsService = inject(ProjectsService);
  route = inject(ActivatedRoute);

  project$ = this.route.params.pipe(
    switchMap((params) => this.projectsService.getProjectData(params['id']))
  );
  cards$ = this.project$.pipe(map((project) => project?.cards));
}
