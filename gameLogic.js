function myCompare(a,b){
    return a.priority - b.priority

}

function mtzCompare(mtz1, mtz2){
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if(mtz1[i][j] != mtz2[i][j]){
                return false;
            }
        }
    }

    return true;
}

function hasBetter(node, vetor){
    for (var i = 0; i < vetor.length; i++) {
        if(mtzCompare(node.grid, vetor[i].grid)){
            //console.log("ola?");
            if(node.priority >= vetor[i].priority){
                return true;
            }
        }
    }
    return false;
}

function Manhattan(mtz){
    var somat = 0;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if(mtz[i][j] != 0){
                var temp = mtz[i][j] - 1;
                var fi = int(temp/3);
                var fj = temp - (fi*3);

                somat += abs(fi - i) + abs(fj - j);
            }
        }
    }
    return somat;
}



class GameLogic{
    constructor(){
        this.grid = [[], [], []];
        this.i0 = 0;
        this.j0 = 0;
        this.moves = 0;

        this.f = 0;
        this.hfunc = 0;
        this.priority = 0;

        this.neighbors = undefined;
        this.previous = null;

    }

    /*myCompare(a,b){
        return a.priority - b.priority;
    }
*/
    initializeGrid(){
        var elements = [0,1,2,3,4,5,6,7,8];
        var mtz_rand = []
        //22 moves
        //this.grid = [[4,5,0],[8,6,1],[3,7,2]];
        var mtz1 = [[4,5,0],[8,6,1],[3,7,2]];
        var mtz2 = [[4,5,1],[8,6,2],[3,7,0]];
        var mtz3 = [[4,5,1],[8,6,2],[0,3,7]];
        var mtz4 = [[4,5,1],[6,0,2],[8,3,7]];
        var mtz5 = [[0,4,1],[6,5,2],[8,3,7]];
        var mtz6 = [[2,3,0],[1,5,6],[4,7,8]];
        var mtz7 = [[2,3,6],[1,5,8],[4,7,0]];
        var mtz8 = [[0,3,6],[2,5,8],[1,4,7]];
        var mtz9 = [[3,5,6],[2,0,8],[1,4,7]];

        mtz_rand.push(mtz1);
        mtz_rand.push(mtz2);
        mtz_rand.push(mtz3);
        mtz_rand.push(mtz4);
        mtz_rand.push(mtz5);
        mtz_rand.push(mtz6);
        mtz_rand.push(mtz7);
        mtz_rand.push(mtz8);
        mtz_rand.push(mtz9);

        var chosenIn = floor(random(mtz_rand.length));
        this.grid = mtz_rand[chosenIn];
        // muito easy
        //this.grid = [[2,3,0],[1,5,6],[4,7,8]];

        //28
        //this.grid = [[0,3,7],[8,6,2],[5,4,1]];

        for(let i = 0; i< 3; i++){
            for(let j = 0; j<3; j++){
                /*var chosenIndex = floor(random(elements.length));
                this.grid[i][j] = elements[chosenIndex];
                elements.splice(chosenIndex,1);*/
                if(this.grid[i][j] == 0){
                    this.i0 = i;
                    this.j0 = j;
                }
            }
        }
    }

    step(x, y) {
        console.log("i0 e j0 valem:" + this.i0 + ", " + this.j0)
       if (x > 0 && this.grid[x - 1][y] == 0) {
          this.swap(x - 1, y, x, y);
       }
       else if (y < 2 && this.grid[x][y + 1] == 0) {
         this.swap(x, y + 1, x, y);
       }
       else if (x < 2 && this.grid[x + 1][y] == 0) {
         this.swap(x + 1, y, x, y);
       }
       else if (y > 0 && this.grid[x][y - 1] == 0) {
         this.swap(x, y - 1, x, y);
       }
    }

    step2(xx) {
        var i0 = this.i0;
        var j0 = this.j0;
        //console.log("i0 e j0 valem: " + i0 + " , " + j0);
        switch(xx){
            case 2: //UP
                if(i0 != 2){
                    this.grid[i0][j0] = this.grid[i0+1][j0];
                    this.grid[i0+1][j0] = 0;
                    this.i0++;
                    this.moves++;
                }
                break;
            case 3: //RIGHT
                if(j0 != 0){
                    this.grid[i0][j0] = this.grid[i0][j0-1];
                    this.grid[i0][j0-1] = 0;
                    this.j0--;
                    this.moves++;
                }

                break;

            case 0: //DOWN
                if(i0 != 0){
                    this.grid[i0][j0] = this.grid[i0-1][j0];
                    this.grid[i0-1][j0] = 0;
                    this.i0--;
                    this.moves++;
                }

                break;

            case 1: //LEFT
                if(j0 != 2){
                    this.grid[i0][j0] = this.grid[i0][j0+1];
                    this.grid[i0][j0+1] = 0;
                    this.j0++;
                    this.moves++;
                }
                break;
        }

        return this.grid;
    }

    swap(x1, y1, x2, y2) {
       this.grid[x1][y1] = this.grid[x2][y2];
       this.grid[x2][y2] = 0;
    }

    getNeighbors(){
        if(!this.neighbors){
            populateNeighbors();
        }
        return this.neighbors;
    }

    getCord(){
        for(let i = 0; i< 3; i++){
            for(let j = 0; j<3; j++){
                if(this.grid[i][j] == 0){
                    this.i0 = i;
                    this.j0 = j;
                }
            }
        }
    }

    copyNode(node){
        for(let i = 0; i< 3; i++){
            for(let j = 0; j<3; j++){
                node.grid[i][j] = this.grid[i][j];
                if(this.grid[i][j] == 0){
                    node.i0 = i;
                    node.j0 = j;
                }
            }
        }
        node.moves = this.moves;

        node.f = this.f;
        node.hfunc = this.hfun;
        node.priority = this.priority;

        node.neighbors = this.neighbors;
        node.previous = this.previous;


    }

    populateNeighbors(){
        this.neighbors = [];


        //moves;
        for(var i = 0; i < 4; i++){
            var node = new GameLogic();
            //node.grid = this.grid;
            this.copyNode(node);
            node.previous = new GameLogic();
            this.copyNode(node.previous)
            //node.i0 = this.i0;
            //node.j0 = this.j0
            //node.getCord();
            //console.log("i0 e j0 valem: " + node.i0 + " , " + node.j0);
            var temp = node.moves;
            //console.log("temp vale " + temp);
            //console.table(node.grid);

            node.step2(i);
            //node.getCord();
            //console.log("moves vale " + node.moves);

            if(temp != node.moves){
                //console.table(node.grid);
                node.hfunc = Manhattan(node.grid);
                node.priority = node.hfunc + node.moves;

                this.neighbors.push(node);
                //console.table(node.previous.grid);
            }



        }
    }

    getNeighbors(){
        for(var i = 0; i < this.neighbors.length; i++){
            console.log(this.neighbors[i].grid);
        }
    }

    getFather(){
        for(var i = 0; i < this.neighbors.length; i++){
            console.log(this.neighbors[i].previous.grid);
        }
    }

    pathFinder(node){
        var path_array = [];
        while(node.previous != null){
            //console.table(node.grid);
            //coloca invertido
            path_array.unshift(node);
            node = node.previous;
        }
        //console.table(node.grid);
        path_array.unshift(node);


        return path_array;
    }

    Astar(node){
        //var openSet = SortedList.create();
        var openSet = [];
        var closedSet = [];

        var mtz = [[1,2,3],[4,5,6],[7,8,0]];
        openSet.push(node);
        var desce = 10;
        while(openSet.length > 0){
            openSet.sort(myCompare);

            var current = openSet[0];
            openSet.splice(0,1);
            //console.table(current.grid);
            //console.log("vizin " + current.moves);
            //console.log(openSet.length);
            //delay(10000);

            if(mtzCompare(current.grid, mtz)){
                console.log("aeeee fdp");
                console.log(current.moves);

                var temp_a = current.pathFinder(current);
                //console.table(temp_a[0].grid);
                /*for (var i = 0; i < temp_a.length; i++) {
                    console.table(temp_a[i].grid);
                }*/

                return temp_a;
            }

            //vizinhos
            current.populateNeighbors();
            for (var i = 0; i < current.neighbors.length; i++) {
                var cur_neighbor = current.neighbors[i];

                //console.table(cur_neighbor.grid);
                //console.log("vizin " + cur_neighbor.moves);

                if(!hasBetter(cur_neighbor, openSet) &&
                    !hasBetter(cur_neighbor, closedSet)){
                        openSet.push(cur_neighbor)
                        //console.log("chega aqui?");
                    }

            }
            //openSet.sort(myCompare);
            //console.table(openSet[0].grid);

            closedSet.push(cur_neighbor);
            closedSet.sort(myCompare);

            desce--;

        }

        return [];

    }


}
