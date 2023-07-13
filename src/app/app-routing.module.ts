import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JWTGuard } from './core/guards/jwt.guard';
import { NotAuthenticatedGuard } from './core/guards/notAuth.guard';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [JWTGuard],
    loadChildren: () =>
      import('./modules/doc-helper/doc-helper.module').then(
        (m) => m.DocHelperModule
      ),
  },
  {
    path: '',
    canActivateChild: [NotAuthenticatedGuard],
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'projects',
    canActivateChild: [JWTGuard],
    loadChildren: () =>
      import('./modules/projects/projects.module').then(
        (m) => m.ProjectsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
