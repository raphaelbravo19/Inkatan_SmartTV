let pointsMap = [
    [false],
    [false, false],
    [false, false, false],
    [false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false],
    [false, false, false],
    [false, false],
    [false],
];
let widthCanvas = $(window).width() * 0.7;
let heightCanvas = $(window).height();

function setup() {
    var canvas = createCanvas(widthCanvas, heightCanvas);
    canvas.parent('#canvas')
    let mapDelimit = widthCanvas * 0.9
    let hTriangle = mapDelimit / 10
    let sideTriangle = hTriangle * 2 / Math.sqrt(3)
    strokeWeight(2)
    background(50)
    for (let i = 0; i < pointsMap.length; i++) {
        for (let j = 0; j < pointsMap[i].length; j++) {
            //if (pointsMap[i].length % 2 != 0) {
            let pivotTem = (pointsMap[i].length + 1) / 2
            let eje1x = (widthCanvas * 0.05) + (i * hTriangle)
            let eje1y = (heightCanvas / 2) - ((pivotTem - j - 1) * sideTriangle)
            let eje2x = i >= 5 ? eje1x + hTriangle : eje1x + hTriangle
            let eje2y = i >= 5 ? eje1y + sideTriangle / 2 : eje1y - sideTriangle / 2
            let eje3x = i >= 5 ? eje1x : eje1x + hTriangle
            let eje3y = i >= 5 ? eje1y + sideTriangle : eje1y + sideTriangle / 2
            if (i < 5 || i >= 5 && j + 1 < pointsMap[i].length) {
                triangle(eje1x, eje1y, eje2x, eje2y, eje3x, eje3y)
            }

            //}else{

            //}

        }
    }
}

function draw() {
    //ellipse(10, 10, 2, 2)
    //point(x, y)
}