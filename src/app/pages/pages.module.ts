import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { AppTranslationModule } from '../app.translation.module';
import { GlobalState } from '../global.state';
import { BasketService } from '../services/basket.service';
import { DataFilterPipe } from '../pies/data-filter.pipe';

import { Pages } from './pages.component';

@NgModule({
  imports: [CommonModule, AppTranslationModule, NgaModule, routing],
  declarations: [Pages, DataFilterPipe],
  providers: [GlobalState, BasketService]
})
export class PagesModule {
}
