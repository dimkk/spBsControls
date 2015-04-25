(function(){//Field - This will modify form table row styles to match BS Forms put it in OnPostRender: of jslink
    var fw = function  (ctx, params){
        var opts = $.extend({}, params, spBsCtrls.optsWrap.fieldWrapOptions);
        var f = ctx.ListSchema.Field[0];
        //console.log( f.FieldType);
        //We will not remove classes from people picker and customised controls
        var dontRemoveClass = f.FieldType === 'User' ||  f.FieldType === 'UserMulti'
            || spBsCtrls.optsWrap.customRenderedFields.indexOf(f.Name) != -1;

        //Lets find row
        var $field = $('div#spBsCtrls').find('[id*="'+f.Id+'"]').first();
        var $parentTr = $field.parents('tr')
            .first();

        //Remove width.. why its there?
        //$parentTr.find('td[width]').removeAttr('width');

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
        $labelTdContents //label
            .first()
            .children()
            .first()
            .unwrap()
            .wrap('<label class="control-label '+opts.labelClasses+'"></label>');
        $labelTdContents //control
            .last()
            .children()
            .first()
            .wrap('<div class="'+opts.controlClasses+'"></div>');

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