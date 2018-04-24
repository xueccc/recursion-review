// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  
  var matchingNodes = [];
  var recurseAndPopulateNodesThatMatchClassname = function(element) {
  	if (element.classList && element.classList.contains(className)) {
  		matchingNodes.push(element);
  	}
  	if (!element.childNodes) {
  		return; // no-op
  	} else {
  		for (var i = 0; i < element.childNodes.length; i++) {
  			recurseAndPopulateNodesThatMatchClassname(element.childNodes[i]);
  		}
  	}
  }
  recurseAndPopulateNodesThatMatchClassname(document.body);

  return matchingNodes;
};
