function Resources() {
    return {
        resources: [{
            type: 'stone',
            name: 'piedra',
            color: 'rgba(145, 139, 139,0.5)',
            cant: 8,
            icon: null
        }, {
            type: 'wool',
            name: 'lana',
            color: 'rgba(200, 150, 100,0.5)',
            cant: 8,
            icon: null
        }, {
            type: 'potato',
            name: 'papa',
            color: 'rgba(155, 115, 27,0.5)',
            cant: 8,
            icon: null
        }, {
            type: 'quinoa',
            name: 'quinua',
            color: 'rgba(100, 100, 27,0.5)',
            cant: 8,
            icon: null
        }, {
            type: 'gold',
            name: 'oro',
            color: 'rgba(255, 226, 12,0.3)',
            cant: 8,
            icon: null
        }, {
            type: 'wood',
            name: 'madera',
            color: 'rgba(81, 53, 0,0.6)',
            cant: 8,
            icon: null
        }],
        knight: true,
        dessert: null,
        preload: function () {
            for (var index = 0; index < this.resources.length; index++) {
                this.resources[index].icon = loadImage('assets/' + this.resources[index].type + '.png');

            }
            this.dessert = loadImage('assets/dessert.png');
        },
        getRandom: function () {
            if (this.resources.length > 0) {
                var index = Math.floor(Math.random() * 100) % this.resources.length
                if (this.knight) {
                    var extra = Math.floor(Math.random() * 30)

                    if (extra == 1) {
                        this.knight = false
                        return {
                            type: 'dessert',
                            name: 'desierto',
                            color: 'rgba(0,0,0,0.3)',
                            cant: 0,
                            icon: this.dessert
                        }
                    }
                }

                var ranResource = this.resources[index]
                this.resources[index].cant = this.resources[index].cant - 1
                if (this.resources[index].cant == 0) {
                    this.resources = this.resources.filter(function (res, factor) {
                        return factor != index
                    })

                }
                return ranResource;
            } else {
                return {
                    type: 'dessert',
                    name: 'desierto',
                    color: 'rgba(0,0,0,0.3)',
                    cant: 0,
                    icon: this.dessert
                }
            }
        }
    }
}

function Numbers() {
    return {
        tags: [{
                tag: 2,
                cant: 5
            },
            {
                tag: 3,
                cant: 5
            },
            {
                tag: 4,
                cant: 5
            },
            {
                tag: 5,
                cant: 5
            },
            {
                tag: 6,
                cant: 4
            },
            {
                tag: 8,
                cant: 4
            },
            {
                tag: 9,
                cant: 5
            },
            {
                tag: 10,
                cant: 5
            },
            {
                tag: 11,
                cant: 5
            },
            {
                tag: 12,
                cant: 5
            }
        ],
        getRandom: function () {
            if (this.tags.length > 0) {
                var index = Math.floor(Math.random() * 100) % this.tags.length

                var ranTag = this.tags[index]
                this.tags[index].cant = this.tags[index].cant - 1
                if (this.tags[index].cant == 0) {
                    this.tags = this.tags.filter(function (res, factor) {
                        return factor != index
                    })

                }
                return ranTag;
            } else return null
        }
    }
}

function Entries(valueObject) {
    var newObj = []
    for (key in valueObject) {
        newObj.push([key, valueObject[key]])

    }
    return newObj;

}
var card_names = {
    "GRAN_INCA": "GRAN_INCA",
    "AGRICULTOR": "AGRICULTOR",
    "CURACA": "CURACA",
    "DIOS_DE_LOS_DADOS": "DIOS_DE_LOS_DADOS",
    "TUCUY": "TUCUY",
    "RUNA": "RUNA",
    "MINERIA": "MINERIA",
    "OBRERO": "OBRERO",
    "VICTORY":"VICTORY",
    "LONGROUTE":"LONGROUTE"
    //"TUCUY": "TUCUY",
}
var positionsVertice = [{
        fi: 1,
        fj: 0
    },
    {
        fi: 9,
        fj: 0
    },
    {
        fi: 1,
        fj: 5
    },
    {
        fi: 9,
        fj: 5
    },
]
var positionsAristas = [{
        fi: 1,
        fj: 1
    },
    {
        fi: 8,
        fj: 1
    },
    {
        fi: 1,
        fj: 10
    },
    {
        fi: 8,
        fj: 10
    }
]

var portos = [{
    resource:'potato',
    fi: 1,
    fj: 1
}, {
    resource:'wool',
    fi: 1,
    fj: 4
}, {
    resource:'wood',
    fi: 9,
    fj: 1
}, {
    resource:'gold',
    fi: 9,
    fj: 4
}, {
    resource:'quinoa',
    fi: 7,
    fj: 0
}, {
    resource:'stone',
    fi: 3,
    fj: 5
}]