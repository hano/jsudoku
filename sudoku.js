var Sudoku = (function() {

    var that = this;
    var startLine = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var magic = 3;
    var empty = '';
    var solution = [];

    var playGround = [];


    var init = function() {
        generatePlayground();
        randomizePlayground();
        solution = deepCopy(playGround);
        clearPlayGround(22);
    }

    var shiftMe = function(array, shift) {
        var slicedResults = array.splice(0, shift);
        return array.push.apply(array, slicedResults);
    }

    var generatePlayground = function() {
//        randomize startline
        startLine = startLine.sort(randOrd);

//        generate this structure
//        [1, 2, 3, 4, 5, 6, 7, 8, 9]
//        [4, 5, 6, 7, 8, 9, 1, 2, 3]
//        [7, 8, 9, 1, 2, 3, 4, 5, 6]

        playGround[0] = deepCopy(startLine);
        playGround[1] = deepCopy(startLine);
        shiftMe(playGround[1], magic);
        playGround[2] = deepCopy(playGround[1]);
        shiftMe(playGround[2], magic);

//        add the playground[3-8] in this structure
//        [1, 2, 3, 4, 5, 6, 7, 8, 9]
//        [4, 5, 6, 7, 8, 9, 1, 2, 3]
//        [7, 8, 9, 1, 2, 3, 4, 5, 6]
//        [2, 3, 1, 5, 6, 4, 8, 9, 7]
//        [5, 6, 4, 8, 9, 7, 2, 3, 1]
//        [8, 9, 7, 2, 3, 1, 5, 6, 4]
//        [3, 1, 2, 6, 4, 5, 9, 7, 8]
//        [6, 4, 5, 9, 7, 8, 3, 1, 2]
//        [9, 7, 8, 3, 1, 2, 6, 4, 5]

        playGround[3] = splitShift(playGround[0], 3, 1);
        playGround[4] = splitShift(playGround[1], 3, 1);
        playGround[5] = splitShift(playGround[2], 3, 1);
        playGround[6] = splitShift(playGround[3], 3, 1);
        playGround[7] = splitShift(playGround[4], 3, 1);
        playGround[8] = splitShift(playGround[5], 3, 1);

    };

    var randomizePlayground = function() {
//        shift row
//        you can shift rows randomly ([0] with [1] or [2]) AND ([3] with [4] or [5]) && ([6] with [7] or [8])
        randomizeRow(0, 2); //shift two of them with each other playGround[0], playGround[1], playGround[2]
        randomizeRow(3, 5); //shift two of them with each other playGround[3], playGround[4], playGround[5]
        randomizeRow(6, 8); //shift two of them with each other playGround[6], playGround[7], playGround[8]

//TODO implement shift col
//        shift col
//        you can shift cols randomly ([0][0-9] with [1][0-9] and [2][0-9])
//        AND ([3][0-9] with [4][0-9] and [5][0-9])
//        AND ([6][0-9] with [7][0-9] and [8][0-9])
    }

    var randomizeRow = function(min, max) {
//        do it for n = times
        var times = Math.floor(Math.random() * 11);
        for (var i = times; i--;) {
//            take 2 random rows between the min and max...
            var a = Math.floor(Math.random() * (max - min + 1)) + min;
            var b = Math.floor(Math.random() * (max - min + 1)) + min;
//            and change them
            var temp = [];
            temp = deepCopy(playGround[a]);
            playGround[a] = playGround[b];
            playGround[b] = temp;
        }
    }

    var clearPlayGround = function(given) {
        var spare = 81;
        var pg = playGround;

        for (var x = 81; x >= given; x--) {

            for (var i in pg) {
                for (var k in pg[i]) {
                    if (Math.floor(Math.random() * 2) === 0 && spare > given) {
                        pg[i][k] = empty;
                        spare -= 1
                    }
                }
            }
        }
    }

    var deepCopy = function(array) {
        var s = JSON.stringify(array);
        return JSON.parse(s);
    }

    var splitShift = function(array, offset, shift) {

        var a = deepCopy(array);

//        slices the array
        var t1 = a.splice(0, offset);
        var t2 = a.splice(0, offset);
        var t3 = a;

//        shifts the array
        shiftMe(t1, shift);
        shiftMe(t2, shift);
        shiftMe(t3, shift);

//        push an array into an array
        t1.push.apply(t1, t2);
        t1.push.apply(t1, t3);

        a = '';
        return t1;
    }

    var randOrd = function() {
        return (Math.round(Math.random()) - 0.5);
    }

    var check = function(value, co){
        if(solution[co.x][co.y] === Number(value)){
            return true;
        }else{
            return false;
        }
    }

    return {

        /**
         *
         * @param callback
         *
         * returns a new playground as return value or as first parameter
         *
         */
        newPitch: function(callback) {
            init();
            if (callback) {
                callback(playGround);
            } else {
                return playGround;
            }
        },


        /**
         *
         * @param id the id to place the pitch in
         *
         *  generates a new pitch if none exists
         */
        showPitch: function(id) {
            if (playGround.length === 0) {
                init();
            }
            $('#' + id).html('');
            for (var i in playGround) {
                var cssId = 'row_' + i;
                $('#' + id).append('<div class="row" id="' + cssId + '">');
                for (var k in playGround[i]) {
                    var value = playGround[i][k]
                    if (value === empty) {
                        $('#' + id + ' #' + cssId).append('<span class="editable" contenteditable="true">' + value + '</span>');
                    } else {
                        $('#' + id + ' #' + cssId).append('<span>' + value + '</span>');
                    }

                }
            }
        },


        solve: function(){
            console.log(solution);
        },

        show: function(id, hintLevel) {
            if (playGround.length === 0) {
                init();
            }

            var boxMarkup = '<div class="box" id="b_0_0"></div> <div class="box" id="b_0_1"></div> <div class="box" id="b_0_2"></div>' +
                '<div class="box" id="b_1_0"></div> <div class="box" id="b_1_1"></div> <div class="box" id="b_1_2"></div>' +
                '<div class="box" id="b_2_0"></div> <div class="box" id="b_2_1"></div> <div class="box" id="b_2_2"></div>';

            $('#' + id).append(boxMarkup);

            $('#' + id + ' span').live('blur', function() {
                var s = $(this).html();
                $(this).html(s.substring(0, 1));
                var value = $(this).html();
                var coords = {};
                var classes = $(this).attr('class').split('__');
                if(classes.length > 1){
                    var xy = classes[1].split('-');
                    if(xy.length > 1){
                            coords['x'] = xy[0];
                            coords['y'] = xy[1];
                    }
                }
                if(hintLevel === 1){
                    if(check(value, coords)){
                        $(this).addClass('solved');
                    }
                }


            });

            for (var i in playGround) {
                for (var k in playGround[i]) {
                    var value = playGround[i][k]
                    var insert = '<span class="field__' + i + '-' + k + '__';
                    if (value === empty) {
                        insert += ' editable" contenteditable="true"';
                    }else{
                        insert += '"';
                    }
                    insert += '>' + value + '</span>';
                    var box;
                    if (i <= 2 && k <= 2) {
                        //0_0
                        box = '0_0';
                    } else if (i <= 2 && k <= 5) {
                        //0_2
                        box = '0_1';
                    } else if (i <= 2 && k <= 9) {
                        //0_3
                        box = '0_2';
                    } else if (i <= 5 && k <= 2) {
                        //2_0
                        box = '1_0';
                    } else if (i <= 5 && k <= 5) {
                        //2_2
                        box = '1_1';
                    } else if (i <= 5 && k <= 9) {
                        //2_3
                        box = '1_2';
                    } else if (i <= 9 && k <= 2) {
                        //3_0
                        box = '2_0';
                    } else if (i <= 9 && k <= 5) {
                        //3_2
                        box = '2_1';
                    } else if (i <= 9 && k <= 9) {
                        //3_3
                        box = '2_2';
                    }
                    $('#' + id + ' #b_' + box).append(insert);
                }
                //console.log(playGround[i]);
            }
        },

        test: function(callback) {
            var testLine = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            var pg = deepCopy(playGround);
            var err = [];
            for (var i in pg) {
                pg[i].sort();
                for (var k in pg[i]) {
                    if (pg[i][k] !== testLine[k]) {
                        err.push(i + ' -  ' + k);
                    }
                }
            }
            if (callback) {
                callback(err);
            } else {
                console.log('failed at :', err.length, ' tests');
            }
        }
    }

})()