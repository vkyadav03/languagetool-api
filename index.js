const pkg_info = require("./package.json"),
      request  = require("request"),
	  export_obj = {};
	  
let lng = null
	 
export_obj.check = function(language_code ,text, callback){
	lng = language_code
	let url = encodeURI("https://languagetool.org/api/v2/check?language=" + lng + "&text=" + text);
	request(url, function(error, response, body){
		var output = JSON.parse(body);
		callback(error, output);
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