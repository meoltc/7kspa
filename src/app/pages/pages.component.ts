import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';

import { BaMenuService } from '../theme';
import { PAGES_MENU } from './pages.menu';
import { GlobalState } from '../global.state';
import { BasketService } from '../services/basket.service';

@Component({
    selector: 'pages',
    template: `
    <ba-sidebar></ba-sidebar>
    <ba-page-top></ba-page-top>
    <div class="al-main">
      <div class="al-content">
        <ba-content-top></ba-content-top>
        <router-outlet></router-outlet>
      </div>
    </div>
    <footer class="al-footer clearfix">
      
    </footer>
    <ba-back-top position="200"></ba-back-top>
    `
})
export class Pages implements OnInit {

    constructor(private _menuService: BaMenuService, private m_state: GlobalState, private m_basketService: BasketService) {
    }

    ngOnInit() {
        this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
        this.m_basketService.getItemsList().subscribe(items => { this.m_state.notifyDataChanged('basket.init', items); });
    }
}
