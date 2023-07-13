import { Component, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, map, switchMap, tap } from 'rxjs';
import { ProjectsService } from 'src/app/core/services/projects/projects.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent {
  projectsService = inject(ProjectsService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  inviteLink = signal<string | null>(null);

  project$: Observable<any> = this.activatedRoute.params.pipe(
    switchMap(({ id }) => this.projectsService.getProjectData(id))
  );

  cards$ = this.project$.pipe(map((project) => project?.cards));
}
