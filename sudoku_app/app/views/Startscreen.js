// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: sudoku_app
// View: Startscreen
// ==========================================================================

sudoku_app.Startscreen = M.PageView.design({

    /* Use the 'events' property to bind events like 'pageshow' */
    events: {
        pageshow: {
            target: sudoku_app.AppController,
            action: 'setSettings'
        }
    },

    childViews: 'header content',

    header: M.ToolbarView.design({
        value: M.I18N.l('game_name'),
        anchorLocation: M.TOP,
        isFixed: NO
    }),

    content: M.ScrollView.design({
        childViews: 'startGame settings difficulty language info',

        cssClass: 'startscreen',

        startGame : M.ButtonView.design({
            value: M.I18N.l('start_game'),
            events: {
                tap: {
                    target: sudoku_app.AppController,
                    action: 'gotoGameScreen'
                }
            }
        }),

        settings : M.LabelView.design({
            value: M.I18N.l('settings'),
            cssClass:'settings'
        }),

        difficulty: M.SelectionListView.design({
            value: 3,
            contentBinding: {
                target: sudoku_app.AppController,
                property: 'difficulties'
            },
            selectionMode:  M.SINGLE_SELECTION_DIALOG,
            cssClass:       'selectionListViewNoTheme',
            events: {
                change: {
                    target: sudoku_app.AppController,
                    action: 'difficultyChanged'
                }
            }
        }),

        language: M.SelectionListView.design({
            contentBinding: {
                target: sudoku_app.AppController,
                property: 'languages'
            },
            selectionMode:  M.SINGLE_SELECTION_DIALOG,
            cssClass:       'selectionListViewNoTheme',
            events: {
                change: {
                    //target: sudoku_app.AppController,
                    action: function(lang){
                        if(lang){
                            M.I18N.setLanguage(lang);
                        }
                    }
                }
            }
        }),

        info : M.ButtonView.design({
            value: M.I18N.l('about') + ' ' + M.I18N.l('game_name'),
            events: {
                tap: {
                    target: sudoku_app.AppController,
                    action: 'gotoInfoScreen'
                }
            }
        })
    })

});

