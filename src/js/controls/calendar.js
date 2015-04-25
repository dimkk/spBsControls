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