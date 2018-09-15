LanguageTool is **the best** choice, for your grammar/spell checking apps, check it out [here](https://languagetool.org/).

**INSTALLATION:**

`npm install languagetool-api`

After you install package, make sure to require it!

```js
const languagetool = require("languagetool-api");
```

**SETUP IN YOUR .JS FILE**

languagetool-api needs to know language code, in order to work properly. You set language with:

```js
languagetool.setLanguage("pl-PL"); // If you don't know language codes, try languagetool.languageCodes(), to get full list of codes.
```

After that, you're good to check spelling. Here's how you do this:

```js

languagetool.check("piekasz"); 

/* 

Piekasz is incorrect! You should get output like this:

Mistake detected (piekasz)
Did you mean: piekarz?
 
*/


```

**NOTE:**

This wrapper is in early phase of development, currently it has very basic functionality. It also relies on [LanguageTool HTTP API](http://wiki.languagetool.org/public-http-api), be aware of its eventual limitations.