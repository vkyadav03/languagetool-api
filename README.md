LanguageTool is **the best** choice, for your grammar/spell checking apps, check it out [here](https://languagetool.org/).

**INSTALLATION:**

```
$ npm install languagetool-api
```

After you install package, make sure to require it in your application!

```js
const languagetool = require("languagetool-api");
```

**USAGE:**

`languagetool.check()` takes 2 arguments:

1. Object with request parameters (for more details see: **check() object params**)
2. Callback function

Here's an example:

```js
const languagetool = require("languagetool-api");

var params = {
  language: "pl-PL", // This is required! You can get list of language codes with languagetool.codes
  text: "Piekasz", // This is required too!
  disabledRules: ["CASING", "PUNCTUATION"] // This is optional.
};

languagetool.check(params, function(err, res){
	if(err){
	   console.log(err);
	} else{
	   console.log(res);
	}
});
```

`res` can be used with other functions provided by wrapper. These functions are listed below **check() object params** section.

**check() object params**

As you know, `check()` function needs object with parameters. They're listed and compared below:

|  Name        |   Required?       | Type      |Description      |Example                  |
|--------------|-------------------|-----------|-----------------|-------------------------|
|language      |yes                | string    |Code of language |"pl-PL"                  |
|text          |yes                | string    |Text to check    |"Piekasz"                |
|disabledRules |no                 | array     |Array of rule IDs|["CASING", "PUNCTUATION"]|

**languagetool.showMistakes(res, callback)**

`languagetool.showMistakes` should take `res` from `langaugetool.check` and give you access array of mistakes (as strings).

Here's an example:
```js
languagetool.check(params, function(err, res){
	if(err){
	   console.log(err);
	} else{
	   languagetool.showMistakes(res, function(arr){
	     arr.forEach(function(item){
	       console.log(item);
	     });
	   });
	};
});
```

**languagetool.bestSuggestion(res, callback)**

This function should also take `res` from `languagetool.check`, and give you access to array of objects with properties: `mistake` (string), and `bestSuggestion` (also string).

Here's an example:

```js
languagetool.check(params, function(err, res){
	if(err){
	   console.log(err);
	} else{
	   languagetool.bestSuggestion(res, function(arr){
	     arr.forEach(function(item){
	       console.log("Best suggestion for " + item.mistake + " is " + item.bestSuggestion);
	     });
	   });
	};
});
```

**languagetool.createReport(res)**

This function creates *.json* file, with details about mistakes, language, suggestions etc.

As always, here's an example:

```js 
languagetool.check(params, function(err, res){
	if(err){
	   console.log(err);
	} else{
       languagetool.createReport(res);
	};
});
```

**NOTE:** 
This wrapper utilizes other packages, that are required for languagetool-api to work properly. Github repository doesn't provide them, but package on npmjs.com does. If you got this package from Github, make sure to install them. Packages are listed in package.json file (see: "dependencies").