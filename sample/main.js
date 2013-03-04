require.config({
    paths: {
		namespace: "../namespace"
	},
	map: {
		"*": {
			"widgets": "namespace!ns_widgets:button,dialog,fields",
			"ns_widgets/fields": "namespace!ns_widgets/ns_fields:textfield,textarea"
		}
    }
});

define([ "widgets" ], function (widgets) {
	var app = {
		widgets: widgets
	};

	console.dir(app);
});
