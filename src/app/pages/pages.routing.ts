import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from '../guards/auth.guard';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: 'app/pages/register/register.module#RegisterModule'
  },
  {
    path: 'pages',
    component: Pages,
    children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [AuthGuard] },
        { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard]},
        { path: 'catalog', loadChildren: './catalog/catalog.module#CatalogModule', canActivate: [AuthGuard] },
        { path: 'orders', loadChildren: './orders/orders.module#OrdersModule', canActivate: [AuthGuard] }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
