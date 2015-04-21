// The file has been created, saved into "/Style Library/"
// and attached to the LFWP via JSLink property.

SP.SOD.executeFunc("clienttemplates.js", "SPClientTemplates", function() {

  function getBaseHtml(ctx) {
    return SPClientTemplates["_defaultTemplates"].Fields.default.all.all[ctx.CurrentFieldSchema.FieldType][ctx.BaseViewID](ctx);
  }

  function init() {

    SPClientTemplates.TemplateManager.RegisterTemplateOverrides({

      OnPreRender: form, //��� ������ ��� ����, ����� �������� ��������� �� �����

      Templates: {

           Fields: {
               //����� ��������� ������ ����, ������� ���� �������� � �������� � ������� ��������� ����� ������
               "<Field Internal Name Goes Here>": { //���� ��������� internal name ����
                   //View: function(ctx) { return ""; },
                   EditForm: picker
                   //DisplayForm: function(ctx) { return ""; },
                   //NewForm: function(ctx) { return ""; },
               }
           }

      },

      OnPostRender: field, // ������������ ��� ���, ����� ����������� ����� ���� ���������

      ListTemplateType: 100001

    });
  }

    //������ ��� �����
  var form = function (ctx) {
      spBsCtrls.formWrap(ctx);
  }
    //������ ��� ����
  var field = function (ctx) {
      spBsCtrls.fieldWrap(ctx);
  }
    //������ ��� ��������� (���� ���������� ��� ��������� � ����������� �� ���� ����)
  var picker = function (ctx) {
      return spBsCtrls.picker(ctx);
  }
      //��� ����� ���������� ������ ���� ������� ��������� � ������ �� JS � ��������� �������� ����� �����
  RegisterModuleInit(SPClientTemplates.Utility.ReplaceUrlTokens("~siteCollection/Style Library/test.js"), init);
  init();

});
