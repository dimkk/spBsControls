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
    $.extend(window.spBsCtrls, {bsSwitch: sw});

})();