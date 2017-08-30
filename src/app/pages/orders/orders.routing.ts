import { Routes, RouterModule }  from '@angular/router';
import { Pages } from '../pages.component';
import { Basket } from './basket/basket.component'
import { Orders } from './orders.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from '../../guards/auth.guard';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: '',
    component: Orders,
    children: [
        { path: '', redirectTo: 'basket', pathMatch: 'full', canActivate: [AuthGuard] },
        { path: 'basket', component: Basket, canActivate: [AuthGuard]},
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
