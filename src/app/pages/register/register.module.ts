import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { AppTranslationModule } from '../../app.translation.module';
import { Register } from './register.component';
import { routing } from './register.routing';
import { AuthenticationService } from '../../services/authentication.service';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
      routing,
      AppTranslationModule
  ],
  declarations: [
    Register
  ],
  providers: [AuthenticationService]
})
export class RegisterModule {}
