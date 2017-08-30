export const PAGES_MENU = [
    {
        path: 'pages',
        children: [
            {
                path: 'dashboard',
                data: {
                    menu: {
                        title: 'general.menu.dashboard',
                        icon: 'ion-android-home',
                        selected: false,
                        expanded: false,
                        order: 0
                    }
                }
            },
            {
                path: 'catalog',
                data: {
                    menu: {
                        title: 'general.menu.catalog',
                        icon: 'ion-grid',
                        selected: false,
                        expanded: false,
                        order: 50
                    }
                },
                children: [
                    {
                        path: 'products',
                        data: {
                            menu: {
                                title: 'catalog.productTitle',
                            }
                        }
                    }
                ]
            },
            {
                path: 'orders',
                data: {
                    menu: {
                        title: 'general.menu.orders',
                        //icon: 'ion-grid',
                        selected: false,
                        expanded: false,
                        order: 100
                    }
                },
                children: [
                    {
                        path: 'basket',
                        data: {
                            menu: {
                                title: 'basket.basketTitle',
                            }
                        }
                    }
                ]
            }
        ]
    }
];
