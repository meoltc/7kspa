import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CatalogService } from '../../../services/catalog.service';
import { BasketService } from '../../../services/basket.service';
import { Observable } from 'rxjs/Observable';
import { GlobalState } from '../../../global.state';
import { DecimalPipe } from '@angular/common';

import 'rxjs/add/operator/map'

@Component({
    selector: 'products-table',
    templateUrl: './productstable.html',
    styleUrls: ['./productstable.scss']
})
export class ProductsTable implements OnChanges {
    @Input() category: any;

    data: any[] = [];
    filterQuery = "";
    rowsOnPage = 100;
    sortBy = "name";
    sortOrder = "asc";

    constructor(private service: CatalogService, private basketServive: BasketService, private _state: GlobalState) {
        //this.service.getProducts(0).subscribe(
        //    data => {
        //        this.data = data;

        //    },
        //    error => {
        //        //this.alertService.error(error);
        //        //this.submitted = false;
        //    });
    }

    toInt(num: string) {
        return +num;
    }

    sortByWordLength = (a: any) => {
        return a.city.length;
    }

    ngOnChanges(changes: any) {
        if (changes.category && changes.category.previousValue != changes.category.currentValue) {
            Observable.forkJoin([
                this.service.getProducts(changes.category.currentValue.gid),
                this.basketServive.getItems()
            ]).subscribe(t => {
                var data = t[0] as any[];
                var basketItems = t[1];
                data.forEach(prod => {
                    prod.isInBasket = (basketItems[prod.gid] && basketItems[prod.gid].gid);
                });
                this.data = data;
            });
        }
    }

    toggleBi(item) {
        this.basketServive.toggleItem(item).subscribe(resp => {
            if (!resp) {
                this._state.notify('basket.itemRemoved', item);
                item.isInBasket = false;
            }
            else {
                this._state.notify('basket.itemAdded', item);
                item.isInBasket = true;
            }
        });
    }
}
