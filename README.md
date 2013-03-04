# RequireJS Namespace Plugin
A RequireJS plugin for construcing namespaces from modules.

## Rationale

There is a lot of error-prone boilerplate involved with defining a namespace when using regular means.

Let's say we're trying to define a 'fruits' namespace. The folder structure is follows:

```
app
 \- main.js
 \- fruits
     \- all.js
     \- apple.js
     \- banana.js
     \- apple.js
```

The app/fruits/all.js file contains:

```js
define([
	"./apple",
	"./banana",
	"./kiwi"
], function (apple, banana, kiwi) {
	return {
		apple: apple,
		banana: banana,
		kiwi: kiwi
	};
})
```

app/main.js uses this namespace module to extend the 'app' namespace:

```js
require([ "fruits/all" ], function (fruits) {
	var app = {
		fruits: fruits
	};

	// ...
});
```

With the Namespace plugin, you can eliminate the boilerplate and just use a path mapping configuration.

A slight adjustment to the folder structure to avoid a circular loop when 'fruits' is going be used as the parent of a child namespace:

```
app
 \- main.js
 \- namespace.js
 \- ns_fruits
     \- apple.js
     \- banana.js
     \- apple.js
```

app/main.js sets up the path mapping and directly uses the fruits namespace:

```js
require.config({
	map: {
		"*": {
			"fruits": "namespace!ns_fruits:apple,banana,kiwi"
		}
    }
});

require([ "fruits" ], function (fruits) {
	var app = {
		fruits: fruits
	};

	// ...
});
```

In a nested folder scenario:

```
app
 \- main.js
 \- namespace.js
 \- ns_fruits
     \- ns_apples
         \- red.js
         \- green.js
         \- golden.js
     \- banana.js
     \- apple.js
```

The following path mapping does the job:

```js
require.config({
	map: {
		"*": {
			"fruits": "namespace!ns_fruits:apples,banana,kiwi",
			"ns_fruits/apples": "namespace!ns_fruits/ns_apples:red,green,golden"
		}
    }
});

require([ "fruits" ], function (fruits) {
	var app = {
		fruits: fruits
	};

	// ...
});
```
