/**
 * Created by sp-admin on 4/15/2015.
 */
window.spBsCtrls = window.spBsCtrls || {};
(function(){//This will modify form table row styles to match BS Forms
    var c = {
        getChoicesArrayFromString: function (str) {
            var result =str.split(';#');
            result.pop();
            result.shift();

            return result;
        },
        getChoicesStringFromArray: function (arr) {
            var result = arr.join(';#');
                result = ';#' +  result + ';#';
            return result;
        },
      getLookupValuesFromIdsArray: function (arr) {
          var result = _.map(arr, function(d){
              return d + ';#';
          })
              .join(';#');
          return result;
      },
        getLookupIdsFromString: function (str) {
            var result = $.map(str.split(';#'),
                function(item, idx){
                    if (idx % 2 == 0){return item}
                });
            return result;
        }
    };
    $.extend(window.spBsCtrls, {common: c});

})();
(function(){//This will pick the right control to render
    var pi = function (ctx) {
        var fieldType = ctx.ListSchema.Field[0].FieldType;
        switch(fieldType){
            case 'Lookup':
                return spBsCtrls.lookup(ctx);
                break;
            case 'LookupMulti':
                return spBsCtrls.lookupMulti(ctx);
                break;
            case 'DateTime':
                return spBsCtrls.calendar(ctx);
                break;
            case 'Choice':
                return spBsCtrls.choice(ctx);
                break;
            case 'MultiChoice':
                return spBsCtrls.choiceMulti(ctx);
                break;
            case 'Boolean':
                return spBsCtrls.switch(ctx);
                break;
            case 'Note':
                return spBsCtrls.textarea(ctx);
                break;
        }
    }
    $.extend(window.spBsCtrls, {picker: pi});

})();
(function(){//-------------------CALENDAR
    var cal = function  (ctx){
        var f = ctx.ListSchema.Field[0];
        //spBsCtrls.optsWrap.customRenderedFields.push(f.Name);
        var fieldInternalName = ctx.CurrentFieldSchema.Name;
        var controlId = f.Id;
        var choices = ctx.CurrentFieldSchema.Choices;
        var values = ctx.CurrentItem[f.Name].split(' ')[0]; //TODO checkout date_TIME_
        ctx.FormContext.registerInitCallback(fieldInternalName, function () {
            $('#'+controlId)
                .datetimepicker({
                    format:'DD.MM.YYYY',
                    locale: 'ru',
                    date: new Date(values)
                })
                .on('dp.change', function (e) {
                    var data = $(e.target).val();
                    ctx.FormContext.updateControlValue(f.Name, data + ' 0:0');
                })

        });

        ctx.FormContext.registerFocusCallback(fieldInternalName, function () {
            $('#'+controlId).focus();
        });

        ctx.FormContext.registerValidationErrorCallback(fieldInternalName, function (errorResult) {
            SPFormControl_AppendValidationErrorMessage(controlId, errorResult);
        });

        var text = '<div><input type="text" id="'+controlId+'" /></div>';


        return text;

    };
    $.extend(window.spBsCtrls, {calendar: cal});

})();
(function(){
    var ch = function  (ctx){
        var f = ctx.ListSchema.Field[0];
        spBsCtrls.optsWrap.customRenderedFields.push(f.Name);
        var fieldInternalName = ctx.CurrentFieldSchema.Name;
        var controlId = f.Id;
        var choices = ctx.CurrentFieldSchema.Choices;
        var values = spBsCtrls.common.getLookupIdsFromString(ctx.CurrentItem[f.Name]);
        ctx.FormContext.registerInitCallback(fieldInternalName, function () {
            var normChoices = choices;//$.map(choices, function(choice){ return {text: choice.LookupValue, id:choice.LookupId}  });
            $('#'+controlId)
                .select2({
                    data: normChoices
                })
                .on('change', function (e) {
                    var data = $(e.target).val();
                    ctx.FormContext.updateControlValue(f.Name, data);
                })
                .select2('val', values);
        });

        ctx.FormContext.registerFocusCallback(fieldInternalName, function () {
            $('#'+controlId).focus();
        });

        ctx.FormContext.registerValidationErrorCallback(fieldInternalName, function (errorResult) {
            SPFormControl_AppendValidationErrorMessage(controlId, errorResult);
        });

        var text = '<div><select type="text" class="" id="'+controlId+'" /></div>';


        return text;

    };
    $.extend(window.spBsCtrls, {choice: ch});

})();
(function(){ //CHOICE MULTI
    var cm = function  (ctx){
        var f = ctx.ListSchema.Field[0];
        spBsCtrls.optsWrap.customRenderedFields.push(f.Name);
        var fieldInternalName = ctx.CurrentFieldSchema.Name;
        var controlId = f.Id;
        var choices = ctx.CurrentFieldSchema.MultiChoices;
        var values = spBsCtrls.common.getChoicesArrayFromString(ctx.CurrentItem[f.Name]);
        ctx.FormContext.registerInitCallback(fieldInternalName, function () {
            var normChoices = choices;//$.map(choices, function(choice){ return {text: choice.LookupValue, id:choice.LookupId}  });
            $('#'+controlId)
                .select2({
                    data: normChoices,
                    multiple: true
                })
                .on('change', function (e) {
                    var data = spBsCtrls.common.getChoicesStringFromArray($(e.target).val());
                    ctx.FormContext.updateControlValue(f.Name, data);
                })
                .select2('val', values);
        });

        ctx.FormContext.registerFocusCallback(fieldInternalName, function () {
            $('#'+controlId).focus();
        });

        ctx.FormContext.registerValidationErrorCallback(fieldInternalName, function (errorResult) {
            SPFormControl_AppendValidationErrorMessage(controlId, errorResult);
        });

        var text = '<div><select type="text" class="" id="'+controlId+'" /></div>';


        return text;

    };
    $.extend(window.spBsCtrls, {choiceMulti: cm});

})();
(function(){
    var lu = function  (ctx){
        var f = ctx.ListSchema.Field[0];
        spBsCtrls.optsWrap.customRenderedFields.push(f.Name);
        var fieldInternalName = ctx.CurrentFieldSchema.Name;
        var controlId = f.Id;
        var choices = ctx.CurrentFieldSchema.Choices;
        var values = spBsCtrls.common.getLookupIdsFromString(ctx.CurrentItem[f.Name]);
        ctx.FormContext.registerInitCallback(fieldInternalName, function () {
            var normChoices = $.map(choices, function(choice){ return {text: choice.LookupValue, id:choice.LookupId}  });
            $('#'+controlId)
                .select2({
                    data: normChoices
                })
                .on('change', function (e) {
                    var data = spBsCtrls.common.getLookupValuesFromIdsArray($(e.target).val());
                    ctx.FormContext.updateControlValue(f.Name, data);
                })
                .select2('val', values);
        });

        ctx.FormContext.registerFocusCallback(fieldInternalName, function () {
            $('#'+controlId).focus();
        });

        ctx.FormContext.registerValidationErrorCallback(fieldInternalName, function (errorResult) {
            SPFormControl_AppendValidationErrorMessage(controlId, errorResult);
        });

        var text = '<div><select type="text" class="" id="'+controlId+'" /></div>';


        return text;

    };
    $.extend(window.spBsCtrls, {lookup: lu});

})();
(function(){
    var lm = function  (ctx){
        var f = ctx.ListSchema.Field[0];
        spBsCtrls.optsWrap.customRenderedFields.push(f.Name);
        var fieldInternalName = ctx.CurrentFieldSchema.Name;
        var controlId = f.Id;
        var choices = ctx.CurrentFieldSchema.Choices;
        var values = spBsCtrls.common.getLookupIdsFromString(ctx.CurrentItem[f.Name]);
        ctx.FormContext.registerInitCallback(fieldInternalName, function () {
            var normChoices = $.map(choices, function(choice){ return {text: choice.LookupValue, id:choice.LookupId}  });
            $('#'+controlId)
                .select2({
                    data: normChoices,
                    multiple: true
                })
                .on('change', function (e) {
                    var data = spBsCtrls.common.getLookupValuesFromIdsArray($(e.target).val());
                    ctx.FormContext.updateControlValue(f.Name, data);
                })
                .select2('val', values);
        });

        ctx.FormContext.registerFocusCallback(fieldInternalName, function () {
            $('#'+controlId).focus();
        });

        ctx.FormContext.registerValidationErrorCallback(fieldInternalName, function (errorResult) {
            SPFormControl_AppendValidationErrorMessage(controlId, errorResult);
        });

        var text = '<div><select type="text" class="" id="'+controlId+'" /></div>';


        return text;

    };
    $.extend(window.spBsCtrls, {lookupMulti: lm});

})();
(function(){ //-----------------------SWITCH
    var sw = function  (ctx){
        var f = ctx.ListSchema.Field[0];
        spBsCtrls.optsWrap.customRenderedFields.push(f.Name);
        var fieldInternalName = ctx.CurrentFieldSchema.Name;
        var controlId = f.Id;
        var values = ctx.CurrentItem[f.Name];
        ctx.FormContext.registerInitCallback(fieldInternalName, function () {
            $('#'+controlId)
                .attr('checked', values === "1")
                .bootstrapSwitch()
                .on('switchChange.bootstrapSwitch', function (e, s) {
                    var data = $(e.target).val();
                    ctx.FormContext.updateControlValue(f.Name, data === 'on' ? "1" : "0");
                });
        });

        ctx.FormContext.registerFocusCallback(fieldInternalName, function () {
            $('#'+controlId).focus();
        });

        ctx.FormContext.registerValidationErrorCallback(fieldInternalName, function (errorResult) {
            SPFormControl_AppendValidationErrorMessage(controlId, errorResult);
        });

        var text = '<div><input type="checkbox" class="" id="'+controlId+'" /></div>';


        return text;

    };
    $.extend(window.spBsCtrls, {switch: sw});

})();
(function(){//-------------------ta
    var ta = function  (ctx){
        var f = ctx.ListSchema.Field[0];
        //spBsCtrls.optsWrap.customRenderedFields.push(f.Name);
        var fieldInternalName = ctx.CurrentFieldSchema.Name;
        var controlId = f.Id;
        var values = ctx.CurrentItem[f.Name];
        ctx.FormContext.registerInitCallback(fieldInternalName, function () {
            $('#'+controlId)
                .editable({
                    type:'textarea',
                    title: '??????????????',
                    defaultValue: values,
                    success: function (resp, newValue) {
                        ctx.FormContext.updateControlValue(f.Name, newValue);
                    }
                });


        });

        ctx.FormContext.registerFocusCallback(fieldInternalName, function () {
            $('#'+controlId).focus();
        });

        ctx.FormContext.registerValidationErrorCallback(fieldInternalName, function (errorResult) {
            SPFormControl_AppendValidationErrorMessage(controlId, errorResult);
        });

        var text = '<div style="width:100%"><a  href="#" id="'+controlId+'" >' +values + '</a></div>';


        return text;

    };
    $.extend(window.spBsCtrls, {textarea: ta});

})();
(function(){//This will modify form table row styles to match BS Forms put it in OnPostRender: of jslink
    var fw = function  (ctx){

        var f = ctx.ListSchema.Field[0];
        console.log( f.FieldType);
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
        $labelTdContents //label
            .first()
            .children()
            .first()
            .unwrap()
            .wrap('<label class="control-label col-xs-12 col-sm-2"></label>');
        $labelTdContents //control
            .last()
            .children()
            .first()
            .wrap('<div class="col-xs-12 col-sm-10"></div>');

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
(function(){//This will wrap form table with elements and proper styles put it in OnPreRender: of jslink file
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
(function(){
    var fw = {
        customRenderedFields: []
    };
    $.extend(window.spBsCtrls, {optsWrap: fw});

})();
//var strVar="";
//strVar += "<div class=\"page-header\">";
//strVar += "<h1>Wizard With Progress Bar using events<\/h1>";
//strVar += "<\/div>";
//strVar += "";
//strVar += "<div id=\"rootwizard\">";
//strVar += "<div class=\"navbar\">";
//strVar += "<div class=\"navbar-inner\">";
//strVar += "<div class=\"container\">";
//strVar += "<ul>";
//strVar += "<li><a href=\"#tab1\" data-toggle=\"tab\">First<\/a><\/li>";
//strVar += "<li><a href=\"#tab2\" data-toggle=\"tab\">Second<\/a><\/li>";
//strVar += "<li><a href=\"#tab3\" data-toggle=\"tab\">Third<\/a><\/li>";
//strVar += "<li><a href=\"#tab4\" data-toggle=\"tab\">Forth<\/a><\/li>";
//strVar += "<li><a href=\"#tab5\" data-toggle=\"tab\">Fifth<\/a><\/li>";
//strVar += "<li><a href=\"#tab6\" data-toggle=\"tab\">Sixth<\/a><\/li>";
//strVar += "<li><a href=\"#tab7\" data-toggle=\"tab\">Seventh<\/a><\/li>";
//strVar += "<\/ul>";
//strVar += "<\/div>";
//strVar += "<\/div>";
//strVar += "<\/div>";
//strVar += "<div id=\"bar\" class=\"progress\">";
//strVar += "<div class=\"progress-bar progress-bar-striped\" role=\"progressbar\" aria-valuenow=\"0\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 0%;\"><span class=\"sr-only\">45% Complete<\/span><\/div>";
//strVar += "<\/div>";
//strVar += "<div class=\"tab-content\">";
//strVar += "<div class=\"tab-pane\" id=\"tab1\">";
//strVar += "1";
//strVar += "<\/div>";
//strVar += "<div class=\"tab-pane\" id=\"tab2\">";
//strVar += "2";
//strVar += "<\/div>";
//strVar += "<div class=\"tab-pane\" id=\"tab3\">";
//strVar += "3";
//strVar += "<\/div>";
//strVar += "<div class=\"tab-pane\" id=\"tab4\">";
//strVar += "4";
//strVar += "<\/div>";
//strVar += "<div class=\"tab-pane\" id=\"tab5\">";
//strVar += "5";
//strVar += "<\/div>";
//strVar += "<div class=\"tab-pane\" id=\"tab6\">";
//strVar += "6";
//strVar += "<\/div>";
//strVar += "<div class=\"tab-pane\" id=\"tab7\">";
//strVar += "7";
//strVar += "<\/div>";
//strVar += "<ul class=\"pager wizard\">";
//strVar += "<li class=\"previous first\" style=\"display:none;\"><a href=\"#\">First<\/a><\/li>";
//strVar += "<li class=\"previous\"><a href=\"#\">Previous<\/a><\/li>";
//strVar += "<li class=\"next last\" style=\"display:none;\"><a href=\"#\">Last<\/a><\/li>";
//strVar += "<li class=\"next\"><a href=\"#\">Next<\/a><\/li>";
//strVar += "<\/ul>";
//strVar += "<\/div>";
//# sourceMappingURL=maps/main.js.map