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