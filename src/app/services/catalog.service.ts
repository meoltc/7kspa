import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { WebApiBaseService } from './webapi.base.service';

@Injectable()
export class CatalogService extends WebApiBaseService {

    static _packTypes: any = {};
    static _prodUnits: any = {};

    private packTypes: any;
    private prodUnits: any;

    constructor(http: Http) {
        super(http);
        this.packTypes = CatalogService._packTypes;
        this.prodUnits = CatalogService._prodUnits;
    }

    

    getPack(gid: number) {
        return (this.packTypes[gid] || { name: gid.toString() });
    }

    getUnit(gid: number) {
        return (this.prodUnits[gid] || { short_name: gid.toString(), name: gid.toString() });
    }

    getPackTypes() {
        if (!this.packTypes.wasLoaded) {
            return this.getPackTypesFromServer().map(json => {
                var data = json as any[];
                var d = {};
                data.forEach(x => { d[x.gid] = x; });
                Object.assign(this.packTypes, d);
                this.packTypes.wasLoaded = true;
                return this.packTypes;
            });
        }
        else {
            return Observable.create(observer => {
                observer.next(this.packTypes);
                observer.complete();
            });
        }
    }

    getUnits() {
        if (!this.prodUnits.wasLoaded) {
            return this.getUnitTypesFromServer().map(json => {
                var data = json as any[];
                var d = {};
                data.forEach(x => { d[x.gid] = x; });
                Object.assign(this.prodUnits, d);
                this.prodUnits.wasLoaded = true;
                return this.prodUnits;
            });
        }
        else {
            return Observable.create(observer => {
                observer.next(this.prodUnits);
                observer.complete();
            });
        }
    }



    getCategoriesTree() {
        var headers = this.m_appendAuthHeader();
        return this.http.get(this.BASE_API_URL + '/api/catalog/groups', { headers: headers })
            .map((response: Response) => {
                var tree = [];
                var json = response.json() as any[];
                var roots = json.filter(x => !x.parent_group);
                roots.forEach(root => this.m_buildTree(json, root, json.filter(x => x.parent_group == root.gid)));
                return roots;
            });
    }

    

    getPackTypesFromServer() {
        var headers = this.m_appendAuthHeader();
        return this.http.get(this.BASE_API_URL +'/api/catalog/packTypes', { headers: headers }).map((response: Response) => {
            return response.json();
        });
    }

    getUnitTypesFromServer() {
        var headers = this.m_appendAuthHeader();
        return this.http.get(this.BASE_API_URL + '/api/catalog/measureUnits', { headers: headers }).map((response: Response) => {
            return response.json();
        });
    }

    getProduct(product: number) {
        var headers = this.m_appendAuthHeader();
        return this.http.get(this.BASE_API_URL + '/api/catalog/product?id=' + product, { headers: headers }).map((response: Response) => {
            return response.json();
        });
    }


    getProducts(category: number) {
        if (!category) {
            category = 0;
        }

        var headers = this.m_appendAuthHeader();
        return Observable.forkJoin([
            this.http.get(this.BASE_API_URL +'/api/catalog/products?groupId=' + category, { headers: headers }),
            this.http.get(this.BASE_API_URL + '/api/catalog/productsPrices?groupId=' + category, { headers: headers }),
            this.getPackTypes(),
            this.getUnits()
        ]).map(t => {
            var resp = t as any;
            var data = resp[0].json() as any[];
            var productPrices = resp[1].json() as any[];
            var dProductPrices = {};
            productPrices.forEach(pp => dProductPrices[pp.goods] = pp);
            data.forEach(p => {
                if (dProductPrices[p.gid]) {
                    p.price_with_tax = (dProductPrices[p.gid].price_with_tax || 0);
                    p.price_without_tax = (dProductPrices[p.gid].price_without_tax || 0);
                }
                else {
                    p.price_with_tax = 0;
                    p.price_without_tax = 0;
                }
                p.pack = this.getPack(p.packing_type);
                p.unit = this.getUnit(p.measure_unit);
                if (!p.min_order_cardinality) {
                    p.min_order_cardinality = p.cardinality;
                }
            });
            return data;
        });
    }
}