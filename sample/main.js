require.config({
    paths: {
        namespace: "../namespace"
    },
    config: {
        namespace: {
            "widgets": "button,dialog,fields",
            "widgets/fields": "textfield,textarea"
        }
    }
});

define([ "namespace!widgets" ], function (widgets) {
    var app = {
        widgets: widgets
    };

    console.dir(app);
});
