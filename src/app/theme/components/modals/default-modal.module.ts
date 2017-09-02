import { NgModule } from '@angular/core';
import { DefaultModal } from './default-modal.component';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [ 
//   NgbModule.forRoot(),
     NgbModalModule 
  ],
  declarations: [ DefaultModal ],
  exports: [ DefaultModal ],
  entryComponents: [ DefaultModal ]
})
export class DefaultModalModule {

}