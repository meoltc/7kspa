import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { WebApiBaseService } from './webapi.base.service';

@Injectable()
export class BasketService extends WebApiBaseService {

    static _itemsCache: any = { isEmply: true };

    static initItemsFromCache() {
        try {
            var sBasket = localStorage.getItem('CACHE_CURR_BASKET');
            if (sBasket) {
                var items = JSON.parse(sBasket);
                try {
                    var keys = Object.keys(items);
                    keys.forEach(key => {
                        var item = items[key];
                        //validating item
                        if (item.gid && item.name && item.unit && item.pack && item.quantity && item.price_without_tax && item.price_with_tax && item.min_order_cardinality) {
                            item.loading = false;
                            BasketService._itemsCache[item.gid] = item;
                        }
                    });
                }
                catch(ex){}
            }
            delete (BasketService._itemsCache.isEmply);

        } catch (e) {
            BasketService._itemsCache = {};
        }
    }

    constructor(http: Http) {
        super(http);
        if (BasketService._itemsCache.isEmply) {
            BasketService.initItemsFromCache();
        }
        this.m_itemsCache = BasketService._itemsCache;
    }

    m_itemsCache: Object;

    getItems() {
        
        return Observable.create(observer => {
            observer.next(this.m_itemsCache);
            observer.complete();
        });

        //var headers = this.m_appendAuthHeader();
        //return this.http.get(this.BASE_API_URL + '/api/basket/items', { headers: headers }).map((response: Response) => {
        //    return response.json();
        //});
    }

    getItemsList(): Observable<any[]> {
        var data = this.m_itemsCache;
        var values = Object.keys(data).map(key => data[key]);
        return Observable.create(observer => {
            observer.next(values);
            observer.complete();
        });
    }

    updateItem(item) {
        this.m_itemsCache[item.gid] = item;
        localStorage.setItem('CACHE_CURR_BASKET', JSON.stringify(this.m_itemsCache));
        return Observable.create(observer => {
            observer.next(item);
            observer.complete();
        });
    }

    toggleItem(prod: any) {
        var current = this.m_itemsCache[prod.gid];
        if (current) {
            delete (this.m_itemsCache[prod.gid]);

            localStorage.setItem('CACHE_CURR_BASKET', JSON.stringify(this.m_itemsCache));

            return Observable.create(observer => {
                observer.next(false);
                observer.complete();
            });
        }
        else {
            var item = Object.assign({}, prod);
            item.quantity = prod.min_order_cardinality;
            this.m_itemsCache[prod.gid] = item;

            localStorage.setItem('CACHE_CURR_BASKET', JSON.stringify(this.m_itemsCache));

            return Observable.create(observer => {
                observer.next(item);
                observer.complete();
            });

        }
    }

    clearBasket() {
        BasketService._itemsCache = {};
        this.m_itemsCache = BasketService._itemsCache;
        localStorage.setItem('CACHE_CURR_BASKET', JSON.stringify(this.m_itemsCache));
        return Observable.create(observer => {
            observer.next(this.m_itemsCache);
            observer.complete();
        });
    }
}