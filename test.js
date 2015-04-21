// The file has been created, saved into "/Style Library/"
// and attached to the LFWP via JSLink property.

SP.SOD.executeFunc("clienttemplates.js", "SPClientTemplates", function() {

  function getBaseHtml(ctx) {
    return SPClientTemplates["_defaultTemplates"].Fields.default.all.all[ctx.CurrentFieldSchema.FieldType][ctx.BaseViewID](ctx);
  }

  function init() {

    SPClientTemplates.TemplateManager.RegisterTemplateOverrides({

      OnPreRender: form, //Это обёртка для того, чтобы бутстрап заработал на форме

      Templates: {

           Fields: {
               //Здесь указываем нужное поле, которое надо изменить и контекст в котором изменение нужно Делать
               "<Field Internal Name Goes Here>": { //Сюда вставляем internal name поля
                   //View: function(ctx) { return ""; },
                   EditForm: picker
                   //DisplayForm: function(ctx) { return ""; },
                   //NewForm: function(ctx) { return ""; },
               }
           }

      },

      OnPostRender: field, // Модифицирует дом так, чтобы применились стили форм бутстрапа

      ListTemplateType: 100001

    });
  }

    //Обёртка для формы
  var form = function (ctx) {
      spBsCtrls.formWrap(ctx);
  }
    //Обёртка для поля
  var field = function (ctx) {
      spBsCtrls.fieldWrap(ctx);
  }
    //Обёртка для контролов (само определяет что рендерить в зависимости от типа поля)
  var picker = function (ctx) {
      return spBsCtrls.picker(ctx);
  }
      //Тут можно посмотреть пример пути который указывать в ссылке на JS в свойствах вебчасти формы листа
  RegisterModuleInit(SPClientTemplates.Utility.ReplaceUrlTokens("~siteCollection/Style Library/test.js"), init);
  init();

});
