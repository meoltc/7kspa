import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { TreeModule } from 'angular-tree-component';
import { AppTranslationModule } from '../../app.translation.module';
import { GlobalState } from '../../global.state';

import { routing } from './catalog.routing';
import { Catalog } from './catalog.component';
import { ProductsList } from './products/productslist.component';
import { ProductCard } from './products/productcard.component';




import { DataTableModule } from "angular2-datatable";
import { HttpModule } from "@angular/http";


import { ProductsTable } from './products/productstable.component';


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
        Catalog,
        ProductsList,
        ProductsTable,
        ProductCard
    ],
    providers: [
        BasketService,
        CatalogService,
        WebApiBaseService
    ]
})
export class CatalogModule { }
