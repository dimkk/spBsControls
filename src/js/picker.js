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