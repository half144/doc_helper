import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, switchMap, tap } from 'rxjs';
import { ProjectsService } from 'src/app/core/services/projects/projects.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
})
export class ConfigComponent {
  projectsService = inject(ProjectsService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  inviteLink = signal<string | null>(null);

  project$ = this.activatedRoute.params.pipe(
    switchMap(({ id }) => this.projectsService.getProjectData(id)),
    catchError((error) => {
      console.log(error);
      return error;
    })
  );

  project = toSignal<any>(this.project$);
  projectName = computed(() => this.project()?.projectName);
  projectDescription = computed(() => this.project()?.projectDescription);
  membersCount = computed(() => this.project()?.projectMembers.length);

  createInviteLink() {
    return this.projectsService
      .createInviteLink(this.project()?._id)
      .pipe(
        tap((link: any) => {
          const baseUrl = window.location.origin;
          const queryToken = `?inviteToken=${link.inviteToken}`;
          const inviteLink = `${baseUrl}/projects/invite/${
            this.project()._id
          }${queryToken}`;
          this.inviteLink.set(inviteLink);
        }),
        catchError((error) => {
          console.log(error);
          return error;
        })
      )
      .subscribe();
  }

  copyInviteLink() {
    const link = this.inviteLink();
    if (link) {
      navigator.clipboard.writeText(link);
    }
  }

  exitProject() {
    return this.projectsService
      .exitProject(this.project()?._id)
      .pipe(
        tap(() => {
          this.router.navigate(['/']);
        }),
        catchError((error) => {
          console.log(error);
          return error;
        })
      )
      .subscribe();
  }
}
