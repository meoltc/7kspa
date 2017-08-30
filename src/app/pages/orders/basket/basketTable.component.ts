import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { CatalogService } from '../../../services/catalog.service';
import { BasketService } from '../../../services/basket.service';
import { Observable } from 'rxjs/Observable';
import { GlobalState } from '../../../global.state';

import 'rxjs/add/operator/map'

@Component({
    selector: 'basket-table',
    templateUrl: './basketTable.html',
    styleUrls: ['./basketTable.scss']
})
export class BasketTable implements OnChanges, OnInit {
    data: any[] = [];
    packTypes: any = null;
    filterQuery = "";
    rowsOnPage = 100;
    sortBy = "name";
    sortOrder = "asc";
    loading = false;

    constructor(private service: CatalogService, private basketServive: BasketService, private _state: GlobalState) {
        
    }

    toInt(num: string) {
        return +num;
    }

    sortByWordLength = (a: any) => {
        return a.city.length;
    }

    ngOnInit() {
        this.basketServive.getItemsList().subscribe(data => {
            this.data = data;
        });
    }

    ngOnChanges(changes: any) {
        
    }

    canDec(item) {
        return (item.quantity - item.min_order_cardinality) > 0;
    }

    inc(item) {
        item.loading = true;
        item.quantity += item.min_order_cardinality;
        this.basketServive.updateItem(item).subscribe(resp =>{
            item.loading = false;
        });
    }

    dec(item) {
        item.loading = true;
        item.quantity -= item.min_order_cardinality;
        this.basketServive.updateItem(item).subscribe(resp =>{
            item.loading = false;
        });
    }

    calcAmmount(item) {
        return item.quantity * item.price_with_tax;
    }

    toggleBi(item)
    {
        this.basketServive.toggleItem(item).subscribe(resp => {
            if (!resp) {
                this._state.notify('basket.itemRemoved', item);
                var index = this.data.indexOf(item, 0); 
                if (index >= 0) {
                    this.data.splice(index,1);
                }
            }
        });
    }

    showTotalPlaces(data: any[]) {
        var result = 0;
        data.forEach(x => result += (x.quantity / x.cardinality));
        return result;
    }

    showTotalWeight(data: any[]) {
        var result = 0;
        data.forEach(x => result += (x.quantity * x.unit_weight));
        return result;
    }

    showSum(data: any[]) {
        var result = 0;
        data.forEach(x => result += (x.quantity * x.price_with_tax));
        return result;
    }

    submitBasket() {
        alert('submitting basket');
    }

    suspendBasket() {
        alert('suspend basket');
    }

    clearBasket() {
        this.basketServive.clearBasket().subscribe(resp => {
            this._state.notify('basket.itemsRemoved', 0);
            this.data = [];
        });
    }
}
