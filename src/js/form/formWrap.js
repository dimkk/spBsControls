(function(){//FORM - This will wrap form table with elements and proper styles put it in OnPreRender: of jslink file
    var bsForm = function (){
        if (!spBsCtrls.optsWrap.bsWrapDone) { //This check is to run once

            //Lets find form table
            var $table = $('div[id*="WPQ2"]')
                .first()
                .find('table')
                .first();

            //Set width of form to whole screen - 5%
            var width = $('#DeltaPlaceHolderMain').width();
            $table.width(width * 0.95);
            spBsCtrls.optsWrap.bsWrapDone = true;

            //wrapping
            $table.wrap(
                '<div class="bsScope">' +
                '<div class="bsHtml">' +
                '<div class="bsBody fuelux">' +
                '<div class="form-horizontal">' +//'<div class="form-horizontal">' +

                '</div>' +
                '</div>' +
                '</div>' +
                '</div>');
            //$table.append(strVar);
            //$('.progress-bar-striped').addClass('active');
            //$('#rootwizard').bootstrapWizard({onTabShow: function(tab, navigation, index) {
            //    var $total = navigation.find('li').length;
            //    var $current = index+1;
            //    var $percent = ($current/$total) * 100;
            //    $('#rootwizard .progress-bar').css({width:$percent+'%'});
            //}});

            //if (spBsCtrls.common.ie() <= 9){
            //    spBsCtrls.common.addScript('shiv', '/Style Library/spbs/html5shiv.js');
            //    spBsCtrls.common.addScript('shim', '/Style Library/spbs/es5-shim.js');
            //};
        }
    };


    $.extend(window.spBsCtrls, {formWrap: bsForm});

})();