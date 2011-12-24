var Sudoku = (function() {

    var that = this;
    var startLine = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var magic = 3;
    var empty = '';
    var solution = [];
    var ZOOM = '#';

    var playGround = [];


    var init = function(difficulty) {
        var d = difficulty ? difficulty : 22;
        generatePlayground();
        randomizePlayground();
        solution = deepCopy(playGround);
        clearPlayGround(d);
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

    var check = function(value, co) {
        if (solution[co.x][co.y] === Number(value)) {
            return true;
        } else {
            return false;
        }
    }


    var getCoords = function(cssClass) {
        var classes = cssClass.split('__'),
                coords = {};
        if (classes.length > 1) {
            var xy = classes[1].split('-');
            if (xy.length > 1) {
                coords['x'] = xy[0];
                coords['y'] = xy[1];
            }
        }
        return coords;
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


        showSolve: function(id) {
            $('#' + id + ' .active').removeClass('active');
            $('#' + id + ' .box span').each(function() {

                if (check($(this).html(), getCoords($(this).attr('class')))) {
                    $(this).addClass('correct');
                } else {
                    $(this).addClass('wrong');
                }
            });
        },

        /**
         *
         * @param id the id of the surrounding sudoku element
         * @param hintLevel 0 = no check on blur, 1 = instant check of the correct value
         * @param difficulty count of the hidden tiles
         * @param newPitch create a new pitch on every call
         */
        show: function(id, hintLevel, difficulty, newPitch) {
            var coords = {};

            if (playGround.length === 0 || newPitch) {
                init(difficulty);
            }

            var boxMarkup = '<div class="box" id="b_0_0"></div> <div class="box" id="b_0_1"></div> <div class="box" id="b_0_2"></div>' +
                    '<div class="box" id="b_1_0"></div> <div class="box" id="b_1_1"></div> <div class="box" id="b_1_2"></div>' +
                    '<div class="box" id="b_2_0"></div> <div class="box" id="b_2_1"></div> <div class="box" id="b_2_2"></div>' +
                    '<div class="navigator">' +
                    '<a href="#">' + ZOOM + '</a><a href="#">&nbsp;</a><a href="#">1</a><a href="#">2</a><a href="#">3</a><a href="#">4</a><a href="#">5</a><a href="#">6</a><a href="#">7</a><a href="#">8</a><a href="#">9</a>' +
                    '</div>' +
                    '<div class="zoom"></div>';


            var responsiveLayout = function() {
                var w = $('#' + id + ' .box span').outerWidth();

                $('#' + id + ' .box span').css('height', w + 'px');
                $('#' + id + ' .box span').css('font-size', Math.round(w / 2) + 'px');
//
                var dim = getInnerBoxesDimensions();
                $('#' + id + ' .Sudoku span .zoombox').css('height', dim.h + 'px');
                $('#' + id + ' .Sudoku span .zoombox').css('width', dim.w + 'px');
            }

            var getInnerBoxesDimensions = function(){
                var w = $('#' + id + ' .box span').outerWidth();
                var h = $('#' + id + ' .box span').outerHeight();
//              because of the border: -2px
                var _h = (Math.round(h/3))-2;
                var _w = (Math.round(w/3))-2;
                return {h: _h, w: _w};
            }

            $('#' + id).html('');
            $('#' + id).append('<div class="Sudoku">' + boxMarkup + '</div>');
            setTimeout(function() {
                responsiveLayout();

                $('.Sudoku .editable').bind('click', function() {
                    coords = getCoords($(this).attr('class'));
                    $('.active').removeClass('active');
                    $(this).removeClass('wrong');
                    $(this).removeClass('correct');
                    $(this).addClass('active');
                });

            }, 5);


            var showZoom = function(){

                //reset width and height
                $('#' + id + ' .active .zoombox').css('height','');
                $('#' + id + ' .active .zoombox').css('width','');
                var currentValue = $('#' + id + ' .active').html();
                var zoomBoxes = '';
                if(currentValue && typeof(currentValue) === 'string' && currentValue.split('div').length > 1){
                    var zoomBoxes = currentValue;
                }else{
                    zoomBoxes = '<div class="zoombox zb_0_0"></div><div class="zoombox zb_0_1"></div><div class="zoombox zb_0_2"></div><div class="zoombox zb_1_0"></div><div class="zoombox zb_1_1"></div><div class="zoombox zb_1_2"></div><div class="zoombox zb_2_0"></div><div class="zoombox zb_2_1"></div><div class="zoombox zb_2_2"></div>';
                }

                $('#' + id + ' .zoom').show();
                $('#' + id + ' .zoom').css('height', $('#' + id + ' .Sudoku .box').outerHeight()*3 + 'px');
                $('#' + id + ' .zoom').css('width', $('#' + id + ' .Sudoku .box').outerWidth()*3 + 'px');
                $('#' + id + ' .zoom').html(zoomBoxes);

                //timeout for a better touch feeling so that the user sees the marked tile
                $('#' + id + ' .zoom .zoombox').bind('click', function(){
                    $(this).addClass('selected');
                    setTimeout(function(){
                        hideZoom();
                    }, 200);
                });
            };

            var hideZoom = function(){
                $('#' + id + ' .zoom').hide();
                $('#' + id + ' .zoom')


                var dim = getInnerBoxesDimensions();
                $('#' + id + ' .Sudoku .zoom .zoombox').css('height', dim.h + 'px');
                $('#' + id + ' .Sudoku .zoom .zoombox').css('width', dim.w + 'px');
                

                var value = $('#' + id + ' .zoom').html();

                $('#' + id + ' .editable.active').html(value);
                $('#' + id + ' .zoom').html();
            };

            $(document).ready(function() {
                $('#' + id).css('overflow', 'hidden');

                $(window).bind('resize', function() {
                    responsiveLayout();
                });
//                TODO switch user agent


                $('.Sudoku .navigator a').bind('click', function() {
                    var value = $(this).html();
                    var activeOne = $('.Sudoku .active');
                    if (activeOne.length > 0) {
                        if (value === ZOOM) {
                            showZoom();
                        } else {
                            activeOne.html(value);
                            if (coords) {
                                if (hintLevel === 1 && check(value, coords)) {
                                    activeOne.addClass('solved');
                                } else {
                                    activeOne.removeClass('solved');
                                }
                            }
                        }

                    }
                });
            });


            /*
             TODO IF USER AGENT IS PC
             $('#' + id + ' span').live('blur', function() {
             var s = $(this).html();
             $(this).html(s.substring(0, 1));
             var value = $(this).html();
             var coords = {};
             var classes = $(this).attr('class').split('__');
             if (classes.length > 1) {
             var xy = classes[1].split('-');
             if (xy.length > 1) {
             coords['x'] = xy[0];
             coords['y'] = xy[1];
             }
             }
             if (hintLevel === 1) {
             if (check(value, coords)) {
             $(this).addClass('solved');
             }
             }


             });
             */

            for (var i in playGround) {
                for (var k in playGround[i]) {
                    var value = playGround[i][k]
                    var insert = '<span class="field__' + i + '-' + k + '__';
                    if (value === empty) {
                        insert += ' editable"';
//                        TODO switch user agent
//                        if(pc)
//                          contenteditable="true"';
//                        else
                    } else {
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