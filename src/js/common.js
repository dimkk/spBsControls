(function(){//Common - this is common methods to support data flow for CSR
    var c = {
        /**
         * Return array of values from multi-choice field string CSR
         * @param str
         * @returns {Array}
         */
        getChoicesArrayFromString: function (str) {
            if (str) {
                var result = str.split(';#');
                result.pop();
                result.shift();
                return result;
            };
        },
        /**
         * Return string to save to CSR multichoice field
         * @param arr
         * @returns {string}
         */
        getChoicesStringFromArray: function (arr) {
            if (arr && arr.length) {
                var result = arr.join(';#');
                result = ';#' + result + ';#';
                return result;
            }
        },
        /**
         * Return string to save to CSR lookup field
         * @param arr
         * @returns {string}
         */
        getLookupValuesFromIdsArray: function (arr) {
            if (arr && arr.length) {
                var result = _.map(arr, function (d) {
                    return d + ';#';
                })
                    .join(';#');
                return result;
            }
        },
        /**
         *  return array of ids from lookup field CSR value
         * @param str
         * @returns {Array|*}
         */
        getLookupIdsFromString: function (str) {
            if (str) {
                var result = $.map(str.split(';#'),
                    function (item, idx) {
                        if (idx % 2 == 0) {
                            return item
                        }
                    });
                return result;
            };
        },
        /**
         * Determine version of IE
         * @returns {*} version of IE or false
         */
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
        /**
         * Adds script with id to head, will not double add
         * @param id
         * @param src
         */
        addScript: function (id, src) {
            if (!id || !src) return;
            if(!document.getElementById(id)) {
                var script = document.createElement('script');
                script.id = id;
                script.src = src;
                document.head.appendChild(script);
            }
        },
        /**
         * adds style to head
         * @param href
         */
        addStyle: function (href) {
            var fileref = document.createElement("link");
            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", href);
        }
    };
    $.extend(window.spBsCtrls, {common: c});

})();