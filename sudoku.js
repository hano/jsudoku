var Sudoku = (function() {

    var that = this;
    var startLine = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var testLine = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var magic = 3;

    var playGround = [];


    var init = function() {
        generatePlayground();
        randomizePlayground();
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

    var deepCopy = function(array) {
        var s = JSON.stringify(array);
        return JSON.parse(s);
    }

    var splitShift = function(array, offset, shift) {

        var a = deepCopy(array);
        var t1 = a.splice(0, offset);
        var t2 = a.splice(0, offset);
        var t3 = a;
        shiftMe(t1, shift);
        shiftMe(t2, shift);
        shiftMe(t3, shift);

//        pushed ein array in ein array
        t1.push.apply(t1, t2);
        t1.push.apply(t1, t3);

        a = '';
        return t1;
    }

    var randOrd = function() {
        return (Math.round(Math.random()) - 0.5);
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
            }else{
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
                var cssId = 'box_' + i;
                $('#' + id).append('<div class="box" id="' + cssId + '">');
                for (var k in playGround[i]) {
                    $('#' + id + ' #' + cssId).append('<span>' + playGround[i][k] + '</span>');
                }
            }
        },

        test: function(callback) {
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