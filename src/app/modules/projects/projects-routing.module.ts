import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './pages/create/create.component';
import { ProjectComponent } from './pages/project/project.component';
import { InviteComponent } from './pages/invite/invite.component';
import { ConfigComponent } from './pages/config/config.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateComponent,
  },
  {
    path: ':id',
    component: ProjectComponent,
  },
  {
    path: 'invite/:id',
    component: InviteComponent,
  },
  {
    path: ':id/config',
    component: ConfigComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRouting {}
