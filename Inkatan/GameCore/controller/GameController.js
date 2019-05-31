function Game() {
    return {
        status: 'START',
        iterator: 1,
        pivot: 1,
        Game: function (obj, players) {
            if (this.status == "START") {
                this.START_PROCESS(obj, players)
            } else if (this.status == "ROUND") {
                this.ROUND_PROCESS()
            } else if (this.status == "KNIGHT") {
                this.KNIGHT_PROCESS()
            }

        },
        ChangeStatus: function (status) {
            this.status = status
        },
        START_PROCESS: function (obj, players) {
            if (this.iterator == 1) {
                obj.select = 'vertice'

                this.iterator = 2
            }
            if (this.iterator == 2) {
                if (players[turnIndex].houses.length == this.pivot) {
                    obj.changeSelect()
                    this.iterator = 3
                }
            }
            if (this.iterator == 3) {
                if (players[turnIndex].ways.length == this.pivot) {

                    if (turnIndex + 1 == players.length && this.pivot != 2) {
                        this.pivot = 2
                    } else {
                        if (this.pivot == 2) {
                            if (turnIndex == 0) {
                                obj.getResources(players[turnIndex].houses[1].iIndex, players[turnIndex].houses[1].jIndex, false)
                                //console.log(PlayersDetails)
                                //this.status = "DEAL"
                            } else {
                                obj.getResources(players[turnIndex].houses[1].iIndex, players[turnIndex].houses[1].jIndex, true)

                            }
                        } else {
                            PaseTurno()
                        }
                    }
                    this.iterator = 1
                }
            }
        },
        ROUND_PROCESS: function () {

        },
        KNIGHT_PROCESS: function () {
            mapa.select = "rombo"
        }
    }
}