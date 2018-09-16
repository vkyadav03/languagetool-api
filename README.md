LanguageTool is **the best** choice, for your grammar/spell checking apps, check it out [here](https://languagetool.org/).

**INSTALLATION:**

`npm install languagetool-api`

After you install package, make sure to require it!

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
  language: "pl-PL", // This is required!
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

**check() object params**

As you know, `check()` function needs object with parameters. They're listed and compared below:

|  Name        |   Required?       | Type      |Description      |Example                  |
|--------------|-------------------|-----------|-----------------|-------------------------|
|language      |yes                | string    |Code of language |pl-PL                    |
|text          |yes                | string    |Text to check    |Piekasz                  |
|disabledRules |no                 | array     |Array of rule IDs|["CASING", "PUNCTUATION"]|

**NOTE:** 
This wrapper utilizes *request* package, that is required for languagetool-api to work properly. Github repository doesn't provide it, but package on npmjs.com does. If you got this package from Github, make sure to install the *request* package with:
`npm install request`