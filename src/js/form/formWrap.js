(function(){//This will wrap form table with elements and proper styles
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

            var strVar="";
            strVar += "<div class=\"page-header\">";
            strVar += "<h1>Wizard With Progress Bar using events<\/h1>";
            strVar += "<\/div>";
            strVar += "";
            strVar += "<div id=\"rootwizard\">";
            strVar += "<div class=\"navbar\">";
            strVar += "<div class=\"navbar-inner\">";
            strVar += "<div class=\"container\">";
            strVar += "<ul>";
            strVar += "<li><a href=\"#tab1\" data-toggle=\"tab\">First<\/a><\/li>";
            strVar += "<li><a href=\"#tab2\" data-toggle=\"tab\">Second<\/a><\/li>";
            strVar += "<li><a href=\"#tab3\" data-toggle=\"tab\">Third<\/a><\/li>";
            strVar += "<li><a href=\"#tab4\" data-toggle=\"tab\">Forth<\/a><\/li>";
            strVar += "<li><a href=\"#tab5\" data-toggle=\"tab\">Fifth<\/a><\/li>";
            strVar += "<li><a href=\"#tab6\" data-toggle=\"tab\">Sixth<\/a><\/li>";
            strVar += "<li><a href=\"#tab7\" data-toggle=\"tab\">Seventh<\/a><\/li>";
            strVar += "<\/ul>";
            strVar += "<\/div>";
            strVar += "<\/div>";
            strVar += "<\/div>";
            strVar += "<div id=\"bar\" class=\"progress\">";
            strVar += "<div class=\"progress-bar progress-bar-striped\" role=\"progressbar\" aria-valuenow=\"0\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 0%;\"><span class=\"sr-only\">45% Complete<\/span><\/div>";
            strVar += "<\/div>";
            strVar += "<div class=\"tab-content\">";
            strVar += "<div class=\"tab-pane\" id=\"tab1\">";
            strVar += "1";
            strVar += "<\/div>";
            strVar += "<div class=\"tab-pane\" id=\"tab2\">";
            strVar += "2";
            strVar += "<\/div>";
            strVar += "<div class=\"tab-pane\" id=\"tab3\">";
            strVar += "3";
            strVar += "<\/div>";
            strVar += "<div class=\"tab-pane\" id=\"tab4\">";
            strVar += "4";
            strVar += "<\/div>";
            strVar += "<div class=\"tab-pane\" id=\"tab5\">";
            strVar += "5";
            strVar += "<\/div>";
            strVar += "<div class=\"tab-pane\" id=\"tab6\">";
            strVar += "6";
            strVar += "<\/div>";
            strVar += "<div class=\"tab-pane\" id=\"tab7\">";
            strVar += "7";
            strVar += "<\/div>";
            strVar += "<ul class=\"pager wizard\">";
            strVar += "<li class=\"previous first\" style=\"display:none;\"><a href=\"#\">First<\/a><\/li>";
            strVar += "<li class=\"previous\"><a href=\"#\">Previous<\/a><\/li>";
            strVar += "<li class=\"next last\" style=\"display:none;\"><a href=\"#\">Last<\/a><\/li>";
            strVar += "<li class=\"next\"><a href=\"#\">Next<\/a><\/li>";
            strVar += "<\/ul>";
            strVar += "<\/div>";

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
            $table.append(strVar);
            $('.progress-bar-striped').addClass('active');
            $('#rootwizard').bootstrapWizard({onTabShow: function(tab, navigation, index) {
                var $total = navigation.find('li').length;
                var $current = index+1;
                var $percent = ($current/$total) * 100;
                $('#rootwizard .progress-bar').css({width:$percent+'%'});
            }});
        }
    };


    $.extend(window.spBsCtrls, {formWrap: bsForm});

})();