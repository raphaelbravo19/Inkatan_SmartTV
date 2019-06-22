function Cards() {
    return {

        action: function (type, player) {
            if (type == card_names.GRAN_INCA) {
                this.gran_inca_action(player)
            } else if (type == card_names.AGRICULTOR) {
                this.agricultor_action(player)
            } else if (type == card_names.CURACA) {
                this.curaca_action(player)
            } else if (type == card_names.DIOS_DE_LOS_DADOS) {
                this.dios_de_los_dados_action(player)
            } else if (type == card_names.TUCUY) {
                this.tucuy_action(player)
            } else if (type == card_names.RUNA) {
                this.knight_action(player)
            } else if (type == card_names.MINERIA) {
                this.mineria_action(player)
            } else if (type == card_names.OBRERO) {
                this.obrero_action(player)
            }
        },
        gran_inca_action: function (player) {

            for (let i = 0; i < PlayersDetails.length; i++) {
                if (i != player) {
                    var cant = PlayersDetails[i].resources.gold > 2 ? 2 : PlayersDetails[i].resources.gold
                    PlayersDetails[i].resources.gold = PlayersDetails[i].resources.gold - cant
                    PlayersDetails[player].resources.gold = PlayersDetails[player].resources.gold + cant
                    var newMessage = {
                        player: PlayersDetails[i].name,
                        action:"resources",
                        resource: [{
                            name: 'gold',
                            amount: cant * -1
                        }]
                    }
                    var secondMessage = {
                        player: PlayersDetails[player].name,
                        action:"resources",
                        resource: [{
                            name: 'gold',
                            amount: cant
                        }]
                    }
                    sendMessageServer(
                        newMessage
                    )
                    sendMessageServer(
                        secondMessage
                    )
                }
            }
            console.log(PlayersDetails)
        },
        agricultor_action: function (player) {

            for (let i = 0; i < PlayersDetails.length; i++) {
                if (i != player) {
                    var cantPotato = PlayersDetails[i].resources.potato > 2 ? 2 : PlayersDetails[i].resources.potato
                    var cantQuinoa = cantPotato < 2 ? PlayersDetails[i].resources.quinoa > 2 - cantPotato ? 1 : PlayersDetails[i].resources.quinoa : 0
                    PlayersDetails[i].resources.potato = PlayersDetails[i].resources.potato - cantPotato
                    PlayersDetails[i].resources.quinoa = PlayersDetails[i].resources.quinoa - cantQuinoa
                    PlayersDetails[player].resources.potato = PlayersDetails[player].resources.potato + cantPotato
                    PlayersDetails[player].resources.quinoa = PlayersDetails[player].resources.quinoa + cantQuinoa
                    var newMessage = {
                        player: PlayersDetails[i].name,
                        action:"resources",
                        resource: [{
                            name: 'potato',
                            amount: cantPotato * -1
                        }, {
                            name: 'quinoa',
                            amount: cantQuinoa * -1
                        }]
                    }
                    var secondMessage = {
                        player: PlayersDetails[player].name,
                        action:"resources",
                        resource: [{
                            name: 'potato',
                            amount: cantPotato
                        }, {
                            name: 'quinoa',
                            amount: cantQuinoa
                        }]
                    }
                    sendMessageServer(
                        newMessage
                    )
                    sendMessageServer(
                        secondMessage
                    )
                }
            }
            console.log(PlayersDetails)
        },
        curaca_action: function (player) {

            for (let i = 0; i < PlayersDetails.length; i++) {
                if (i != player) {
                    var cant = PlayersDetails[i].resources.wood > 2 ? 2 : PlayersDetails[i].resources.wood
                    PlayersDetails[i].resources.wood = PlayersDetails[i].resources.wood - cant
                    PlayersDetails[player].resources.wood = PlayersDetails[player].resources.wood + cant
                    var newMessage = {
                        player: PlayersDetails[i].name,
                        action:"resources",
                        resource: [{
                            name: 'wood',
                            amount: cant * -1
                        }]
                    }
                    var secondMessage = {
                        player: PlayersDetails[player].name,
                        action:"resources",
                        resource: [{
                            name: 'wood',
                            amount: cant
                        }]
                    }
                    sendMessageServer(
                        newMessage
                    )
                    sendMessageServer(
                        secondMessage
                    )
                }
            }
            console.log(PlayersDetails)
        },
        dios_de_los_dados_action: function (player) {


            console.log(PlayersDetails)
        },
        tucuy_action: function (player) {
            game.data = {
                cant: 2,
                actualData: PlayersDetails[player].ways.length,
                index: player
            }
            console.log(game.data)
            game.ChangeStatus("CARD")
        },
        knight_action: function (player) {
            console.log(player)
            var newMessage = {
                player: PlayersDetails[turnIndex].name,
                action: "knight"
            }
            sendMessageServer(
                newMessage
            )
            game.ChangeStatus('KNIGHT')
            PlayersDetails[turnIndex].indicators.rombo.fi = mapa.knight.iIndex
            PlayersDetails[turnIndex].indicators.rombo.fj = mapa.knight.jIndex
        },
        mineria_action: function (player) {
            var cant = {}
            PlayersDetails[turnIndex].houses.map(function(item){
                var listAdj=item.getAround()
                listAdj.map(function(around){
                    if(mapa.listRombos[around.fi]!=null){
                        if(mapa.listRombos[around.fi][around.fj]!=null){
                            if(mapa.listRombos[around.fi][around.fj].resource.type=="stone"){
                                cant[mapa.listRombos[around.fi][around.fj].id]=true
                            }
                        }
                    }
                })
            })
            console.log(cant)
            console.log(Entries(cant).length)
            var newMessage = {
                player: PlayersDetails[turnIndex].name,
                action:"resources",
                resource: [{
                    name: 'stone',
                    amount: Entries(cant).length
                }]
            }
            sendMessageServer(
                newMessage
            )
            /*var newMessage = {
                player: PlayersDetails[player].name,
                action: "knight"
            }
            sendMessageServer(
                newMessage
            )
            game.ChangeStatus('KNIGHT')
            PlayersDetails[player].indicators.rombo.fi = mapa.knight.iIndex
            PlayersDetails[player].indicators.rombo.fj = mapa.knight.jIndex*/
        },
        obrero_action:function (player) {
            SetBuildMode({
                player:PlayersDetails[turnIndex].name,
                type:'h',
                amount:1
            })
            /*var newMessage = {
                player: PlayersDetails[player].name,
                action: "knight"
            }
            sendMessageServer(
                newMessage
            )
            game.ChangeStatus('KNIGHT')
            PlayersDetails[player].indicators.rombo.fi = mapa.knight.iIndex
            PlayersDetails[player].indicators.rombo.fj = mapa.knight.jIndex*/
        },

    }
}