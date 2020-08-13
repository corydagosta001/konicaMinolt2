    class gameIntel {
        arrXY = new Array();
        arrGrid = new Array();
        arrDiag = new Array();
        arrGrid1 = new Array();
        arrDiag1 = new Array();
        arrEndNodes = new Array();
        start_node = new Array();
        end_node = new Array();
        phase = 0;
        playersMove = "Player 1";
        mMsg = "";
        EndNodeMessage = "";
        message = "";
        msg = "";
        boolOnce = false;
        x;
        y;
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        setStart_node(x, y) {
            this.start_node[0] = new Array();
            this.start_node[0][0] = x;
            this.start_node[0][1] = y;
        }

        setEnd_node(x, y) {
            this.end_node[0] = new Array();
            this.end_node[0][0] = x;
            this.end_node[0][1] = y;
        }

        record_endNodes() {
            if (this.arrEndNodes.length == 0) {
                this.arrEndNodes[this.arrEndNodes.length] = new Array();
                this.arrEndNodes[this.arrEndNodes.length - 1][0] = this.start_node[0][0];
                this.arrEndNodes[this.arrEndNodes.length - 1][1] = this.start_node[0][1];
                this.arrEndNodes[this.arrEndNodes.length] = new Array();
                this.arrEndNodes[this.arrEndNodes.length - 1][0] = this.end_node[0][0];
                this.arrEndNodes[this.arrEndNodes.length - 1][1] = this.end_node[0][1];
            }
            else {
                this.update_endNodes();
            }
        }

        update_endNodes() {
            for (var a = 0; a < this.arrEndNodes.length; a++) {
                if (this.start_node[0][0] == this.arrEndNodes[a][0] && this.start_node[0][1] == this.arrEndNodes[a][1]) {
                    this.arrEndNodes[a][0] = this.end_node[0][0];
                    this.arrEndNodes[a][1] = this.end_node[0][1];
                }
            }
        }

        fillArrXY(x, y) {
            this.arrXY[this.arrXY.length] = new Array();
            this.arrXY[this.arrXY.length - 1][0] = x;
            this.arrXY[this.arrXY.length - 1][1] = y;
        }

        init_arrGrid() {
            for (var y = 0; y < this.y; y++) {
                for (var x = 0; x < this.x; x++) {
                    this.arrGrid[this.arrGrid.length] = new Array();
                    this.arrGrid[this.arrGrid.length - 1][0] = x;
                    this.arrGrid[this.arrGrid.length - 1][1] = y
                }
            }
        }

        init_arrGrid1() {
            for (var y = 0; y < this.y; y++) {
                for (var x = 0; x < this.x; x++) {
                    this.arrGrid1[this.arrGrid1.length] = new Array();
                    this.arrGrid1[this.arrGrid1.length - 1][0] = x;
                    this.arrGrid1[this.arrGrid1.length - 1][1] = y;
                    this.arrGrid1[this.arrGrid1.length - 1][2] = "available";
                }
            }
        }

        addTo_arrGrid1() {
            for (var a = 0; a < this.arrGrid1.length; a++) {
                if (this.arrGrid1[a][1] == this.start_node[0][1] && this.arrGrid1[a][0] == this.start_node[0][0]) {
                    this.arrGrid1[a][2] = "occupied";
                }
            }

            for (var a = 0; a < this.arrGrid1.length; a++) {
                if (this.arrGrid1[a][1] == this.end_node[0][1] && this.arrGrid1[a][0] == this.end_node[0][0]) {
                    this.arrGrid1[a][2] = "occupied";
                }
            }
        }

        splice_arrGrid() {
            for (var a = 0; a < this.arrGrid.length; a++) {
                if (this.arrGrid[a][0] == this.start_node[0][0] && this.arrGrid[a][1] == this.start_node[0][1]) {
                    this.arrGrid.splice(a, 1);
                }
            }

            for (var a = 0; a < this.arrGrid.length; a++) {
                if (this.arrGrid[a][0] == this.end_node[0][0] && this.arrGrid[a][1] == this.end_node[0][1]) {
                    this.arrGrid.splice(a, 1);
                }
            }

        }

        phaseTrack(p1) {
            if (this.msg.indexOf("INVALID") == -1) {
                if (this.phase == 2) {
                    this.phase = 0;
                }
                else {
                    this.phase++
                }
                if (p1 == true) {
                    this.switchPlayer();
                }
            }
        }

        switchPlayer() {
            if (this.playersMove == "Player 1") {
                this.playersMove = "Player 2";
            }
            else {
                this.playersMove = "Player 1";
            }
        }

        errorMsg() {
            var invalid_first_msg = "INVALID_START_NODE";
            var invalid_first_move_msg = "Not a valid starting position. Try again.";
            var invalid_second_move_msg = "Invalid move! Try again.";
            var invalid_second_msg = "INVALID_END_NODE";
            switch (this.phase) {
                case 0:
                    this.message = invalid_first_move_msg;
                    this.msg = invalid_first_msg;
                    break;
                case 1:
                    this.message = invalid_second_move_msg;
                    this.msg = invalid_second_msg;
                    break;
            }
        }

        checkForValidMove() {
            var validNode = false;
            var NodeExists = 0;
            if (this.phase == 0) {
                if (this.start_node[0][0] != this.end_node[0][0] || this.start_node[0][1] != this.end_node[0][1]) {
                    validNode = this.validStart();
                }
                else {
                    validNode = true;
                }
            }
            if (this.phase == 1) {
                if (this.start_node[0][0] == this.end_node[0][0] || this.end_node[0][0] == this.start_node[0][0] + 1 || this.end_node[0][0] == this.start_node[0][0] - 1) {
                    if (this.start_node[0][1] == this.end_node[0][1] || this.end_node[0][1] == this.start_node[0][1] + 1 || this.end_node[0][1] == this.start_node[0][1] - 1) {
                        validNode = this.validEnd();
                        if (validNode == true) {
                            if (this.start_node[0][0] != this.end_node[0][0] && this.end_node[0][1] != this.start_node[0][1]) {
                                validNode = this.checkDiag(this.start_node[0][0], this.start_node[0][1], this.end_node[0][0], this.end_node[0][1]);
                            }
                        }
                    }
                }
            }
            return validNode;
        }

        checkDiag(sx, sy, ex, ey) {
            var validNode = true;
            var boolClear = true;
            var x1, y1, x2, y2;
            if (sx > ex && sy < ey) {
                x1 = sx - 1;
                y1 = sy;
                x2 = ex + 1;
                y2 = ey;
            }

            if (ex > sx && ey > sy) {
                x1 = sx + 1;
                y1 = sy;
                x2 = ex - 1;
                y2 = ey;
            }

            if (ex > sx && ey < sy) {
                x1 = sx + 1;
                y1 = sy;
                x2 = ex - 1;
                y2 = ey;
            }

            if (ex < sx && ey < sy) {
                x1 = sx;
                y1 = sy - 1;
                x2 = ex;
                y2 = ey + 1;
            }

            for (var a = 0; a < this.arrDiag1.length; a++) 
            {
                if (this.arrDiag1[a][0] == y1 && this.arrDiag1[a][1] == x1 && this.arrDiag1[a][2] == y2 && this.arrDiag1[a][3] == x2 || this.arrDiag1[a][0] == y2 && this.arrDiag1[a][1] == x2 && this.arrDiag1[a][2] == y1 && this.arrDiag1[a][3] == x1)
                {
                    validNode = false;
                    boolClear = false;
                }
            }

            if (boolClear == true) {
                this.arrDiag1[this.arrDiag1.length] = new Array();
                this.arrDiag1[this.arrDiag1.length - 1][0] = sy;
                this.arrDiag1[this.arrDiag1.length - 1][1] = sx;
                this.arrDiag1[this.arrDiag1.length - 1][2] = ey;
                this.arrDiag1[this.arrDiag1.length - 1][3] = ex;
            }
            return validNode;
        }


        validStart() {
            var intCount = 0;
            for (var arrSub = 0; arrSub < this.arrXY.length; arrSub++) {
                if (this.arrXY[arrSub][0] == this.start_node[0][0] && this.arrXY[arrSub][1] == this.start_node[0][1]) {
                    intCount++;
                }
            }
            if (this.phase == 0 && intCount == 1) {
                return true;
            }
            else {
                return false;
            }
        }

        validEnd() {
            var intCount = 0;
            for (var arrSub = 0; arrSub < this.arrXY.length; arrSub++) {
                if (this.arrXY[arrSub][0] == this.end_node[0][0] && this.arrXY[arrSub][1] == this.end_node[0][1]) {
                    intCount++;
                }
            }
            if (intCount == 0) {
                return true;
            }
            else {
                return false;
            }
        }

        setPointsXY(x, y) {
            var valid_first_msg = "VALID_START_NODE";
            var valid_first_move_msg = "Select a second node to complete the line.";
            var invalid_first_move_msg = "Not a valid starting position. Try again.";
            var valid_second_move_msg = "VALID_END_NODE";
            var validMove = true;
            if (this.phase == 2) {
                this.phaseTrack(false);
            }

            if (this.phase == 0) {
                this.setStart_node(x, y);

                if (this.arrXY.length == 0) {
                    this.message = valid_first_move_msg;
                    this.msg = valid_first_msg;
                    this.init_arrGrid();
                    this.init_arrGrid1();
                }
                else {
                    if (!this.checkForValidMove()) {
                        this.errorMsg();
                        validMove = false;
                    }
                    else {
                        this.message = valid_first_move_msg;
                        this.msg = valid_first_move_msg;
                    }
                }
            }
            else {
                this.setEnd_node(x, y);
                if (!this.checkForValidMove()) {
                    this.errorMsg();
                    validMove = false;
                    this.phase = 0;
                }
                else {
                    this.message = valid_second_move_msg;
                    this.msg = valid_second_move_msg;
                    this.fillArrXY(x, y);
                    this.fillArrXY(this.start_node[0][0], this.start_node[0][1]);
                    this.addTo_arrGrid1();
                    this.record_endNodes();
                    this.splice_arrGrid();
                    this.phaseTrack(true);
                    this.mMsg = valid_second_move_msg;
                    this.EndNodeMessage = null;
                }
            }
        }

        createDiagCoordArray(x, y) {
            var t = new Array();
            return t;
        }


        creatOpposingCoordArray(x, y) {
            var t = new Array();
            return t;
        }

        creatOpposingCoordArray(x, y) {
            var OCArr = new Array();
            //****upper right
            OCArr[OCArr.length] = new Array();
            OCArr[OCArr.length - 1][0] = x;
            OCArr[OCArr.length - 1][1] = y - 1;
            OCArr[OCArr.length - 1][2] = x + 1;
            OCArr[OCArr.length - 1][3] = y;

            //****upper left
            OCArr[OCArr.length] = new Array();
            OCArr[OCArr.length - 1][0] = x;
            OCArr[OCArr.length - 1][1] = y - 1;
            OCArr[OCArr.length - 1][2] = x - 1;
            OCArr[OCArr.length - 1][3] = y;

            //****lower right
            OCArr[OCArr.length] = new Array();
            OCArr[OCArr.length - 1][0] = x + 1;
            OCArr[OCArr.length - 1][1] = y;
            OCArr[OCArr.length - 1][2] = x;
            OCArr[OCArr.length - 1][3] = y + 1;

            //****lower left
            OCArr[OCArr.length] = new Array();
            OCArr[OCArr.length - 1][0] = x - 1;
            OCArr[OCArr.length - 1][1] = y;
            OCArr[OCArr.length - 1][2] = x;
            OCArr[OCArr.length - 1][3] = y + 1;

            return OCArr;
        }

        createDiagCoordArray(x, y)
        {
            var coordArr = new Array();
            //****upper right
            coordArr[coordArr.length] = new Array();
            coordArr[coordArr.length - 1][0] = x + 1;
            coordArr[coordArr.length - 1][1] = y - 1;
            coordArr[coordArr.length - 1][2] = true;

            //****upper left
            coordArr[coordArr.length] = new Array();
            coordArr[coordArr.length - 1][0] = x - 1;
            coordArr[coordArr.length - 1][1] = y - 1;
            coordArr[coordArr.length - 1][2] = true;

            //****lower right
            coordArr[coordArr.length] = new Array();
            coordArr[coordArr.length - 1][0] = x + 1;
            coordArr[coordArr.length - 1][1] = y + 1;
            coordArr[coordArr.length - 1][2] = true;

            //****lower left
            coordArr[coordArr.length] = new Array();
            coordArr[coordArr.length - 1][0] = x - 1;
            coordArr[coordArr.length - 1][1] = y + 1;
            coordArr[coordArr.length - 1][2] = true;

            return coordArr;
        }

        checkLastMoveDiag()
        {
            var boolLastMove = true; 
            var coordArr;
            var OCArr;
            var boolPos1 = true;
            var boolPos2 = true; 
            var pos; 
            var boolStop = false;
            var boolSubStop = false;  
            

            for (var a = 0; a < this.arrEndNodes.length; a++)
            {
                coordArr = this.createDiagCoordArray(this.arrEndNodes[a][0], this.arrEndNodes[a][1]);
                OCArr = this.creatOpposingCoordArray(this.arrEndNodes[a][0], this.arrEndNodes[a][1]);  

                for(var b=0;b<coordArr.length;b++)
                {
                    for(var c=0;c<this.arrGrid1.length;c++)
                    {
                        boolPos1 = true;
                        boolPos2 = true;
                        if(coordArr[b][0] > -1 && coordArr[b][1] > -1 && coordArr[b][0] < this.y && coordArr[b][1] < this.y)
                        {
                            if(this.arrGrid1[c][0] == coordArr[b][0] && this.arrGrid1[c][1] == coordArr[b][1] && this.arrGrid1[c][2] == "occupied")
                            {
                                coordArr[b][2] = false;    
                            } 
                            else
                            {
                               if(OCArr[b][0] > -1 && OCArr[b][1] > -1 && OCArr[b][2] > -1 && OCArr[b][3] > -1 && OCArr[b][0] < this.y && OCArr[b][1] < this.y && OCArr[b][2] < this.y && OCArr[b][3] < this.y )                            
                               {
                                   for(var t=0;t<this.arrDiag1.length;t++)
                                   {
                                       if(OCArr[b][0] == this.arrDiag1[t][1] && OCArr[b][1] == this.arrDiag1[t][0] && OCArr[b][2] == this.arrDiag1[t][3] && OCArr[b][3] == this.arrDiag1[t][2]) 
                                       {
                                           coordArr[b][2] = false;      
                                       }
                                       if(OCArr[b][0] == this.arrDiag1[t][3] && OCArr[b][1] == this.arrDiag1[t][2] && OCArr[b][2] == this.arrDiag1[t][1] && OCArr[b][3] == this.arrDiag1[t][0]) 
                                       {
                                           coordArr[b][2] = false;      
                                       }        
                                   }
                               }
                               else
                               {
                                   coordArr[b][2] = false;
                               }

                           }
                       }
                       else
                       {
                           coordArr[b][2] = false;    
                       } 
                    }   
                }
                if (coordArr[0][2] == false && coordArr[1][2] == false && coordArr[2][2] == false && coordArr[3][2] == false)
                {
                    //*****continue looping
                }
                else
                {
                    boolStop = true;
                    a = this.arrEndNodes.length + 1;
                }  
             
            } 
            if(boolStop == true)
            {
            //    boolLastMove = true;     
            } 
            else
            {
                if (coordArr[0][2] == false && coordArr[1][2] == false && coordArr[2][2] == false && coordArr[3][2] == false)
                {
                    boolLastMove = false;
                }
            }
            return boolLastMove;
        }



        checkEndOfGame() {
            var validNode = true;
            var node1 = false;
            var node2 = false;
            var right = false;
            var left = false;
            var up = false;
            var down = false;
            var count = 0;
            var x;
            var y;
            var boolLastMoveIsDiag = false;

            for (var a = 0; a < this.arrEndNodes.length; a++) {
                for (var b = 0; b < this.arrGrid1.length; b++) {
                    //***check right 
                    if (this.arrEndNodes[a][0] == 3) {
                        right = true;
                    }
                    else {
                        if (this.arrGrid1[b][0] == this.arrEndNodes[a][0] + 1 && this.arrGrid1[b][1] == this.arrEndNodes[a][1] && this.arrGrid1[b][2] == "occupied") {
                            right = true;
                        }
                    }

                    //***check left
                    if (this.arrEndNodes[a][0] == 0) {
                        left = true;
                    }
                    else {
                        if (this.arrGrid1[b][0] == this.arrEndNodes[a][0] - 1 && this.arrGrid1[b][1] == this.arrEndNodes[a][1] && this.arrGrid1[b][2] == "occupied") {
                            left = true;
                        }
                    }

                    //***check up 
                    if (this.arrEndNodes[a][1] == 0) {
                        up = true;
                    }
                    else {
                        if (this.arrGrid1[b][0] == this.arrEndNodes[a][0] && this.arrGrid1[b][1] == this.arrEndNodes[a][1] - 1 && this.arrGrid1[b][2] == "occupied") {
                            up = true;
                        }
                    }

                    //***check down
                    if (this.arrEndNodes[a][1] == 3) {
                        down = true;
                    }
                    else {
                        if (this.arrGrid1[b][0] == this.arrEndNodes[a][0] && this.arrGrid1[b][1] == this.arrEndNodes[a][1] + 1 && this.arrGrid1[b][2] == "occupied") {
                            down = true;
                        }
                    }
                }
                if (a == 0) {
                    if (right == true && left == true && up == true && down == true) {
                        node1 = true;
                    }
                    else {
                        a = this.arrEndNodes.length + 1;
                    }
                }
                else {
                    if (right == true && left == true && up == true && down == true) {
                        node2 = true;
                    }
                }
            }
            if (node1 == true && node2 == true)
            {
                if (!this.checkLastMoveDiag())
                {
                    validNode = false;
                    this.mMsg = "GAME_OVER";
                    this.playersMove = this.playersMove + " Wins!";
                    this.EndNodeMessage = "Game Over";
                }
            }
            return validNode;
        }

    }
