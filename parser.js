var qs = require('querystring')
	;

var arrayRegExp = /^(\w+)\((\d+)\)$/;


//========================================================
// parse
//========================================================
exports.parse = function(response) {
	var result = {};
	var pieces = response.toString().split("&");

	for (var i =0; i < pieces.length; i++) {
		result = this.parseItem(qs.unescape(pieces[i]), result);
	};

	return result;
}

//========================================================
// parseItem
//========================================================
exports.parseItem = function(item, result) {
	var pair = item.split('=').map(function (str) { return str.replace(/"/g, ''); });
	return this.setObjVal(result, pair[0].split('.'), pair[1]);
}

//========================================================
// setObjVal
//========================================================
exports.setObjVal = function(obj, paths, val) {
	var path;
	var arrayInfo;

	if (paths.length === 0) {
		return val;
	}

	obj = obj || {};
	path = paths.shift();
	arrayInfo = path.match(arrayRegExp);

	if (arrayInfo) {
		path = arrayInfo[1];

		if (!Array.isArray(obj[path])) {
			obj[path] = [];
		}

		obj[path][arrayInfo[2]] = this.setObjVal(obj[path][arrayInfo[2]], paths, val);
	} else {
		obj[path] = this.setObjVal(obj[path], paths, val);
	}

	return obj;
}
