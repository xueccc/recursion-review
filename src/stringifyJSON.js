// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {

    var result;

    if (
        typeof obj === 'number'  ||
        typeof obj === 'boolean' ||
        obj === null
    ) {
        result = ''+obj; // Quick operation that casts to String
    } else if (typeof obj === 'string') {
        result = wrapWithQuotes(obj);
    } else if (Array.isArray(obj)) {
        result = '[';

        var arrayValues = [];
        for(var i = 0; i < obj.length; i++) {
            arrayValues.push(stringifyJSON(obj[i]));
        }

        result += arrayValues.join(',');
        result += ']';
    } else if (typeof obj === 'object') {
        result = '{';

        var objectResults = [];
        for(var key in obj) {
            if (!valueIsUnsupported(obj[key])) {
               objectResults.push(wrapWithQuotes(key) + ':' + stringifyJSON(obj[key]));
            }
        }

        result += objectResults.join(',');
        result += '}';
    }

    return result;
};

var wrapWithQuotes = function(val) {
	return '"'+val+'"';
}

var valueIsUnsupported = function(val) {
	if (typeof val === 'function' || val === undefined) {
		return true;
	} else {
		return false;
	}
};
