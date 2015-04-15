(function(){//This will wrap form table with elements and proper styles
    var bsForm = function (){
        if (!spBsCtrls.optsWrap.bsWrapDone) { //This check is to run once

            //Lets find form table
            var $table = $('div[id*="WPQ2"]')
                .first()
                .find('table')
                .first();

            //wrapping
            $table.wrap(
                '<div class="bsScope">' +
                '<div class="bsHtml">' +
                '<div class="bsBody fuelux">' +
                '<div class="form-horizontal">' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>');

            //Set width of form to whole screen - 5%
            var width = $('#DeltaPlaceHolderMain').width();
            $table.width(width * 0.95);
            spBsCtrls.optsWrap.bsWrapDone = true;
        }
    };
    $.extend(window.spBsCtrls, {formWrap: bsForm});

})();