var Draw = {
    CELL: 60,
    LINE: 2,
    ATOM: 7,
    _context: null
};

/* výroba canvasu a jeho příprava*/

Draw.init = function() {
    var canvas = document.createElement("canvas");

    this.CELL += this.LINE;

    var size = Game.SIZE * this.CELL + this.LINE;
    canvas.width = size;
    canvas.height = size;

    this._context = canvas.getContext("2d");
    this._context.lineWidth = this.LINE;

    document.body.appendChild(canvas);

    this.all();
}
/* Vykreslit celou hrací plochu */
Draw.all = function() {
    this._context.fillStyle = "#fff";
    var width = this._context.canvas.width;
    var height = this._context.canvas.height;

    this._context.fillRect(0, 0, width, height);

    this._lines();
    this._cells();
}

/* vykreslit mřížku */
Draw._lines = function() {
    this._context?.beginPath();

    for (var i=0; i<Game.SIZE+1; i++) { //svislé
        var x = this.LINE/2 + i*this.CELL;
    this._context.moveTo(x, 0);
    this._context.lineTo(x, this._context.canvas.height);
    }
    for (var i=0; i<Game.SIZE+1; i++) {// vodorovné
        var y = this.LINE/2 + i*this.CELL;
    this._context.moveTo(0, y);
    this._context.lineTo(this._context.canvas.width, y);
    }
   this._context.stroke();
}

/* vykreslit buňky s atomy */
Draw._cells = function() {
    for (var i=0; i<Game.SIZE; i++) {
        for (var j=0; j<Game.SIZE; j++) {
            this._cell(i, j, Board[i][j]);
        }
    }
}

/*Vykreslit jednu buňku */
Dra._cell = function(x, y, count) {
    x *= this.CELL;
    y *= this.CELL;
    switch (count) {
        case 1:
            this._atom(x + this.CELL/2, y + this.CELL/2);
            break;

        case 2:
            this._atom(x + this.CELL/4, y + this.CELL/4);
            this._atom(x + this.CELL*3/4, y + this.CELL*3/4);
            break;

        case 3:
            this._atom(x + this.CELL/2, y + this.CELL/2);
            this._atom(x + this.CELL/4, y + this.CELL/4);
            this._atom(x + this.CELL*3/4, y + this.CELL*3/4);
            break;

        case 4:
            this._atom(x + this.CELL/4, y + this.CELL/4);
            this._atom(x + this.CELL*3/4, y + this.CELL*3/4);
            this._atom(x + this.CELL/4, y + this.CELL*3/4);
            this._atom(x + this.CELL*3/4, y + this.CELL/4);
            break;
    }
}

/*Vykreslit jeden atom*/
Draw._atom = function(x, y) {
    this._context?.beginPath();

    this._context.moveTo(x+this.ATOM, y);
    this._context.arc(x, y, this.ATOM, 0, 2*Math.PI, false);

    this._context.fillStyle = "blue";
    this._context.fill();
    this._context.stroke();
}

/*Převod pozice kurzoru na souřadnice buňky*/
Dra.getPosition = function(cursorX, cursorY) {
    var rectangle = thi._context.canvas.getBoundingClientRect();

    cursorX -= rectangle.left;
    cursorY -= rectangle.top;

    if (cursorX < 0 || cursorX > rectangle.width) { return null; }
    if (cursorY < 0 || cursorY > rectangle.height) { return null; }

    var cellX = Math.floor(cursorX / this.CELL);
    var cellY = Math.floor(cursorY / this.CELL);
    return [cellX, cellY];
}

/*
Draw.all = function() {

    var html = "<table>";
    for (var i=0; i<Board.length; i++) {
        html += "<tr>";
        for (var j=0; j<Board[i].length; j++) {
            html += "<td>";
            html += Draw.atoms(Board[j][i]);
            html += "</td>"
        }
        html += "</tr>";
    }
    html += "</table>";

    document.body.innerHTML = html;
}

Draw.atoms = function(count) {
    var result = "";

    for (var i=0; i<count; i++) {
        result += "o";
    }

    return result;
}

Draw.getPosition = function(node) {
    if (node.nodeName != "TD") { return null; }

    var x = 0;
    while (node.previousSibling) {
        x++;
        node = node.previousSibling;
    }

    var row = node.parentNode;
    var y = 0;
    while (row.previousSibling) {
        y++;
        row = row.previousSibling;
    }

    return [x, y];
}
*/


