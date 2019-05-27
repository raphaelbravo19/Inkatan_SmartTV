function Vertice(iIndex, jIndex, posx, posy) {
    return {
        iIndex: iIndex,
        jIndex: jIndex,
        posx: posx,
        posy: posy,
        taken: '',
        draw: function (value) {
            push()
            stroke('rgba(255,255,255,0.5)')
            strokeWeight(radio * 0.05)
            fill(value ? value : PlayersDetails[turnIndex].color)
            //textSize(32);
            ellipse(this.posx, this.posy, radio * 0.35, radio * 0.35)
            //fill(0, 0, 0);
            //text(this.iIndex.toString() + this.jIndex.toString(), this.posx, this.posy)
            pop()
        },
        getAdyacents: function () {

            if (iIndex == 10 || iIndex == 9) {
                return [{
                        fi: iIndex - 1,
                        fj: jIndex
                    },
                    {
                        fi: iIndex - 1,
                        fj: jIndex + 1
                    },

                    {
                        fi: iIndex + 1,
                        fj: jIndex
                    },

                    {
                        fi: iIndex,
                        fj: jIndex
                    }
                ]
            } else if ((iIndex % 2 == 0 && iIndex != 0)) {
                return [{
                        fi: iIndex - 1,
                        fj: jIndex - 1
                    },
                    {
                        fi: iIndex - 1,
                        fj: jIndex
                    },
                    {
                        fi: iIndex + 1,
                        fj: jIndex - 1
                    },
                    {
                        fi: iIndex + 1,
                        fj: jIndex
                    },

                    {
                        fi: iIndex,
                        fj: jIndex
                    }
                ]
            } else if (iIndex == 1) {
                return [{
                        fi: iIndex - 1,
                        fj: jIndex - 1
                    },
                    {
                        fi: iIndex - 1,
                        fj: jIndex
                    },
                    {
                        fi: iIndex + 1,
                        fj: jIndex
                    },
                    {
                        fi: iIndex + 1,
                        fj: jIndex + 1
                    },

                    {
                        fi: iIndex,
                        fj: jIndex
                    }
                ]
            } else {
                return [{
                        fi: iIndex - 1,
                        fj: jIndex
                    },
                    {
                        fi: iIndex - 1,
                        fj: jIndex + 1
                    },
                    {
                        fi: iIndex + 1,
                        fj: jIndex
                    },
                    {
                        fi: iIndex + 1,
                        fj: jIndex + 1
                    },

                    {
                        fi: iIndex,
                        fj: jIndex
                    }
                ]
            }

        },
        getAround: function () {
            return [{
                    fi: this.iIndex,
                    fj: this.iIndex % 2 == 0 && this.iIndex != 0 ? this.jIndex - 1 : this.jIndex
                },
                {
                    fi: this.iIndex - 1,
                    fj: this.jIndex
                },
                {
                    fi: this.iIndex - 2,
                    fj: this.iIndex % 2 != 0 || this.iIndex == 10 ? this.jIndex : this.jIndex - 1
                },
                {
                    fi: this.iIndex - 1,
                    fj: this.jIndex - 1
                },
            ]
        },
        drawPorto: function () {
            push()
            stroke('rgba(60,60,60,0.3)')
            fill('rgba(100,100,100,1)')
            rectMode(CENTER)
            //beginShape()
            //ellipse(this.posx, this.posy - radio * 0.25, radio * 0.50, radio * 0.50)
            rect(this.posx + radio * 0.10, this.posy - radio * 0.10, radio * 0.50, radio * 0.50)
            quad(this.posx - radio * 0.15, this.posy - radio * 0.35,
                this.posx + radio * 0.35, this.posy - radio * 0.35,
                this.posx + radio * 0.25, this.posy - radio * 0.25,
                this.posx - radio * 0.25, this.posy - radio * 0.25)
            quad(this.posx + radio * 0.35, this.posy - radio * 0.35,

                this.posx + radio * 0.25, this.posy - radio * 0.25,

                this.posx + radio * 0.25, this.posy + radio * 0.25,
                this.posx + radio * 0.35, this.posy + radio * 0.15)
            rect(this.posx, this.posy, radio * 0.50, radio * 0.50)
            fill('rgba(30,30,30,0.2)')
            rect(this.posx - radio * 0.125, this.posy - radio * 0.20, radio * 0.25, radio * 0.10)
            rect(this.posx + radio * 0.125, this.posy - radio * 0.10, radio * 0.25, radio * 0.10)
            rect(this.posx - radio * 0.125, this.posy, radio * 0.25, radio * 0.10)
            rect(this.posx + radio * 0.125, this.posy + radio * 0.10, radio * 0.25, radio * 0.10)
            rect(this.posx - radio * 0.125, this.posy + radio * 0.20, radio * 0.25, radio * 0.10)
            //endShape()
            pop()
        }
    }
}

function Arista(iIndex, jIndex, start, end) {
    return {
        iIndex: iIndex,
        jIndex: jIndex,
        start: start,
        end: end,
        taken: '',
        draw: function (value) {
            //ellipse(this.posx, this.posy, 50,10)
            fill(value ? value : PlayersDetails[turnIndex].color)

            var angulo = Math.atan((this.start.posy - this.end.posy) / (this.start.posx - this.end.posx))
            push()
            stroke('rgba(255,255,255,0.5)')
            strokeWeight(radio * 0.02)
            translate((this.start.posx + this.end.posx) / 2, (this.start.posy + this.end.posy) / 2)
            rotate(angulo)
            //console.log(ind, ind2)
            //line(objLine[0].posx, objLine[0].posy, objLine[1].posx, objLine[1].posy)
            //text(angulo, (objLine[0].posx + objLine[1].posx) / 2, (objLine[0].posy + objLine[1].posy) / 2)
            rectMode(CENTER)
            rect(0, 0, radio * 0.8, radio * 0.2, 3, 3, 3, 3)
            //image(img,-sideTriangle*0.6/2, -15, sideTriangle*0.6, 30)
            pop()
            textAlign(CENTER, CENTER)
            fill('black')

            //text(this.iIndex+'-'+this.jIndex,(this.start.posx+this.end.posx)/2,(this.start.posy+this.end.posy)/2)
        }
    }
}

function Rombo(origin, resource, number) {
    return {
        origin: origin,
        iIndex: origin.iIndex,
        jIndex: origin.jIndex,
        resource: resource,
        number: number,
        getPoint: function (side) {
            switch (side) {
                case 'left':
                    return Vertice(this.origin.iIndex + 1, this.origin.jIndex, this.origin.posx - radio, this.origin.posy)
                case 'down':
                    return Vertice(this.origin.iIndex + 2, this.origin.iIndex % 2 == 0 && this.origin.iIndex < 8 ? this.origin.jIndex + 1 : this.origin.jIndex, this.origin.posx, this.origin.posy + radio)
                case 'right':
                    return Vertice(this.origin.iIndex + 1, this.origin.jIndex + 1, this.origin.posx + radio, this.origin.posy)
                case 'up':
                    return Vertice(this.origin.iIndex, this.origin.iIndex % 2 == 0 && this.origin.iIndex != 0 ? this.origin.jIndex + 1 : this.origin.jIndex, this.origin.posx, this.origin.posy - radio)
            }
        },

        getArista: function (side) {
            switch (side) {
                case 1:
                    return Arista(this.origin.iIndex, this.origin.iIndex == 0 || this.origin.iIndex % 2 == 1 ? this.origin.jIndex * 2 : (this.origin.jIndex * 2) + 1, this.getPoint('up'), this.getPoint('left'))
                case 2:
                    return Arista(this.origin.iIndex, this.origin.iIndex == 0 || this.origin.iIndex % 2 == 1 ? this.origin.jIndex * 2 + 1 : this.origin.jIndex * 2 + 2, this.getPoint('right'), this.getPoint('up'))
                case 3:
                    return Arista(this.origin.iIndex + 1, this.origin.iIndex == 8 || this.origin.iIndex % 2 == 1 ? this.origin.jIndex * 2 : (this.origin.jIndex * 2) + 1, this.getPoint('left'), this.getPoint('down'))
                case 4:
                    return Arista(this.origin.iIndex + 1, this.origin.iIndex == 8 || this.origin.iIndex % 2 == 1 ? this.origin.jIndex * 2 + 1 : this.origin.jIndex * 2 + 2, this.getPoint('down'), this.getPoint('right'))
            }
        },
        draw: function () {
            image(this.resource.icon, this.origin.posx - radio, this.origin.posy - radio, 2 * radio, 2 * radio)
            fill(this.resource ? this.resource.color : 'black')

            quad(this.origin.posx - radio, this.origin.posy,
                this.origin.posx, this.origin.posy + radio,
                this.origin.posx + radio, this.origin.posy,
                this.origin.posx, this.origin.posy - radio)


            textAlign(CENTER, CENTER)
            fill('black')
            fill('rgba(0,0,0,0.4)')
            ellipse(this.origin.posx + (radio * 0.025), this.origin.posy + (radio * 0.025), radio * 0.4, radio * 0.4)
            fill('lightgrey')
            stroke('rgba(0,0,0,0.7)')
            ellipse(this.origin.posx, this.origin.posy, radio * 0.4, radio * 0.4)
            fill('black')
            textSize((radio * 0.25));
            text(this.number.tag, this.origin.posx, this.origin.posy)
            //this.origin.draw()
            //origin.draw()
        },
        drawActive: function () {
            fill(PlayersDetails[turnIndex].color)
            quad(this.origin.posx - radio, this.origin.posy,
                this.origin.posx, this.origin.posy + radio,
                this.origin.posx + radio, this.origin.posy,
                this.origin.posx, this.origin.posy - radio)


            //origin.draw()
        }
    }
}

function Mapa() {
    return {
        listRombos: [],
        listPoints: [],
        listAristas: [],
        altura: 9,
        select: 'rombo',
        resources: Resources(),
        numbers: Numbers(),
        ruleta: null,
        changeSelect: function () {
            switch (this.select) {
                case 'vertice':
                    this.select = 'arista';
                    break;
                case 'arista':
                    this.select = 'rombo';
                    break;
                case 'rombo':
                    this.select = 'vertice';
                    break;
            }
        },
        setup: function () {

            for (var i = 0; i < this.altura; i++) {
                var padd = (i % 2 == 0 ? radio : 0) + radio
                for (var j = 0; j < (i % 2 == 0 ? 5 : 6); j++) {
                    var origen = Vertice(i, j, paddingLeft + padd + (radio * 2 * j), paddingHeight + radio + (radio * i))
                    var resource = this.resources.getRandom()
                    var number = resource.name == 'desierto' ? {
                        tag: 7
                    } : this.numbers.getRandom()
                    var rombo = Rombo(origen, resource, number)
                    this.setSides(rombo)
                    if (this.listRombos[i] == null) {
                        this.listRombos[i] = []
                    }
                    this.listRombos[i][j] = rombo
                }
            }
        },
        setSides: function (rombo) {
            this.addPoint(rombo.getPoint('up'))
            this.addPoint(rombo.getPoint('right'))
            this.addPoint(rombo.getPoint('down'))
            this.addPoint(rombo.getPoint('left'))
            this.addArista(rombo.getArista(1))
            this.addArista(rombo.getArista(2))
            this.addArista(rombo.getArista(3))
            this.addArista(rombo.getArista(4))
        },
        addPoint: function (point) {
            if (this.listPoints[point.iIndex]) {

            } else {
                this.listPoints[point.iIndex] = []
            }
            if (!this.listPoints[point.iIndex][point.jIndex]) {
                this.listPoints[point.iIndex][point.jIndex] = point
            }

        },
        addArista: function (arista) {
            if (this.listAristas[arista.iIndex]) {

            } else {
                this.listAristas[arista.iIndex] = []
            }
            if (!this.listAristas[arista.iIndex][arista.jIndex]) {
                this.listAristas[arista.iIndex][arista.jIndex] = arista
            }
        },
        addObject: function (player) {
            if (this.select == "vertice") {
                if (this.listPoints[player.indicators.vertice.fi][player.indicators.vertice.fj].taken == '') {
                    var canTake = true
                    var listAdj = this.listPoints[player.indicators.vertice.fi][player.indicators.vertice.fj].getAdyacents()
                    var tempListPoints = this.listPoints
                    listAdj.map(function (ad) {
                        if (ad.fi >= 0 && ad.fj >= 0) {
                            if (tempListPoints[ad.fi] != null) {
                                if (tempListPoints[ad.fi][ad.fj] != null) {
                                    var tempTaken = tempListPoints[ad.fi][ad.fj].taken
                                    if (tempTaken.toString() != '') {
                                        canTake = false
                                    }
                                }
                            }
                        }
                        //
                    })
                    if (canTake) {
                        for (var index = 0; index < portos.length; index++) {
                            //console.log(portos[index].fi, player.indicators.vertice.fi)
                            if (portos[index].fi == player.indicators.vertice.fi && portos[index].fj == player.indicators.vertice.fj) {
                                canTake = false
                            }

                        }
                    }
                    if (canTake) {
                        this.listPoints[player.indicators.vertice.fi][player.indicators.vertice.fj].taken = turnIndex
                        player.houses.push(this.listPoints[player.indicators.vertice.fi][player.indicators.vertice.fj])

                    }
                }
            } else if (this.select == "arista") {
                if (this.listAristas[player.indicators.arista.fi][player.indicators.arista.fj].taken.toString() == '') {
                    var current = this.listAristas[player.indicators.arista.fi][player.indicators.arista.fj]
                    var canSet = this.listPoints[current.start.iIndex][current.start.jIndex].taken.toString() != '' && this.listPoints[current.start.iIndex][current.start.jIndex].taken.toString() == turnIndex.toString() ||
                        this.listPoints[current.end.iIndex][current.end.jIndex].taken.toString() == turnIndex.toString();

                    if (!canSet) {
                        player.ways.map(function (way) {
                            if ((way.start.iIndex == current.start.iIndex && way.start.jIndex == current.start.jIndex) ||
                                (way.start.iIndex == current.end.iIndex && way.start.jIndex == current.end.jIndex) ||
                                (way.end.iIndex == current.start.iIndex && way.end.jIndex == current.start.jIndex) ||
                                (way.end.iIndex == current.end.iIndex && way.end.jIndex == current.end.jIndex)) {
                                canSet = true
                            }
                        })
                    }

                    if (canSet) {
                        this.listAristas[player.indicators.arista.fi][player.indicators.arista.fj].taken = turnIndex
                        player.ways.push(this.listAristas[player.indicators.arista.fi][player.indicators.arista.fj])

                    }
                }
            } else if (this.select == "rombo") {

            }
        },
        printObjects: function (players) {
            players.map(function (player) {
                player.houses.map(function (house) {
                    house.draw(player.color)
                })
                player.ways.map(function (way) {
                    way.draw(player.color)
                })
            })
        },
        printPoint: function (i, j) {
            this.listPoints[i][j].draw()
        },
        printArista: function (i, j) {
            this.listAristas[i][j].draw()
        },
        printRombo: function (i, j) {
            try {
                this.listRombos[i][j].drawActive()
            } catch (error) {
                //console.log(error)
            }

        },
        printAll: function () {
            this.listRombos.map(function (rombos) {
                rombos.map(function (rombo) {
                    rombo.draw()
                })
            })
            var list = this.listPoints
            portos.map(function (item) {
                list[item.fi][item.fj].drawPorto()
            })

            if (this.ruleta != null) {

                for (var index = 0; index < this.ruleta.list.length; index++) {
                    if (this.listRombos[this.ruleta.list[index].fi]) {
                        if (this.listRombos[this.ruleta.list[index].fi][this.ruleta.list[index].fj]) {
                            var rombo = this.listRombos[this.ruleta.list[index].fi][this.ruleta.list[index].fj]
                            if (this.ruleta.index != index) {
                                rombo.drawActive()
                            }
                        }
                    }
                }
                if (this.ruleta.type == "run") {
                    this.ruleta.tempo = this.ruleta.tempo >= this.ruleta.pivot ? 0 : this.ruleta.tempo + 1
                    if (this.ruleta.tempo >= this.ruleta.pivot) {
                        //if (this.ruleta.index == 3) {
                        this.ruleta.pivot = this.ruleta.pivot + this.ruleta.pivot * 0.2
                        this.ruleta.tempo = 0
                        //}
                        this.ruleta.index = this.ruleta.index == 3 ? 0 : this.ruleta.index + 1

                        if (this.ruleta.pivot >= 50) {
                            var that = this
                            setTimeout(function () {
                                that.ruleta.type = "asign"
                            }, 2000)
                            this.ruleta.type = "stop"
                        }
                    }
                }
            }
            dice.draw()
            /*this.listPoints.map(function (points) {
                points.map(function (point) {
                    point.draw()
                })
            })*/
            /* this.listAristas.map(function(aristas){
                aristas.map(function(arista){
                    arista.draw()
                })
            })  */
            //   console.log(response)
            /*response.map(function (value) {
                value.point.draw()


            })*/
        },
        move: function (player, side) {
            if (this.select == 'vertice') {
                this.moveVertice(player, side)
            }
            if (this.select == 'arista') {
                this.moveArista(player, side)
            }
            if (this.select == 'rombo') {
                this.moveRombo(player, side)
            }
        },
        moveVertice: function (player, side) {
            if (side == 'down') {
                var newfj = player.indicators.vertice.fi == 0 ?
                    player.indicators.vertice.fj + 1 : player.indicators.vertice.fi == 8 ?
                    player.indicators.vertice.fj - 1 : player.indicators.vertice.fj
                var newfi = player.indicators.vertice.fi == 10 ? 0 : player.indicators.vertice.fi == 9 ? 1 : player.indicators.vertice.fi + 2
                if (this.listPoints[newfi][newfj]) {
                    player.indicators.vertice.fi = newfi
                    player.indicators.vertice.fj = newfj
                }
            } else if (side == 'up') {
                var newfj = player.indicators.vertice.fi == 2 ?
                    player.indicators.vertice.fj - 1 : player.indicators.vertice.fi == 10 ?
                    player.indicators.vertice.fj + 1 : player.indicators.vertice.fj
                var newfi = player.indicators.vertice.fi == 0 ? 10 : player.indicators.vertice.fi == 1 ? 9 : player.indicators.vertice.fi - 2
                if (this.listPoints[newfi][newfj]) {
                    player.indicators.vertice.fi = newfi
                    player.indicators.vertice.fj = newfj
                }
            } else if (side == 'left') {
                var newfj = player.indicators.vertice.fi == 0 || player.indicators.vertice.fi == 10 ?
                    player.indicators.vertice.fj : player.indicators.vertice.fi == 9 ?
                    player.indicators.vertice.fj - 1 : player.indicators.vertice.fi % 2 == 0 ?
                    player.indicators.vertice.fj - 1 : player.indicators.vertice.fj
                var newfi = player.indicators.vertice.fi == 10 ? 0 : player.indicators.vertice.fi + 1
                if (this.listPoints[newfi][newfj]) {
                    player.indicators.vertice.fi = newfi
                    player.indicators.vertice.fj = newfj
                }
            } else if (side == 'right') {
                var newfj = player.indicators.vertice.fi == 0 ?
                    player.indicators.vertice.fj + 1 : player.indicators.vertice.fi == 9 || player.indicators.vertice.fi == 10 ?
                    player.indicators.vertice.fj : player.indicators.vertice.fi % 2 == 0 ?
                    player.indicators.vertice.fj : player.indicators.vertice.fj + 1
                var newfi = player.indicators.vertice.fi == 10 ? 0 : player.indicators.vertice.fi + 1
                if (this.listPoints[newfi][newfj]) {
                    player.indicators.vertice.fi = newfi
                    player.indicators.vertice.fj = newfj
                }
            }
        },
        moveArista: function (player, side) {
            if (side == 'down') {
                var newfj = player.indicators.arista.fi == 0 ?
                    player.indicators.arista.fj + 1 : player.indicators.arista.fi == 8 ?
                    player.indicators.arista.fj - 1 : player.indicators.arista.fj
                var newfi = player.indicators.arista.fi == 9 ? 0 : player.indicators.arista.fi + 1
                if (this.listAristas[newfi][newfj]) {
                    player.indicators.arista.fi = newfi
                    player.indicators.arista.fj = newfj
                }
            } else if (side == 'up') {
                var newfj = player.indicators.arista.fi == 1 ?
                    player.indicators.arista.fj - 1 : player.indicators.arista.fi == 9 ?
                    player.indicators.arista.fj + 1 : player.indicators.arista.fj
                var newfi = player.indicators.arista.fi == 0 ? 9 : player.indicators.arista.fi - 1
                if (this.listAristas[newfi][newfj]) {
                    player.indicators.arista.fi = newfi
                    player.indicators.arista.fj = newfj
                }
            } else if (side == 'left') {
                var newfj = player.indicators.arista.fj - 1
                var newfi = player.indicators.arista.fi
                if (this.listAristas[newfi][newfj]) {
                    player.indicators.arista.fi = newfi
                    player.indicators.arista.fj = newfj
                }
            } else if (side == 'right') {
                var newfj = player.indicators.arista.fj + 1
                var newfi = player.indicators.arista.fi
                if (this.listAristas[newfi][newfj]) {
                    player.indicators.arista.fi = newfi
                    player.indicators.arista.fj = newfj
                }
            }
        },
        moveRombo: function (player, side) {
            if (side == 'down') {
                var newfj = player.indicators.rombo.fj
                var newfi = player.indicators.rombo.fi == 8 ? 0 : player.indicators.rombo.fi == 7 ? 1 : player.indicators.rombo.fi + 2
                if (this.listRombos[newfi][newfj]) {
                    player.indicators.rombo.fi = newfi
                    player.indicators.rombo.fj = newfj
                }

            } else if (side == 'up') {
                var newfj = player.indicators.rombo.fj
                var newfi = player.indicators.rombo.fi == 0 ? 8 : player.indicators.rombo.fi == 1 ? 7 : player.indicators.rombo.fi - 2
                if (this.listRombos[newfi][newfj]) {
                    player.indicators.rombo.fi = newfi
                    player.indicators.rombo.fj = newfj
                }
            } else if (side == 'left') {
                var newfj = player.indicators.rombo.fi % 2 == 0 ? player.indicators.rombo.fj : player.indicators.rombo.fj - 1
                var newfi = player.indicators.rombo.fi == 8 ? 0 : player.indicators.rombo.fi + 1
                if (this.listRombos[newfi][newfj]) {
                    player.indicators.rombo.fi = newfi
                    player.indicators.rombo.fj = newfj
                }
            } else if (side == 'right') {
                var newfj = player.indicators.rombo.fi % 2 == 0 ? player.indicators.rombo.fj + 1 : player.indicators.rombo.fj
                var newfi = player.indicators.rombo.fi == 8 ? 0 : player.indicators.rombo.fi + 1
                if (this.listRombos[newfi][newfj]) {
                    player.indicators.rombo.fi = newfi
                    player.indicators.rombo.fj = newfj
                }
            }
        },
        areValidate: function (listAround) {
            var result = {
                good: [],
                bad: []
            }
            for (var index = 0; index < listAround.length; index++) {
                if (this.listRombos[listAround[index].fi]) {
                    if (this.listRombos[listAround[index].fi][listAround[index].fj]) {
                        var rombo = this.listRombos[listAround[index].fi][listAround[index].fj]
                        if (rombo.resource.type !== 'dessert') {

                            result.good.push(index)
                        } else {
                            result.bad.push(index)
                        }
                    } else {
                        result.bad.push(index)
                    }
                } else {
                    result.bad.push(index)
                }
            }
            return result
        },
        getResources: function (fi, fj, back) {

            var listAround = this.listPoints[fi][fj].getAround()
            var result = this.areValidate(listAround)

            if (result.good.length < 4) {

                this.ruleta = {
                    type: "pre-asign"
                }
                var listresources = {}
                for (var index = 0; index < listAround.length; index++) {
                    if (this.listRombos[listAround[index].fi]) {
                        if (this.listRombos[listAround[index].fi][listAround[index].fj]) {
                            var rombo = this.listRombos[listAround[index].fi][listAround[index].fj]
                            var canPass = true
                            result.bad.map(function (item) {
                                if (item == index) {
                                    canPass = false
                                }
                            })
                            if (rombo.resource.type !== 'dessert' && canPass) {
                                if (listresources[rombo.resource.type]) {
                                    listresources[rombo.resource.type] = listresources[rombo.resource.type] + 1
                                } else {
                                    listresources[rombo.resource.type] = 1
                                }
                            }
                        }
                    }
                }
                Entries(listresources).map(function (item) {
                    PlayersDetails[turnIndex].resources[item[0]] = PlayersDetails[turnIndex].resources[item[0]] + item[1]
                })

                var newMessage = {
                    player: PlayersDetails[turnIndex].name,
                    resource: Entries(listresources).map(function (item) {
                        return {
                            name: item[0],
                            amount: item[1]
                        }
                    })
                }
                sendMessageServer(
                    newMessage
                )
                //console.log(listresources)
                this.ruleta = null
                //console.log(turnIndex)
                if (back) {
                    BackTurno()
                } else {
                    console.log(turnIndex)
                    game.ChangeStatus("ROUND")
                    this.select = ''
                }
            } else {
                if (this.ruleta == null) {

                    this.ruleta = {
                        type: "run",
                        list: listAround,
                        index: Math.floor(Math.random() * 100) % 4,
                        tempo: 0,
                        pivot: 2
                    }
                } else {
                    if (this.ruleta.type == "asign") {
                        var listresources = {}
                        for (var index = 0; index < listAround.length; index++) {
                            if (this.listRombos[listAround[index].fi]) {
                                if (this.listRombos[listAround[index].fi][listAround[index].fj]) {
                                    var rombo = this.listRombos[listAround[index].fi][listAround[index].fj]
                                    if (rombo.resource.type !== 'dessert' && index != this.ruleta.index) {
                                        if (listresources[rombo.resource.type]) {
                                            listresources[rombo.resource.type] = listresources[rombo.resource.type] + 1
                                        } else {
                                            listresources[rombo.resource.type] = 1
                                        }
                                    }
                                }
                            }
                        }

                        Entries(listresources).map(function (item) {
                            PlayersDetails[turnIndex].resources[item[0]] = PlayersDetails[turnIndex].resources[item[0]] + item[1]
                        })
                        console.log(listresources)
                        var newMessage = {
                            player: PlayersDetails[turnIndex].name,
                            resource: Entries(listresources).map(function (item) {
                                return {
                                    name: item[0],
                                    amount: item[1]
                                }
                            })
                        }
                        sendMessageServer(
                            newMessage
                        )
                        this.ruleta = null

                        if (back) {
                            BackTurno()
                        } else {
                            game.ChangeStatus("ROUND")
                            this.select = ''
                        }
                    }
                }
            }
        },
        asignResources: function (val) {
            //var tabs = ["left", "right", "up", "down"]
            var response = this.findNumbers(val)
            var result = {}
            PlayersDetails.map(function (playerItem) {
                result[playerItem.name] = {}
            })
            //console.log(response)
            var listValidate = this.listPoints
            var elements = response.filter(function (item) {
                return listValidate[item.point.iIndex][item.point.jIndex].taken.toString() != '';
            })
            //console.log(eleme)
            elements.map(function (value) {

                if (result[PlayersDetails[parseInt(listValidate[value.point.iIndex][value.point.jIndex].taken)].name][value.resource.type]) {
                    result[PlayersDetails[parseInt(listValidate[value.point.iIndex][value.point.jIndex].taken)].name][value.resource.type] = result[PlayersDetails[parseInt(value.point.taken)].name][value.resource.type] + 1
                } else {
                    result[PlayersDetails[parseInt(listValidate[value.point.iIndex][value.point.jIndex].taken)].name][value.resource.type] = 1
                }
            })

            console.log(result)
            PaseTurno()
        },
        findNumbers: function (val) {
            var listOrigin = []
            var listRequest = []
            var tabs = ["left", "right", "up", "down"]
            this.listRombos.map(function (rombos) {
                rombos.map(function (rombo) {
                    if (rombo.number.tag == val) {
                        listOrigin.push(rombo)
                    }
                })
            })

            listOrigin.map(function (origin) {
                tabs.map(function (tab) {
                    listRequest.push({
                        resource: origin.resource,
                        point: origin.getPoint(tab)
                    })
                })
            })
            return listRequest;
        }

    }
}

function Dice() {
    return {
        value: [],
        show: true,
        execute: false,
        draw: function () {
            if (this.value.length > 0) {
                push()
                fill('white')
                rectMode(CENTER)
                var size = paddingLeft * 0.4
                rect(paddingLeft * 0.25, heightCanvas / 2, paddingLeft * 0.4, paddingLeft * 0.4, paddingLeft * 0.02)
                rect(paddingLeft * 0.70, heightCanvas / 2, paddingLeft * 0.4, paddingLeft * 0.4, paddingLeft * 0.02)
                this.drawPoints(this.value[0], true)
                this.drawPoints(this.value[1], false)
                pop()
            }
        },
        drawPoints: function (value, first) {
            var size = paddingLeft * 0.4
            var center = first ? paddingLeft * 0.25 : paddingLeft * 0.70
            if (value == 1) {
                fill('black')
                ellipse(center, heightCanvas / 2, size / 7)
            }
            if (value == 2) {
                fill('black')
                ellipse(center - size / 4, heightCanvas / 2 - size / 4, size / 7)
                ellipse(center + size / 4, heightCanvas / 2 + size / 4, size / 7)
            }
            if (value == 3) {
                fill('black')
                ellipse(center - size / 4, heightCanvas / 2 - size / 4, size / 7)
                ellipse(center + size / 4, heightCanvas / 2 + size / 4, size / 7)
                ellipse(center, heightCanvas / 2, size / 7)
            }
            if (value == 4) {
                fill('black')
                ellipse(center - size / 4, heightCanvas / 2 - size / 4, size / 7)
                ellipse(center + size / 4, heightCanvas / 2 + size / 4, size / 7)
                ellipse(center - size / 4, heightCanvas / 2 + size / 4, size / 7)
                ellipse(center + size / 4, heightCanvas / 2 - size / 4, size / 7)
            }
            if (value == 5) {
                fill('black')
                ellipse(center - size / 4, heightCanvas / 2 - size / 4, size / 7)
                ellipse(center + size / 4, heightCanvas / 2 + size / 4, size / 7)
                ellipse(center, heightCanvas / 2, size / 7)
                ellipse(center - size / 4, heightCanvas / 2 + size / 4, size / 7)
                ellipse(center + size / 4, heightCanvas / 2 - size / 4, size / 7)
            }
            if (value == 6) {
                fill('black')
                ellipse(center - size / 4, heightCanvas / 2 - size / 4, size / 7)
                ellipse(center + size / 4, heightCanvas / 2 + size / 4, size / 7)
                ellipse(center - size / 4, heightCanvas / 2, size / 7)
                ellipse(center + size / 4, heightCanvas / 2, size / 7)
                ellipse(center - size / 4, heightCanvas / 2 + size / 4, size / 7)
                ellipse(center + size / 4, heightCanvas / 2 - size / 4, size / 7)
            }
        },
        throwDice: function () {
            if (game.status == "ROUND") {
                this.value = [1 + Math.floor(Math.random() * 100) % 6, 1 + Math.floor(Math.random() * 100) % 6]
                mapa.asignResources(this.value[0] + this.value[1])
            }
        }
    }
}