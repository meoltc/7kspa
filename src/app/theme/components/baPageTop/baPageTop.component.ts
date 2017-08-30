import { Component, OnInit } from '@angular/core';

import { GlobalState } from '../../../global.state';

@Component({
    selector: 'ba-page-top',
    templateUrl: './baPageTop.html',
    styleUrls: ['./baPageTop.scss']
})
export class BaPageTop implements OnInit {

    public isScrolled: boolean = false;
    public isMenuCollapsed: boolean = false;

    userName: string;
    baItemsCount: number = 0;

    constructor(private _state: GlobalState) {
        this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
            this.isMenuCollapsed = isCollapsed;
        });
        this._state.subscribe('basket.itemAdded', (item) => {
            this.baItemsCount++;
        });
        this._state.subscribe('basket.itemRemoved', (item) => {
            this.baItemsCount--;
        });
        this._state.subscribe('basket.itemsRemoved', (item) => {
            this.baItemsCount = 0;
        });
        this._state.subscribe('basket.init', (items) => {
            this.baItemsCount = items.length;
        });
    }

    ngOnInit() {
        this.userName = '';
        var sUser = localStorage.getItem('currentUser');
        if (sUser) {
            var user = JSON.parse(sUser);
            this.userName = user.userName;
        }
    }

    public toggleMenu() {
        this.isMenuCollapsed = !this.isMenuCollapsed;
        this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
        return false;
    }

    public scrolledChanged(isScrolled) {
        this.isScrolled = isScrolled;
    }
}
