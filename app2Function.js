let points = 12;

/**
 * Searches an array for a given subarray, then removes it from the result.
 * @param {array} check 
 * @param {array} array 
 * @returns 2d Array
 */
const removeElement = (check,array) => {
    let conc = check.reduce((a,b) => `${a+'|'+b}`);
    let result = [];
    for (let a = 0; a < array.length; a++) {
        if (array[a].reduce((x,y) => `${x+'|'+y}`) !== conc) {
            result.push(array[a]);
        }
    }
    return result;
}

document.addEventListener("DOMContentLoaded",() => {

function myCircle(diameter = 275) {
    let bx = 400;
    let by = 400;
    this.selection = [];
    this.lineCoords = [];
    let draw = SVG().addTo("#drawing").size(bx,by);
    this.radius = diameter/2;
    this.center = [bx/2,by/2];
        let numPoints = points;
        let polyline = draw.polyline().fill('green').stroke({ width: 1 });  //Need to find the correct scope for this.   
        for (let a = 0; a < numPoints; a++) {
            let theta = (-Math.PI/2)+(2*Math.PI*a)/numPoints;   //-Math.PI/2 == start angle 12 o'clock.
            let x = this.center[0]+this.radius*Math.cos(theta);
            let y = this.center[1]+this.radius*Math.sin(theta);
            let elem = draw.circle(20,20).fill('gray').center(x,y);
            let count = 0;
            elem.click(() => {  //Event listener for each elem.
                count++;
                if (count % 2 == 0) {
                    elem.fill('gray');
                    this.selection = this.selection.filter(z => z !== a);   //Removes element a from the list if clicked n % 2 times.
                    this.lineCoords = removeElement([x,y],this.lineCoords); //This works!
                }
                else {
                    elem.fill('black');
                    this.lineCoords.push([x,y]);    //Selected element.
                    this.selection.push(a);
                }
                console.log(this.lineCoords);
                display.innerHTML = `Set: [${this.selection}]`;
                polyline.plot(this.lineCoords);
            });
        }
    };

let F = new myCircle(300);
});



