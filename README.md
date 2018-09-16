LanguageTool is **the best** choice, for your grammar/spell checking apps, check it out [here](https://languagetool.org/).

**INSTALLATION:**

`npm install languagetool-api`

After you install package, make sure to require it!

```js
const languagetool = require("languagetool-api");
```

**USAGE:**

`languagetool.check()` takes 3 arguments:

1. language code (if you don't know code of your language, try `languagetool.codes()`, to get full list of language codes)
2. text to check
3. callback function

Here's an example:

```js

languagetool.check("pl-PL", "piekasz", function(err, res){
  if(err){
     console.log("An error has occurred!");
  } else{
     console.log(res)
  }
}); 

// The above callback will responde with error message or object.
// Also, piekasz is still incorrect!

```

NOTE: This wrapper utilizes *request* package, that is required for languagetool-api to work properly. Github repository doesn't provide it, but package on npmjs.com does.