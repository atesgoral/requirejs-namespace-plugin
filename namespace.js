/*!
 * @license RequireJS Namespace Plugin, Copyright (c) 2013 Ates Goral
 * @version 0.0.1
 * Loads modules into a namespace
 */
define(function () {
    return {
        load: function (name, req, onload, config) {
            var modules = config.namespace && config.namespace[name],
                path = [ name ];

            if (!modules) {
                var err = new Error("Module configuration is missing");
                err.namespaceModule = name;
                onload.error(err);
                return;
            }

            modules = modules.split(",");

            var paths = modules.map(function (module) {
                path[1] = module;
                module = path.join("/");

                if (config.namespace[module]) {
                    module = "namespace!" + module;
                }

                return module;
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
