(function(){//This will modify form table row styles to match BS Forms
    var c = {
        getChoicesArrayFromString: function (str) {
            var result =str.split(';#');
            result.pop();
            result.shift();

            return result;
        },
        getChoicesStringFromArray: function (arr) {
            var result = arr.join(';#');
                result = ';#' +  result + ';#';
            return result;
        },
      getLookupValuesFromIdsArray: function (arr) {
          var result = _.map(arr, function(d){
              return d + ';#';
          })
              .join(';#');
          return result;
      },
        getLookupIdsFromString: function (str) {
            var result = $.map(str.split(';#'),
                function(item, idx){
                    if (idx % 2 == 0){return item}
                });
            return result;
        }
    };
    $.extend(window.spBsCtrls, {common: c});

})();