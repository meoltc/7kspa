import { Component, ViewChild } from '@angular/core';
import { TreeComponent, TreeNode, TreeModel, TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';
import { CatalogService } from '../../../services/catalog.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';



@Component({
    selector: 'products',
    templateUrl: './productslist.html',
})
export class ProductsList {
    @ViewChild('tree') tree: TreeComponent;

    nodes: any[];
    
    selectedCategory: any = { name: '' };
    constructor(
        private catalogService: CatalogService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
    }
    
    ngOnDestroy() {
        this.saveTreeState();
        console.log("ngOnDestroy()");
    }    
    
    saveTreeState() {
        let state=this.tree.treeModel.getState();
        localStorage.setItem('treeState',JSON.stringify(state));
    } 

    restoreTreeState() {
        if(!localStorage.treeState) 
            return;
        let treeState=JSON.parse(localStorage.treeState);
        this.tree.treeModel.setState(treeState);
        if(localStorage.currentGid) 
            this.router.navigate(['/pages', 'catalog', 'products', localStorage.currentGid.toString()]);            
    }    
    
    ngOnInit() {

        this.route.params
            .subscribe((params) => {
                
                if (params && params['group']) {
                    var cat = { name: '', gid: 0 };
                    cat.gid = parseInt(params['group']) || 0;
                    var node = null;
                    if (this.nodes && this.nodes.length) {
                        node = this.findNode(cat.gid, this.nodes);
                    }
                    if (node) {
                        this.selectedCategory = node;
                        this.tree.treeModel.update();
                    }
                    else {
                        this.selectedCategory = cat;
                    }
                }
            });

        this.catalogService.getCategoriesTree()
            .subscribe(
            nodes => {
                if (nodes.length == 1) {
                    nodes[0].expanded = true;
                }
                this.nodes = nodes;
                if (this.selectedCategory && this.selectedCategory.gid && !this.selectedCategory.name) {
                    var node = this.findNode(this.selectedCategory.gid, this.nodes);
                    if (node) {
                        this.selectedCategory.name = node.name;
                        this.tree.treeModel.update();
                    }
                }
            },
            error => {
                //this.alertService.error(error);
                //this.submitted = false;
            });

    }

    findNode(gid, nodes: any[]): any {
        for (var i = 0; i < nodes.length; i++) {
            var n = nodes[i];
            if (n.gid == gid) {
                return n;
            }
            else if (n.hasChildren) {
                var result = this.findNode(gid, n.children);
                if (result) {
                    n.isExpandedField = true;
                    return result;
                }
            }
        }
        return null;
    }

    customTemplateStringOptions: ITreeOptions = {
        isExpandedField: 'expanded',
        idField: 'gid'
    }
    onEvent(event) {
        let currentGid;

        //console.log("EVENT name",event.eventName);

        if(event.eventName == 'initialized') 
            this.restoreTreeState();
            
        if (event.eventName == 'activate') {
            currentGid=event.node.data.gid;
            this.router.navigate(['/pages', 'catalog', 'products', currentGid.toString()]);
            localStorage.setItem("currentGid",currentGid);
            //this.router.navigate(['/pages', 'catalog', 'products', event.node.data.gid.toString()], { queryParams: { group: event.node.data.gid } });
            //this.selectedCategory = event.node.data;
        }
    }

}
