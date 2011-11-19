// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: sudoku_app
// View: Startscreen
// ==========================================================================

sudoku_app.GameScreen = M.PageView.design({


    events: {
        pageshow: {
            target: sudoku_app.AppController,
            action: 'init'
        }
    },

    childViews: 'header content',

    header: M.ToolbarView.design({

        isFixed: NO,

        childViews: 'back label buttonGroup',

        back: M.ButtonView.design({
            anchorLocation: M.LEFT,
            value: M.I18N.l('back'),
                icon: 'back',
                events: {
                    tap: {
                        target: sudoku_app.AppController,
                        action: 'gotoStartScreen'
                    }
                }
        }),

        label: M.LabelView.design({

            value: M.I18N.l('game_name'),
            anchorLocation: M.CENTER
        }),

        buttonGroup: M.ContainerView.design({
            anchorLocation: M.RIGHT,
            childViews: 'newone solve',
            newone: M.ButtonView.design({
                value: M.I18N.l('new_game'),
                icon: 'refresh',
                events: {
                    tap: {
                        target: sudoku_app.AppController,
                        action: 'createPlayground'
                    }
                }
            }),

            solve: M.ButtonView.design({
                value: M.I18N.l('solve'),
                icon: 'check',
                events: {
                    tap: {
                        //target: sudoku_app.AppController,
                        action: function(){
                            var playgroundId = M.ViewManager.getView(sudoku_app.GameScreen, 'playground').id;
                            Sudoku.showSolve(playgroundId);
                        }
                    }
                }
            })
        }),

        value :'',

        anchorLocation: M.TOP
    }),

    content: M.ScrollView.design({
        childViews: 'playground',
        playground: M.ContainerView.design({

            cssClass: 'sudokuPlayground'
        })
    })
});

