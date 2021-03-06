﻿import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { AppTranslationModule } from '../../app.translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Login } from './login.component';
import { routing } from './login.routing';
import { AuthenticationService } from '../../services/authentication.service';

import { DefaultModalModule } from '../../theme/components/modals/default-modal.module';

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    DefaultModalModule,
    routing
  ],
  declarations: [
    Login
  ],
  providers: [
      AuthenticationService
  ]
})
export class LoginModule {}
