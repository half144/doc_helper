import { Component, inject, signal } from '@angular/core';
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
  router = inject(Router);
  route = inject(ActivatedRoute);

  inviteLink = signal<string | null>(null);

  project$ = this.route.params.pipe(
    switchMap((params) => this.projectsService.getProjectData(params['id']))
  );

  project = toSignal<any>(this.project$);

  public createInviteLink() {
    return this.projectsService
      .createInviteLink(this.project()?._id)
      .pipe(
        tap((link) => this.setInviteLink(link)),
        catchError((error) => {
          console.log(error);
          return error;
        })
      )
      .subscribe();
  }

  public copyInviteLink() {
    const link = this.inviteLink();
    if (link) navigator.clipboard.writeText(link);
  }

  public exitProject() {
    return this.projectsService
      .exitProject(this.project()?._id)
      .pipe(
        tap(() => this.router.navigate(['/'])),
        catchError((error) => {
          console.log(error);
          return error;
        })
      )
      .subscribe();
  }

  private setInviteLink(link: any) {
    const baseUrl = window.location.origin;
    const queryToken = `?inviteToken=${link.inviteToken}`;

    const inviteLink = `${baseUrl}/projects/invite/${
      this.project()._id
    }${queryToken}`;
    this.inviteLink.set(inviteLink);
  }
}
