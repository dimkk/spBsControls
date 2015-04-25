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