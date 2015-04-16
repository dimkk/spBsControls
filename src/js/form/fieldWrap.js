(function(){//This will modify form table row styles to match BS Forms
    var fw = function  (ctx){

        var f = ctx.ListSchema.Field[0];
        //We will not remove classes from people picker and customised controls
        var dontRemoveClass = f.FieldType === 'User' ||  f.FieldType === 'UserMulti'
            || spBsCtrls.optsWrap.customRenderedFields.indexOf(f.Name) != -1;

        //Lets find row
        var $field = $('[id*="'+f.Id+'"]').first();
        var $parentTr = $field.parents('tr')
            .first();

        //Cells
        var $controlTd = $parentTr.children()
            .eq(1);
        var $labelTd = $parentTr.children()
            .first();

        //Pick up control from cell and push it after label in it's cell
        var $labelTdContents = $labelTd.children();
        var $controlTdContents = $controlTd.children();
        $controlTdContents.unwrap();
        $labelTdContents.after($controlTdContents);

        //Wrapping
        $labelTdContents = $labelTd.children();
        $labelTdContents.wrapAll('<div class="form-group"></div>');

        //Once more
        $labelTdContents
            .first()
            .children()
            .first()
            .unwrap()
            .wrap('<label class="control-label col-xs-12 col-sm-12 col-md-4 col-lg-2"></label>');
        $labelTdContents
            .last()
            .children()
            .first()
            .wrap('<div class="col-xs-12 col-sm-12 col-md-8 col-lg-10"></div>');

        //Add some BS styles to controls
        if (!dontRemoveClass) {
            $parentTr
                .find('input[type="text"]')
                .attr('class', '')
                .addClass('form-control');

        } else{
            $parentTr
                .find('.sp-peoplepicker-topLevel')
                .addClass('pp-fix');

        }
        $parentTr
            .find('select')
            .attr('class', '')
            .addClass('form-control');
        $parentTr
            .attr('class', '')
            .find('textarea')
            .addClass('form-control');

    };
    $.extend(window.spBsCtrls, {fieldWrap: fw});

})();