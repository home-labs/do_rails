var
    Location;


(function($) {
    "use strict";

    var
        self = window.location,

        escape = function(param) {
            return param.replace(/\$/, "\\$");
        },

        pattern = function(param) {
            param = escape(param);
            // better solution for now in JS, but select the catch (?, &)
            // (?:[?&])foo(?:=([^&#]+))?\b
            return new RegExp("(?:[?&])" + param +
                              "(?:=([^&#]+))?\\b", "g");
        },

        separator = function(captured) {
            return captured[0] ? captured[0] : "?";
        },

        clean = function(param) {
            return self.search.replace(pattern(param), function(captured) {
                return separator(captured) + param;
            });
        };


    try {

        Object.defineProperties($.prototype, {
            queryParam: {
                value: function(param, value) {
                    if (param) param = param.trim();

                    var
                        uri = self.href,
                        search = self.search,
                        results,
                        regexp = pattern(param),

                        set = function(param, value) {
                            value = encodeURIComponent(value.toString().trim());

                            if (regexp.test(search)) {
                                if (value) {
                                    search = search.replace(regexp,
                                    function(captured, i, string) {
                                        return separator(captured) + param +
                                        "=" + value;
                                    });
                                } else {
                                    search = clean(param);
                                }
                                uri = self.origin + self
                                    .pathname + search + self.hash;
                            } else {
                                uri = window.location.origin + window.location
                                    .pathname + window.location.search +
                                    separator(search) + param + "=" + value +
                                    window.location.hash;
                            }

                            window.history.pushState("", "", uri);
                        };

                    if (value || typeof value == "string") {
                        set(param, value);
                        return self;
                    }

                    results = regexp.exec(search);
                    if (!results) return null;
                    return decodeURIComponent(results[1].replace(/\+/g, " "));
                }
            },

            unsetParam: {
                value: function(param) {
                    var
                        uri = self.href,
                        search = self.search;

                    if (param) param = param.trim();

                    if (pattern(param).test(search)) {
                        search = clean(param);
                        uri = self.origin + self
                            .pathname + search + self.hash;
                    }

                    window.history.pushState("", "", uri);

                    return self;
                }
            }
        });

    } catch(e) {}

})(Location);

// the solution with positive lookbehind. Works in Python.
// (?<=(?:[?&]))foo(?:=[^&#]+)?\b
// the string for test
// ?foo=bar&foo=bar&foo&nonfoo=bar&nonfoo&foo#foo=bar