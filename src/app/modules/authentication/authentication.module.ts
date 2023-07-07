import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { InputModule, ButtonModule } from 'carbon-components-angular';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    InputModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
})
export class AuthenticationModule {}
