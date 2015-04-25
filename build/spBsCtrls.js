/**
 * Created by sp-admin on 4/15/2015.
 */
window.spBsCtrls = window.spBsCtrls || {};
(function(){//Common - this is common methods to support data flow for CSR
    var c = {
        /**
         * Return array of values from multi-choice field string CSR
         * @param str
         * @returns {Array}
         */
        getChoicesArrayFromString: function (str) {
            if (str) {
                var result = str.split(';#');
                result.pop();
                result.shift();
                return result;
            };
        },
        /**
         * Return string to save to CSR multichoice field
         * @param arr
         * @returns {string}
         */
        getChoicesStringFromArray: function (arr) {
            if (arr && arr.length) {
                var result = arr.join(';#');
                result = ';#' + result + ';#';
                return result;
            }
        },
        /**
         * Return string to save to CSR lookup field
         * @param arr
         * @returns {string}
         */
        getLookupValuesFromIdsArray: function (arr) {
            if (arr && arr.length) {
                var result = _.map(arr, function (d) {
                    return d + ';#';
                })
                    .join(';#');
                return result;
            }
        },
        /**
         *  return array of ids from lookup field CSR value
         * @param str
         * @returns {Array|*}
         */
        getLookupIdsFromString: function (str) {
            if (str) {
                var result = $.map(str.split(';#'),
                    function (item, idx) {
                        if (idx % 2 == 0) {
                            return item
                        }
                    });
                return result;
            };
        },
        /**
         * Determine version of IE
         * @returns {*} version of IE or false
         */
        ie:function(){
            var undef,
                v = 3,
                div = document.createElement('div'),
                all = div.getElementsByTagName('i');

            while (
                div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
                    all[0]
                );

            return v > 4 ? v : undef;

        },
        /**
         * Adds script with id to head, will not double add
         * @param id
         * @param src
         */
        addScript: function (id, src) {
            if (!id || !src) return;
            if(!document.getElementById(id)) {
                var script = document.createElement('script');
                script.id = id;
                script.src = src;
                document.head.appendChild(script);
            }
        },
        /**
         * adds style to head
         * @param href
         */
        addStyle: function (href) {
            var fileref = document.createElement("link");
            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", href);
        }
    };
    $.extend(window.spBsCtrls, {common: c});

})();
(function(){
    var opts = {
        customRenderedFields: [],
        formWrapOptions:{ //Options for formWrapper
            width:0.95, //Percent width
            widthSelector:'#DeltaPlaceHolderMain', //Selector of element to get the width of form
            formClass:'form-horizontal' //class for bs form
        },
        fieldWrapOptions:{
            labelClasses:'col-xs-12 col-sm-2',
            controlClasses:'col-xs-12 col-sm-10'
        }
    };
    var ctrl = {
        calendar:{
            locale:'ru'
        },
        choice:{

        },
        choiceMulti:{
            multiple:true
        },
        lookup:{

        },
        lookupMulti:{
            multiple:true
        },
        boolean:{

        }
    };
    $.extend(window.spBsCtrls, {
        optsWrap: opts,
        optsCtrl: ctrl
    });
})();
(function(){//Picker. This will pick the right control to render
    var pi = function (ctx, params) {
        var fieldType = ctx.ListSchema.Field[0].FieldType;
        switch(fieldType){
            case 'Lookup':
                return spBsCtrls.lookup(ctx, params);
                break;
            case 'LookupMulti':
                return spBsCtrls.lookupMulti(ctx, params);
                break;
            case 'DateTime':
                return spBsCtrls.calendar(ctx, params);
                break;
            case 'Choice':
                return spBsCtrls.choice(ctx, params);
                break;
            case 'MultiChoice':
                return spBsCtrls.choiceMulti(ctx, params);
                break;
            case 'Boolean':
                return spBsCtrls.bsSwitch(ctx, params);
                break;
            //case 'Note':
            //    return spBsCtrls.textarea(ctx);
            //    break;
        }
    }
    $.extend(window.spBsCtrls, {picker: pi});

})();
(function(){//-------------------CALENDAR
    var cal = function  (ctx, params){
        var opts = $.extend({}, params, spBsCtrls.optsCtrl.calendar);
        var f = ctx.ListSchema.Field[0];
        var fieldInternalName = ctx.CurrentFieldSchema.Name;
        var controlId = f.Id;
        var choices = ctx.CurrentFieldSchema.Choices;
        var values, date, format, affix = '';
        if (f.DisplayFormat === 0){
            values = ctx.CurrentItem[f.Name].split(' ')[0]; //Дата
            format = 'DD.MM.YYYY';
            affix = ' 0:0';
        } else if (f.DisplayFormat === 1) {
            values = ctx.CurrentItem[f.Name]; //Дата и время
            format = 'DD.MM.YYYY hh:mm';
        }
        date = new Date(values);
        if (!date.getTime()){
            date = moment(values, format);
        };

        ctx.FormContext.registerInitCallback(fieldInternalName, function () {
            opts.date = date;
            opts.format = opts.format || format;
            $('#'+controlId)
                .datetimepicker(opts)
                .on('dp.change', function (e) {
                    var data = $(e.target).val();
                    ctx.FormContext.updateControlValue(f.Name, data + affix);
                })

        });

        ctx.FormContext.registerFocusCallback(fieldInternalName, function () {
            $('#'+controlId).focus();
        });

        ctx.FormContext.registerValidationErrorCallback(fieldInternalName, function (errorResult) {
            SPFormControl_AppendValidationErrorMessage(controlId, errorResult);
        });

        var text = '<div><input type="text" id="'+controlId+'" values="'+values+'" /></div>';


        return text;

    };
    $.extend(window.spBsCtrls, {calendar: cal});

})();
(function(){
    var ch = function  (ctx, params){
        var opts = $.extend({}, params, spBsCtrls.optsCtrl.choice);
        var f = ctx.ListSchema.Field[0];
        spBsCtrls.optsWrap.customRenderedFields.push(f.Name);
        var fieldInternalName = ctx.CurrentFieldSchema.Name;
        var controlId = f.Id;
        var choices = ctx.CurrentFieldSchema.Choices;
        var values = spBsCtrls.common.getLookupIdsFromString(ctx.CurrentItem[f.Name]);
        ctx.FormContext.registerInitCallback(fieldInternalName, function () {
            var normChoices = choices;
            opts.data = normChoices
            $('#'+controlId)
                .select2(opts)
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
    var cm = function  (ctx, params){
        var opts = $.extend({}, params, spBsCtrls.optsCtrl.choiceMulti);
        var f = ctx.ListSchema.Field[0];
        spBsCtrls.optsWrap.customRenderedFields.push(f.Name);
        var fieldInternalName = ctx.CurrentFieldSchema.Name;
        var controlId = f.Id;
        var choices = ctx.CurrentFieldSchema.MultiChoices;
        var values = spBsCtrls.common.getChoicesArrayFromString(ctx.CurrentItem[f.Name]);
        ctx.FormContext.registerInitCallback(fieldInternalName, function () {
            var normChoices = choices;
            opts.data = normChoices;
            $('#'+controlId)
                .select2(opts)
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
    var lu = function  (ctx, params){
        var opts = $.extend({}, params, spBsCtrls.optsCtrl.lookup);
        var f = ctx.ListSchema.Field[0];
        spBsCtrls.optsWrap.customRenderedFields.push(f.Name);
        var fieldInternalName = ctx.CurrentFieldSchema.Name;
        var controlId = f.Id;
        var choices = ctx.CurrentFieldSchema.Choices;
        var values = spBsCtrls.common.getLookupIdsFromString(ctx.CurrentItem[f.Name]);
        ctx.FormContext.registerInitCallback(fieldInternalName, function () {
            var normChoices = $.map(choices, function(choice){ return {text: choice.LookupValue, id:choice.LookupId}  });
            opts.data = normChoices;
            $('#'+controlId)
                .select2(opts)
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
    var lm = function  (ctx, params){
        var opts = $.extend({}, params, spBsCtrls.optsCtrl.lookupMulti);
        var f = ctx.ListSchema.Field[0];
        spBsCtrls.optsWrap.customRenderedFields.push(f.Name);
        var fieldInternalName = ctx.CurrentFieldSchema.Name;
        var controlId = f.Id;
        var choices = ctx.CurrentFieldSchema.Choices;
        var values = spBsCtrls.common.getLookupIdsFromString(ctx.CurrentItem[f.Name]);
        ctx.FormContext.registerInitCallback(fieldInternalName, function () {
            var normChoices = $.map(choices, function(choice){ return {text: choice.LookupValue, id:choice.LookupId}  });
            opts.data = normChoices;
            $('#'+controlId)
                .select2(opts)
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
    var sw = function  (ctx, params){
        var opts = $.extend({}, params, spBsCtrls.optsCtrl.boolean, $.fn.bootstrapSwitch.defaults);
        var f = ctx.ListSchema.Field[0];
        spBsCtrls.optsWrap.customRenderedFields.push(f.Name);
        var fieldInternalName = ctx.CurrentFieldSchema.Name;
        var controlId = f.Id;
        var values = ctx.CurrentItem[f.Name];
        ctx.FormContext.registerInitCallback(fieldInternalName, function () {
            opts.state = values === "1" ? 'checked' : '';
            $('#'+controlId)
                .bootstrapSwitch(opts)
                .on('switchChange.bootstrapSwitch', function (e, s) {
                    var data = $(e.target)
                        //.closest('bootstrap-switch'
                        .parent()
                        .parent()
                        .hasClass('bootstrap-switch-on'); //switch doesnot set checkecd attr on input - this is workaround
                    ctx.FormContext.updateControlValue(f.Name, data ? "1" : "0");
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
    $.extend(window.spBsCtrls, {bsSwitch: sw});

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