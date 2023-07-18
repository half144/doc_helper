import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, switchMap, tap } from 'rxjs';
import { ProjectsService } from 'src/app/core/services/projects/projects.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css'],
})
export class InviteComponent {
  projectsService = inject(ProjectsService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  project$ = this.activatedRoute.params.pipe(
    switchMap(({ id }) => this.projectsService.getProjectData(id)),
    catchError((error) => {
      console.log(error);
      return error;
    })
  );
  project = toSignal<any>(this.project$);

  acceptInvite() {
    this.projectsService
      .acceptInvite(this.activatedRoute.snapshot.queryParams['inviteToken'])
      .pipe(
        tap(() => {
          console.log(this.project()?._id);
        }),
        catchError((error) => {
          console.log(error);
          return error;
        }),
        tap(() => {
          this.router.navigate(['/projects', this.project()?._id]);
        })
      )
      .subscribe();
  }
}
