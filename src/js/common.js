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
        },
        ie:function(){
            var undef,
                v = 3,
                div = document.createElement('div'),
                all = div.getElementsByTagName('i');

            while (
                div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
                    all[0]
                );

            return v > 4 ? v : undef;

        },
        addScript: function (id, src) {
            if (!id || !src) return;
            if(!document.getElementById(id)) {
                var script = document.createElement('script');
                script.id = id;
                script.src = src;
                document.head.appendChild(script);
            }
        }
    };
    $.extend(window.spBsCtrls, {common: c});

})();