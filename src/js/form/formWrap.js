(function(){//FORM - This will wrap form table with elements and proper styles put it in OnPreRender: of jslink file
    var bsForm = function (params){
        if (!spBsCtrls.optsWrap.bsWrapDone) { //This check is to run once
            var opts = $.extend({}, params, spBsCtrls.optsWrap.formWrapOptions);
            //Lets find form table
            var $table = $('div[id*="WPQ2"]')
                .first()
                .find('table')
                .first();

            //Set width of form to whole screen - 5%
            var width = $(opts.widthSelector).width();
            $table.width(width * opts.width);
            spBsCtrls.optsWrap.bsWrapDone = true;

            //wrapping
            $table.wrap(
                '<div id="spBsCtrls">' +
                '<div class="bsScope">' +
                '<div class="bsHtml">' +
                '<div class="bsBody">' +
                '<div class="'+opts.formClass+'">' +

                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>'
            );

            //Someday
            //if (spBsCtrls.common.ie() <= 9){
            //    spBsCtrls.common.addScript('shiv', '/Style Library/spbs/html5shiv.js');
            //    spBsCtrls.common.addScript('shim', '/Style Library/spbs/es5-shim.js');
            //};
        }
    };


    $.extend(window.spBsCtrls, {formWrap: bsForm});

})();