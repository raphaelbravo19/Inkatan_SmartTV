function Mapa(){
    this.listRombos=[]
    this.listPoints=[]
    this.listAristas=[]
    this.altura= 9
    this.select='arista'
    this.resources= new Resources()
    this.numbers= new Numbers()
    this.setup= function(){
        
        for (var i = 0; i < this.altura; i++) {
            var padd=(i%2==0?radio:0)+radio
            for (var j = 0; j < (i%2==0?5:6); j++) {
                var origen=new Vertice(i,j,paddingLeft+padd+(radio*2*j),paddingHeight+radio+(radio*i))
                var resource= this.resources.getRandom()
                var number= resource.name=='desierto'?{tag:7}:this.numbers.getRandom()
                var rombo = new Rombo(origen, resource,number)
                this.setSides(rombo)

                this.listRombos.push(rombo)
            }
        }
    }
    this.setSides=function(rombo){
        this.addPoint(rombo.getPoint('up'))
        this.addPoint(rombo.getPoint('right'))
        this.addPoint(rombo.getPoint('down'))
        this.addPoint(rombo.getPoint('left'))
        this.addArista(rombo.getArista(1))
        this.addArista(rombo.getArista(2))
        this.addArista(rombo.getArista(3))
        this.addArista(rombo.getArista(4))
    }
    this.addPoint=function(point){
        if(this.listPoints[point.iIndex]){
            
        }else{
            this.listPoints[point.iIndex]=[]
        }
        if(!this.listPoints[point.iIndex][point.jIndex]){
            this.listPoints[point.iIndex][point.jIndex]=point
        }
        
    }
    this.addArista=function(arista){
        if(this.listAristas[arista.iIndex]){
            
        }else{
            this.listAristas[arista.iIndex]=[]
        }
        if(!this.listAristas[arista.iIndex][arista.jIndex]){
            this.listAristas[arista.iIndex][arista.jIndex]=arista
        }
    }
    this.printPoint=function(i,j){
        this.listPoints[i][j].draw()
    }
    this.printArista=function(i,j){
        this.listAristas[i][j].draw()
    }
    this.printRombo=function(i,j){
        this.listRombos.filter(function(rombo){return rombo.origin.iIndex==i&&rombo.origin.jIndex==j})[0].drawActive()
    }
    this.printAll = function(){
        this.listRombos.map(function(rombo){
            rombo.draw()
        })
        /* this.listPoints.map(function(points){
            points.map(function(point){
                point.draw()
            })
        })  */
        /* this.listAristas.map(function(aristas){
            aristas.map(function(arista){
                arista.draw()
            })
        })  */ 
    }
    this.move = function(player,side){
        if(this.select=='vertice'){
            this.moveVertice(player,side)
        }
        if(this.select=='arista'){
            this.moveArista(player,side)
        }
        if(this.select=='rombo'){
            this.moveRombo(player,side)
        }
    }
    this.moveVertice=function(player,side){
        if(side=='down'){
            var newfj = player.indicators.vertice.fi==0?
            player.indicators.vertice.fj+1:player.indicators.vertice.fi==8?
            player.indicators.vertice.fj-1:player.indicators.vertice.fj
            var newfi = player.indicators.vertice.fi==10?0:player.indicators.vertice.fi==9?1:player.indicators.vertice.fi+2
            if(this.listPoints[newfi][newfj]){
                player.indicators.vertice.fi=newfi
                player.indicators.vertice.fj=newfj
            }
        }else if (side=='up'){
            var newfj = player.indicators.vertice.fi==2?
            player.indicators.vertice.fj-1:player.indicators.vertice.fi==10?
            player.indicators.vertice.fj+1:player.indicators.vertice.fj
            var newfi = player.indicators.vertice.fi==0?10:player.indicators.vertice.fi==1?9:player.indicators.vertice.fi-2
            if(this.listPoints[newfi][newfj]){
                player.indicators.vertice.fi=newfi
                player.indicators.vertice.fj=newfj
            }
        }else if (side=='left'){
            var newfj = player.indicators.vertice.fi==0||player.indicators.vertice.fi==10?
            player.indicators.vertice.fj:player.indicators.vertice.fi==9?
            player.indicators.vertice.fj-1:player.indicators.vertice.fi%2==0?
            player.indicators.vertice.fj-1:player.indicators.vertice.fj
            var newfi = player.indicators.vertice.fi==10?0:player.indicators.vertice.fi+1
            if(this.listPoints[newfi][newfj]){
                player.indicators.vertice.fi=newfi
                player.indicators.vertice.fj=newfj
            }
        }else if (side=='right'){
            var newfj = player.indicators.vertice.fi==0?
            player.indicators.vertice.fj+1:player.indicators.vertice.fi==9||player.indicators.vertice.fi==10?
            player.indicators.vertice.fj:player.indicators.vertice.fi%2==0?
            player.indicators.vertice.fj:player.indicators.vertice.fj+1
            var newfi = player.indicators.vertice.fi==10?0:player.indicators.vertice.fi+1
            if(this.listPoints[newfi][newfj]){
                player.indicators.vertice.fi=newfi
                player.indicators.vertice.fj=newfj
            }
        }
    }
    this.moveArista=function(player,side){
        if(side=='down'){
            var newfj = player.indicators.arista.fi==0?
            player.indicators.arista.fj+1:player.indicators.arista.fi==8?
            player.indicators.arista.fj-1:player.indicators.arista.fj
            var newfi = player.indicators.arista.fi==9?0:player.indicators.arista.fi+1
            if(this.listAristas[newfi][newfj]){
                player.indicators.arista.fi=newfi
                player.indicators.arista.fj=newfj
            }
        }else if (side=='up'){
            var newfj = player.indicators.arista.fi==1?
            player.indicators.arista.fj-1:player.indicators.arista.fi==9?
            player.indicators.arista.fj+1:player.indicators.arista.fj
            var newfi = player.indicators.arista.fi==0?9:player.indicators.arista.fi-1
            if(this.listAristas[newfi][newfj]){
                player.indicators.arista.fi=newfi
                player.indicators.arista.fj=newfj
            }
        }else if (side=='left'){
            var newfj = player.indicators.arista.fj-1
            var newfi = player.indicators.arista.fi
            if(this.listAristas[newfi][newfj]){
                player.indicators.arista.fi=newfi
                player.indicators.arista.fj=newfj
            }
        }else if (side=='right'){
            var newfj = player.indicators.arista.fj+1
            var newfi = player.indicators.arista.fi
            if(this.listAristas[newfi][newfj]){
                player.indicators.arista.fi=newfi
                player.indicators.arista.fj=newfj
            }
        }
    }
    this.moveRombo=function(player,side){
        if(side=='down'){
            var newfj = player.indicators.rombo.fj
            var newfi = player.indicators.rombo.fi==8?0:player.indicators.rombo.fi==7?1:player.indicators.rombo.fi+2
            if(this.listRombos.filter(function(rombo){return rombo.origin.iIndex==newfi&&rombo.origin.jIndex==newfj}).length>0){
                player.indicators.rombo.fi=newfi
                player.indicators.rombo.fj=newfj
            }
            
        }else if (side=='up'){
            var newfj = player.indicators.rombo.fj
            var newfi = player.indicators.rombo.fi==0?8:player.indicators.rombo.fi==1?7:player.indicators.rombo.fi-2
            if(this.listRombos.filter(function(rombo){return rombo.origin.iIndex==newfi&&rombo.origin.jIndex==newfj}).length>0){
                player.indicators.rombo.fi=newfi
                player.indicators.rombo.fj=newfj
            }
        }else if (side=='left'){
            var newfj = player.indicators.rombo.fi%2==0?player.indicators.rombo.fj:player.indicators.rombo.fj-1
            var newfi = player.indicators.rombo.fi==8?0:player.indicators.rombo.fi+1
            if(this.listRombos.filter(function(rombo){return rombo.origin.iIndex==newfi&&rombo.origin.jIndex==newfj}).length>0){
                player.indicators.rombo.fi=newfi
                player.indicators.rombo.fj=newfj
            }
        }else if (side=='right'){
            var newfj = player.indicators.rombo.fi%2==0?player.indicators.rombo.fj+1:player.indicators.rombo.fj
            var newfi = player.indicators.rombo.fi==8?0:player.indicators.rombo.fi+1
            if(this.listRombos.filter(function(rombo){return rombo.origin.iIndex==newfi&&rombo.origin.jIndex==newfj}).length>0){
                player.indicators.rombo.fi=newfi
                player.indicators.rombo.fj=newfj
            }
        }
    }
    
}

function Vertice(iIndex,jIndex,posx,posy){
    this.iIndex=iIndex
    this.jIndex=jIndex
    this.posx=posx
    this.posy=posy
    
    this.draw = function(){
        push()
        stroke('rgba(255,255,255,0.5)')
        strokeWeight(radio*0.05)
        fill(PlayersDetails[turnIndex].color)
        
        ellipse(this.posx, this.posy, radio*0.35,radio*0.35)
        
        pop()
    }
}
function Arista(iIndex,jIndex,start,end){
    this.iIndex=iIndex
    this.jIndex=jIndex
    this.start=start
    this.end=end
    
    this.draw = function(){
        //ellipse(this.posx, this.posy, 50,10)
        fill(PlayersDetails[turnIndex].color)
    
        var angulo = Math.atan((this.start.posy - this.end.posy) / (this.start.posx - this.end.posx))
        push()
        stroke('rgba(255,255,255,0.5)')
        strokeWeight(radio*0.02)
        translate((this.start.posx+this.end.posx)/2,(this.start.posy+this.end.posy)/2)
        rotate(angulo)
        //console.log(ind, ind2)
        //line(objLine[0].posx, objLine[0].posy, objLine[1].posx, objLine[1].posy)
        //text(angulo, (objLine[0].posx + objLine[1].posx) / 2, (objLine[0].posy + objLine[1].posy) / 2)
        rectMode(CENTER)
        rect(0,0 , radio*0.8, radio*0.2,3,3,3,3)
        //image(img,-sideTriangle*0.6/2, -15, sideTriangle*0.6, 30)
        pop()
        textAlign(CENTER, CENTER)
        fill('black')

        //text(this.iIndex+'-'+this.jIndex,(this.start.posx+this.end.posx)/2,(this.start.posy+this.end.posy)/2)
    }
}
function Rombo(origin,resource,number){
    this.origin=origin
    this.resource=resource
    this.number=number
    this.getPoint=function(side){
        switch(side){
            case 'left': 
                return new Vertice(this.origin.iIndex+1,this.origin.jIndex,this.origin.posx-radio, this.origin.posy)
            case 'down':
                return new Vertice(this.origin.iIndex+2,this.origin.iIndex%2==0&&this.origin.iIndex<8?this.origin.jIndex+1:this.origin.jIndex,this.origin.posx, this.origin.posy+radio)
            case 'right':
                return new Vertice(this.origin.iIndex+1,this.origin.jIndex+1,this.origin.posx+radio, this.origin.posy)
            case 'up':
                return new Vertice(this.origin.iIndex,this.origin.jIndex,this.origin.posx, this.origin.posy-radio)
        }
    }
    this.getArista=function(side){
        switch(side){
            case 1: 
                return new Arista(this.origin.iIndex,this.origin.iIndex==0||this.origin.iIndex%2==1?this.origin.jIndex*2:(this.origin.jIndex*2)+1,this.getPoint('up'),this.getPoint('left'))
            case 2:
                return new Arista(this.origin.iIndex,this.origin.iIndex==0||this.origin.iIndex%2==1?this.origin.jIndex*2+1:this.origin.jIndex*2+2,this.getPoint('right'),this.getPoint('up'))
            case 3:
                return new Arista(this.origin.iIndex+1,this.origin.iIndex==8||this.origin.iIndex%2==1?this.origin.jIndex*2:(this.origin.jIndex*2)+1,this.getPoint('left'),this.getPoint('down'))
            case 4:
                return new Arista(this.origin.iIndex+1,this.origin.iIndex==8||this.origin.iIndex%2==1?this.origin.jIndex*2+1:this.origin.jIndex*2+2,this.getPoint('down'),this.getPoint('right'))
        }
    }
    this.draw=function(){
        image(this.resource.icon, this.origin.posx-radio, this.origin.posy-radio, 2*radio, 2*radio)
        fill(this.resource?this.resource.color:'black')
        
        quad(   this.origin.posx-radio, this.origin.posy,
                this.origin.posx, this.origin.posy+radio, 
                this.origin.posx+radio, this.origin.posy,
                this.origin.posx, this.origin.posy-radio)
        
        
        textAlign(CENTER, CENTER)
        fill('black')
        fill('rgba(0,0,0,0.4)')
        ellipse(this.origin.posx + (radio * 0.025), this.origin.posy + (radio * 0.025), radio * 0.4, radio * 0.4)
        fill('lightgrey')
        stroke('rgba(0,0,0,0.7)')
        ellipse(this.origin.posx , this.origin.posy , radio * 0.4, radio * 0.4)
        fill('black')
        textSize((radio  * 0.25));
        text(this.number.tag,this.origin.posx,this.origin.posy)
        //this.origin.draw()
        //origin.draw()
    }
    this.drawActive=function(){
        fill(PlayersDetails[turnIndex].color)
        quad(   this.origin.posx-radio, this.origin.posy,
                this.origin.posx, this.origin.posy+radio, 
                this.origin.posx+radio, this.origin.posy,
                this.origin.posx, this.origin.posy-radio)
        
        
        //origin.draw()
    }
}