// The file has been created, saved into "/Style Library/"
// and attached to the LFWP via JSLink property.

SP.SOD.executeFunc("clienttemplates.js", "SPClientTemplates", function() {

    function getBaseHtml(ctx) {
        return SPClientTemplates["_defaultTemplates"].Fields.default.all.all[ctx.CurrentFieldSchema.FieldType][ctx.BaseViewID](ctx);
    }

    function init() {

        SPClientTemplates.TemplateManager.RegisterTemplateOverrides({

            OnPreRender: form,

            Templates: {

                Fields: {
                    "calendar": {
                        EditForm: picker,
                        NewForm: picker
                    },
                    "boolean": {
                        EditForm: picker,
                        NewForm: picker
                    },
                    "lookup": {
                        EditForm: function(ctx){
                            var params = {
                                templateResult: function (item) {
                                    var $item = $('<span style="text-decoration:underline">'+item.id+'</span> ' + '<span style="font-weight: bold">'+item.text+'</span>');;
                                    return $item;
                                }
                            };
                            return picker(ctx, params);
                        },
                        NewForm: picker
                    },
                    "multilookup": {
                        EditForm: picker,
                        NewForm: picker
                    },
                    "multichoice": {
                        EditForm: picker,
                        NewForm: picker
                    },
                    "choice": {
                        EditForm: picker,
                        NewForm: picker
                    }

                }

            },

            OnPostRender: field,

            ListTemplateType: 100

        });
    }
    //This is form wrapper
    var form = function (ctx) {
        spBsCtrls.formWrap(ctx);
    }

    //This is field wrapper
    var field = function (ctx) {
        spBsCtrls.fieldWrap(ctx);
    }

    //This is picker to choose controls
    var picker = function (ctx, params) {
        return spBsCtrls.picker(ctx, params);
    }
    RegisterModuleInit(SPClientTemplates.Utility.ReplaceUrlTokens("~siteCollection/Style Library/supertest.js"), init);
    init();

});