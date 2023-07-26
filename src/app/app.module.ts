import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { pt_BR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DocHelperModule } from './modules/doc-helper/doc-helper.module';
import { HeaderComponent } from './shared/components/header/header.component';
import { CoreModule } from './core/core.module';
import {
  HeaderModule,
  SideNavModule,
  UIShellModule,
  SearchModule,
  DialogModule,
  ThemeModule,
  IconModule,
  TilesModule,
  InputModule,
} from 'carbon-components-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

registerLocaleData(pt);

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DocHelperModule,
    CoreModule,
    HeaderModule,
    SideNavModule,
    UIShellModule,
    SearchModule,
    DialogModule,
    ThemeModule,
    NzIconModule,
    IconModule,
    TilesModule,
    InputModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    { provide: NZ_I18N, useValue: pt_BR },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
