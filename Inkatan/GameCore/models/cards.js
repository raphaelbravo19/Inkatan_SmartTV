function Cards() {
    return {

        action: function (type, player) {
            if (type == "GRAN_INCA") {
                this.gran_inca_action(player)
            }
        },
        gran_inca_action: function (player) {

            for (let i = 0; i < PlayersDetails.length; i++) {
                if (i != player) {
                    var cant = PlayersDetails[i].resources.gold > 2 ? 2 : PlayersDetails[i].resources.gold
                    PlayersDetails[i].resources.gold = PlayersDetails[i].resources.gold - 1
                    PlayersDetails[player].resources.gold = PlayersDetails[player].resources.gold + cant
                }
            }
        }
    }
}