import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocHelperComponent } from './pages/scenario/doc-helper.component';
import { EditComponent } from './pages/edit/edit.component';
import { ProjectsComponent } from '../projects/pages/projects/projects.component';

const routes: Routes = [
  {
    path: 'create',
    component: DocHelperComponent,
  },
  {
    path: '',
    component: ProjectsComponent,
  },
  {
    path: 'edit/:id',
    component: EditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocHelperRouting {}
