import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { TreeModule } from 'angular-tree-component';
import { AppTranslationModule } from '../../app.translation.module';
import { GlobalState } from '../../global.state';

import { routing } from './orders.routing';
import { Orders } from './orders.component';
import { Basket } from './basket/basket.component';
import { BasketTable } from './basket/basketTable.component';


import { DataTableModule } from "angular2-datatable";
import { HttpModule } from "@angular/http";



import { BasketService } from '../../services/basket.service';
import { CatalogService } from '../../services/catalog.service';
import { WebApiBaseService } from '../../services/webapi.base.service';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        TreeModule,
        routing,
        DataTableModule,
        HttpModule,
        AppTranslationModule
    ],
    declarations: [
        Orders,
        Basket,
        BasketTable
        
    ],
    providers: [
        BasketService,
        CatalogService,
        WebApiBaseService
    ]
})
export class OrdersModule { }
