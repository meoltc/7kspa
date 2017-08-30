import { Component, ViewChild } from '@angular/core';
import { CatalogService } from '../../../services/catalog.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';



@Component({
    selector: 'product',
    templateUrl: './productCard.html',
})
export class ProductCard {
    product: any = {gid:0, name:''};
    group: any;

    constructor(
        private catalogService: CatalogService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
    }
    ngOnInit() {

        this.route.params
            .subscribe((params) => {
                
                if (params) {
                    var gid = parseInt(params['product']) || 0;
                    this.catalogService.getProduct(gid)
                        .subscribe(prod => {
                            this.product = prod;
                        });
                }
            });

    }
}
