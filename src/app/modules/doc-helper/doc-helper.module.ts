import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocHelperComponent } from './pages/scenario/doc-helper.component';
import { DocHelperRouting } from './doc-helper-routing.module';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ScenariosFormComponent } from './pages/scenario/components/scenarios-form/scenarios-form.component';
import { ScenariosDescribedFormComponent } from './pages/scenario/components/scenarios-described-form/scenarios-described-form.component';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { ScenariosComponent } from './pages/scenarios/scenarios.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCardModule } from 'ng-zorro-antd/card';
import { EditComponent } from './pages/edit/edit.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import {
  ButtonModule,
  IconModule,
  TilesModule,
} from 'carbon-components-angular';
import { InputModule, SelectModule } from 'carbon-components-angular';

@NgModule({
  declarations: [
    DocHelperComponent,
    ScenariosFormComponent,
    ScenariosDescribedFormComponent,
    ScenariosComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    DocHelperRouting,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    ReactiveFormsModule,
    NzTabsModule,
    NzButtonModule,
    NzEmptyModule,
    NzSelectModule,
    NzPopconfirmModule,
    NzListModule,
    NzCardModule,
    NzModalModule,
    ButtonModule,
    InputModule,
    SelectModule,
    TilesModule,
    IconModule,
  ],
  exports: [DocHelperComponent],
})
export class DocHelperModule {}
