const pkg_info   = require("./package.json"),
      dateFormat = require("dateformat"),
      fs         = require("fs"),
      request    = require("request"),
	  export_obj = {};
	  	 
export_obj.check = function(obj, callback){
	let url = encodeURI("https://languagetool.org/api/v2/check?language=" + obj.language + "&text=" + obj.text);
	 if(obj.disabledRules != undefined && Array.isArray(obj.disabledRules) == true){
		  url = url + "&disabledRules="
		  obj.disabledRules.forEach(function(rule, ruleI){
			if(ruleI != obj.disabledRules.length - 1){
			   url = url + rule + ","
			} else{
			   url = url + rule
			}
		  })
		 sendRequest();
	 } else if(obj.disabledRules == undefined){
         sendRequest();
	 } else{
		 console.log("Error: disabledRules is not an array!");
		 return console.log("Operation aborted!");
	 } 
    function sendRequest(){
	  request(url, function(error, response, body){
		var output = JSON.parse(body);
		callback(error, output);
	  });
	}
}

export_obj.showMistakes = function(obj, callback){
	var mistakes = [];
	obj.matches.forEach(function(mistake){
		mistakes.push(mistake.context.text.substr(mistake.context.offset, mistake.context.length));
	});
	callback(mistakes);
}

export_obj.bestSuggestion = function(obj, callback){
	var suggestions = [];
    obj.matches.forEach(function(match){
		suggestions.push({
			mistake: match.context.text.substr(match.context.offset, match.context.length), 
			bestSuggestion: match.replacements[0].value
		});
	});
	callback(suggestions);
}

export_obj.createReport = function(obj){
	var now = new Date();
	var dateCreated = dateFormat(now, "dd-mm-yyyy");
	var filename = dateCreated + ".json";
	var mistakes = [];
	var suggestions = [];
    obj.matches.forEach(function(item){
		var mistake = {
		   issue: item.rule.issueType,
		   content: item.context.text.substr(item.context.offset, item.context.length),
		   suggestions: suggestions,
		};
	    item.replacements.forEach(function(suggestion, index){
		  suggestions.push(suggestion.value);
		  if(index == item.replacements.length - 1){
			suggestions = [];
		  }
	    });
        mistakes.push(mistake);		
    });
	var data = {
		reportDate: dateFormat(now, "dd.mm.yyyy (hh:MM)"),
		language: obj.language.name + " (" + obj.language.code + ")",
		mistakes: mistakes 
	}
	if(fs.existsSync("./reports") == true){
	  if(fs.existsSync("./reports/" + filename) != true){
	     console.log("Creating report file...");
	     makeFile();
	  } else{
		 console.log("Overwriting report file...");
	  }	
	  makeFile();	 
	} else{
	   fs.mkdirSync("./reports");
	   console.log("'reports' directory created successfully!");
	   if(fs.existsSync(filename) != true){
		  console.log("Creating report file...");
	   } else{
		  console.log("Overwriting report file...");
	   }
	   makeFile();
	}
    function makeFile(){
	    fs.writeFileSync("./reports/" + filename, JSON.stringify(data));
	    return console.log("Report file " + filename + " has been saved!");
	}	
}

export_obj.getReportFrom = function(obj, callback){
	fs.readFile("./reports/" + obj.day + "-" + obj.month + "-" + obj.year + ".json", {encoding: "utf8"} ,function(err, file){
		var parsedFile = JSON.parse(file);
		callback(err, parsedFile);
	});
}

export_obj.codes = function(){
	request("https://languagetool.org/api/v2/languages", function(error, response, body){
		var language_list = JSON.parse(body);
		language_list.forEach(function(language){
			console.log(language.name + ": " + language.longCode);
		});
	});
}
	  
export_obj.info = function(){
	console.log(pkg_info.name + " by: " + pkg_info.author);
	console.log("Current version: " + pkg_info.version);
	return console.log("Source code: " + pkg_info.repository.url);
}

module.exports = export_obj

function newFunction(file) {
	return JSON.parse(file);
}