import { Routes, RouterModule }  from '@angular/router';
import { Pages } from '../pages.component';
import { ProductsList } from './products/productslist.component';
import { ProductCard } from './products/productcard.component';
import { Catalog } from './catalog.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from '../../guards/auth.guard';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: '',
    component: Catalog,
    children: [
        { path: '', redirectTo: 'products', pathMatch: 'full', canActivate: [AuthGuard] },
        { path: 'products', component: ProductsList, canActivate: [AuthGuard] },
        { path: 'products/:group', component: ProductsList, canActivate: [AuthGuard] },
        { path: 'products/:group/product/:product', component: ProductCard, canActivate: [AuthGuard] }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
