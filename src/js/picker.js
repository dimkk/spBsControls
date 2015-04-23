(function(){//Picker. This will pick the right control to render
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
                return spBsCtrls.bsSwitch(ctx);
                break;
            case 'Note':
                return spBsCtrls.textarea(ctx);
                break;
        }
    }
    $.extend(window.spBsCtrls, {picker: pi});

})();