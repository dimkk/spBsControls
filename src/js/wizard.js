///**
// * Created by sp-admin on 4/13/2015.
// */
//    window.MultiLookupField = function (ctx) {
//        var fieldInternalName = ctx.CurrentFieldSchema.Name;
//        var controlId = fieldInternalName + "_control";
//
//        ctx.FormContext.registerInitCallback(fieldInternalName, function () {
//            $addHandler($get(controlId), "change", function (e) {
//                ctx.FormContext.updateControlValue(fieldInternalName, $get(controlId).value);
//            });
//        });
//
//        ctx.FormContext.registerFocusCallback(fieldInternalName, function () {
//            $get(controlId).focus();
//        });
//
//        ctx.FormContext.registerValidationErrorCallback(fieldInternalName, function (errorResult) {
//            SPFormControl_AppendValidationErrorMessage(controlId, errorResult);
//        });
//
//        var text = String.format('<div id="{0}"></id>', controlId);
//        console.log(controlId);
//
//        return text;
//    };
//
//var a = '<div id="myPillbox" class="pillbox pills-editable"> <ul class="clearfix pill-group"><li class="btn btn-default pill" data-value="acai">	<span>Acai</span>	<span class="glyphicon glyphicon-close">		<span class="sr-only">Remove</span>	</span></li><li class="btn btn-default pill" data-value="acai">	<span>Acai</span>	<span class="glyphicon glyphicon-close"><span class="sr-only">Remove</span>	</span></li> <li class="pillbox-input-wrap btn-group"><a class="pillbox-more">and <span class="pillbox-more-count"></span> more...</a> <input type="text" class="form-control dropdown-toggle pillbox-add-item" placeholder="add item" size="10" style="display: block;"><button type="button" class="dropdown-toggle sr-only"> <span class="caret"></span> <span class="sr-only">Toggle Dropdown</span> </button> <ul class="suggest dropdown-menu" role="menu" data-toggle="dropdown" data-flip="auto" style="visibility: visible;"></ul> </li> </ul> </div>';