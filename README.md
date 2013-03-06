# RequireJS Namespace Plugin
A RequireJS plugin for collecting modules into a namespace.

## Before

There is a lot of error-prone boilerplate involved with defining a namespace by regular means.

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

The above definitely doesn't meet the DRY principle.

app/main.js uses this namespace module to extend the 'app' namespace:

```js
require([ "fruits/all" ], function (fruits) {
    var app = {
        fruits: fruits
    };

    /*
    app === {
        fruits: {
            apple: <apple object>,
            banana: <banana object>,
            kiwi: <kiwi object>
        }
    }
    */
});
```

## After

With the Namespace plugin, you can eliminate the boilerplate:

```
app
 \- main.js
 \- namespace.js
 \- fruits
     \- apple.js
     \- banana.js
     \- apple.js
```

app/main.js sets up some configuration and loads the 'fruits' namespace with the 'namespace!' plugin prefix:

```js
require.config({
    config: {
        namespace: {
            "fruits": "apple,banana,kiwi"
        }
    }
});

require([ "namespace!fruits" ], function (fruits) {
    var app = {
        fruits: fruits
    };

    /*
    app === {
        fruits: {
            apple: <apple object>,
            banana: <banana object>,
            kiwi: <kiwi object>
        }
    }
    */
});
```

In a nested folder scenario:

```
app
 \- main.js
 \- namespace.js
 \- fruits
     \- apples
         \- red.js
         \- green.js
         \- golden.js
     \- banana.js
     \- apple.js
```

The following configuration does the job:

```js
require.config({
    config: {
        namespace: {
            "fruits": "apples,banana,kiwi",
            "fruits/apples": "red,green,golden"
        }
    }
});

require([ "namespace!fruits" ], function (fruits) {
    var app = {
        fruits: fruits
    };

    /*
    app === {
        fruits: {
            apples: {
                red: <red apple object>,
                green: <green apple object>,
                golden: <golden apple object>
            },
            banana: <banana object>,
            kiwi: <kiwi object>
        }
    }
    */
});
```

## License

MIT
