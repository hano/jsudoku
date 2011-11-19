// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: sudoku_app
// Controller: AppController
// ==========================================================================

sudoku_app.AppController = M.Controller.extend({


    languages: [],
    difficulties: [],
    difficulty: 2,

    init: function(isFirstLoad) {
        if(isFirstLoad) {
            this.createPlayground();
        }
    },

    createPlayground: function(){
        var playground = M.ViewManager.getView(sudoku_app.GameScreen, 'playground');
        var difficulty = Number(this.difficulty) ? Number(this.difficulty) : 2;

        var _id = playground.id;
        if(!_id){
            M.Logger.log('no playground id given', M.ERR);
            return
        }

        var hints = 0;
        var dif = 22;

        //1 easy
        //2 medium
        //3 nightmare
        
        switch(difficulty){
            case 1:
                hints = 1;
                dif = 40;
                break;
            case 2: ;
                hints = 0;
                dif = 22;
                break;
            case 3:
                hints = 0;
                dif = 10;
                break;
            default: ;
        }

        Sudoku.show(_id, hints, dif, true);
    },

    setSettings: function(){

        var lang = [];

        lang.push({
            label: M.I18N.l('switch_language'),
            value: ''
        });

        lang.push({
            label: M.I18N.l('english'),
            value: 'en_en'
        });

        lang.push({
            label: M.I18N.l('german'),
            value: 'de_de'
        });

        this.set('difficulties', this.getDifficulties());
        this.set('languages', lang);

        if(this.difficulty){
            M.ViewManager.getView(sudoku_app.Startscreen, 'difficulty').setSelection('' + this.difficulty);
        }
        M.ViewManager.getView(sudoku_app.Startscreen, 'language').setSelection(M.I18N.getLanguage());

    },

    getDifficulties: function(){
        var diffi = [];

        diffi.push({
            label: M.I18N.l('difficulty'),
            value: ''
        });

        diffi.push({
            label: M.I18N.l('sleepyhead'),
            value: "1"
        });

        diffi.push({
            label: M.I18N.l('candy_ass'),
            value: "2"
        });

        diffi.push({
            label: M.I18N.l('rocket_scientist'),
            value: "3"
        });

        return diffi;
    },

    difficultyChanged: function(){
        var difficulty = M.ViewManager.getView(sudoku_app.Startscreen, 'difficulty').getSelection() ? M.ViewManager.getView(sudoku_app.Startscreen, 'difficulty').getSelection() : 2;
        this.set('difficulty', Number(difficulty));
        this.createPlayground();
    },

    gotoGameScreen: function(){
        this.switchToPage('Gamescreen');
    },

    gotoStartScreen: function(){
        this.switchToPage('Startscreen');
    },

    gotoInfoScreen: function(){
        this.switchToPage('Infoscreen');
    }
});
