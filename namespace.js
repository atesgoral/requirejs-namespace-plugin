/*!
 * @license RequireJS Namespace Plugin, Copyright (c) 2013 Ates Goral
 * @version 0.0.1
 * Loads modules into a namespace
 */
define(function () {
    return {
        load: function (name, req, onload, config) {
            var tokens = name.split(":"),
                modules = tokens[1].split(","),
                path = [ tokens[0] ];

            var paths = modules.map(function (module) {
                path[1] = module;
                return path.join("/");
            });

            req(paths, function () {
                var namespace = {},
                    args = arguments;

                modules.forEach(function (module, idx) {
                    namespace[module] = args[idx];
                });

                onload(namespace);
            });
        }
    };
});
