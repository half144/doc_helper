import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './pages/create/create.component';
import { ProjectsRouting } from './projects-routing.module';
import { ButtonModule } from 'carbon-components-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectComponent } from './pages/project/project.component';
import { RouterModule } from '@angular/router';
import { InviteComponent } from './pages/invite/invite.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ConfigComponent as SettingsComponent } from './components/config/config.component';
import { DocHelperModule } from '../doc-helper/doc-helper.module';
import { InputModule } from 'carbon-components-angular';
import { ConfigComponent } from './pages/config/config.component';

@NgModule({
  declarations: [
    CreateComponent,
    ProjectComponent,
    InviteComponent,
    ConfigComponent,
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    ProjectsRouting,
    ButtonModule,
    ReactiveFormsModule,
    RouterModule,
    NzIconModule,
    DocHelperModule,
    InputModule,
  ],
})
export class ProjectsModule {}
