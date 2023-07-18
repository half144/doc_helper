import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { ProjectsService } from 'src/app/core/services/projects/projects.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  projectsService = inject(ProjectsService);

  createProjectForm = this.formBuilder.group({
    projectName: ['', Validators.required],
    projectDescription: [''],
  });

  onSubmit() {
    if (this.createProjectForm.invalid)
      this.createProjectForm.markAllAsTouched();

    this.projectsService
      .createProject(this.createProjectForm.value)
      .pipe(
        tap((res: any) => {
          this.router.navigate(['projects', res._id]);
        })
      )
      .subscribe();
  }
}
