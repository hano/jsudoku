// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: sudoku_app
// View: Startscreen
// ==========================================================================

sudoku_app.InfoScreen = M.PageView.design({


    /*events: {
        pageshow: {
            target: sudoku_app.AppController,
            action: 'init'
        }
    },*/

    childViews: 'header content',

    header: M.ToolbarView.design({

        isFixed: NO,

        childViews: 'back label',

        back: M.ButtonView.design({
            anchorLocation: M.LEFT,
            value: M.I18N.l('boring'),
                icon: 'back',
                events: {
                    tap: {
                        target: sudoku_app.AppController,
                        action: 'gotoStartScreen'
                    }
                }
        }),

        label: M.LabelView.design({

            value: M.I18N.l('about') + ' ' + M.I18N.l('game_name'),
            anchorLocation: M.CENTER
        }),
        anchorLocation: M.TOP
    }),

    content: M.ScrollView.design({
        childViews: 'infotext',
        infotext: M.LabelView.design({

            cssClass: 'information',

            value: M.I18N.l('information')

        })
    })

});

