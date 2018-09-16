const pkg_info = require("./package.json"),
      request  = require("request"),
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
		  request(url, function(error, response, body){
		    var output = JSON.parse(body);
		    callback(error, output);
	      })
	 } else if(obj.disabledRules == undefined){
	     request(url, function(error, response, body){
		   var output = JSON.parse(body);
		   callback(error, output);
		 })
	 } else{
		 console.log("Error: disabledRules is not an array!");
		 return
	 }
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
}

module.exports = export_obj
