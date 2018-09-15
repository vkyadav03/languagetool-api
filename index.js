const pkg_info = require("./package.json"),
      request  = require("request"),
	  export_obj = {};
	  
let lng = null
	 
export_obj.setLanguage = function(language_code){
	lng = language_code
}

export_obj.check = function(text){
	let url = encodeURI("https://languagetool.org/api/v2/check?language=" + lng + "&text=" + text);
	request(url, function(error, response, body){
		if(!error && response.statusCode == 200){
		   var output = JSON.parse(body);
		   if(output.matches.length == 0){
			  console.log("Your spelling was correct.");
		   } else{
			  output.matches.forEach(function(match){
				  console.log("Mistake detected" + " (" + text.substr(match.offset, match.length) + ")");
				  if(match.replacements.length != 0){
				     console.log("Did you mean: " + match.replacements[0].value + "?");
				  } else{
					 console.log("There are no suggestions avalible.")
				  }
			  });			  
		   }
		   console.log(" ");
		   console.log("This wrapper was made for " + output.software.name + " (current version: " + output.software.version + ")");
		} else{
		   console.log(error);
		}
	})
}

export_obj.languageCodes = function(){
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
}

module.exports = export_obj