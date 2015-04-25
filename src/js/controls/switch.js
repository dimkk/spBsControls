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