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