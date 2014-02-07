/*!
 * @license RequireJS Namespace Plugin, Copyright (c) 2013 Ates Goral
 * @version 0.0.2
 * Loads modules into a namespace
 */
define([ 'module' ], function (module) {
    return {
        load: function (name, req, onload, config) {
            var localConfig = module.config();

            var modules = localConfig[name];

            if (!modules) {
                var err = new Error('Module configuration is missing');
                err.namespaceModule = name;
                onload.error(err);
                return;
            }
            
            function createPaths(modules, prefix) {
                var path;
                if (!prefix) {
                    path = [ name ];
                }
                
                if (typeof prefix === 'string') {
                    path = [ prefix ];
                }
    
                // Accept an Array
                if (modules instanceof Array) {
                    return modules.map(function (module) {
                        path[1] = module;
                        module = path.join("/");
        
                        if (localConfig[module]) {
                            module = "namespace!" + module;
                        }
        
                        return module;
                    });
                }
                return [];
            }

            var paths;
            if (typeof modules === 'object') {
                paths = createPaths(modules.files, modules.prefix);
                modules = modules.files;
            }
            
            if (typeof modules === 'string') {
                modules = modules.split(',');
                paths = createPaths(modules);
            }

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
