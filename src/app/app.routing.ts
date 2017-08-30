import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';
import { Login } from './pages/login/login.component';

export const routes: Routes = [
    { path: 'login', loadChildren: './pages/login/login.module#LoginModule' },
    { path: 'catalog', loadChildren: './pages/catalog/catalog.module#CatalogModule', canActivate: [AuthGuard] },
    { path: '', redirectTo: 'pages', pathMatch: 'full', canActivate: [AuthGuard] },

    { path: '**', redirectTo: 'pages/dashboard', canActivate: [AuthGuard] },

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
