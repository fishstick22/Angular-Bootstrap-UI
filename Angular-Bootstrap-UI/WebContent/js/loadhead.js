/*
 * loadhead.js
 * HTML Imports, part of the Web Components cast, is a way to include HTML documents 
 * in other HTML documents.  
 * https://www.html5rocks.com/en/tutorials/webcomponents/imports/
 */

var baseURL = findBaseURL();

function handleLoad(e) {
	console.log('Loaded import: ' + e.target.href);
}

function handleError(e) {
	console.log('Error loading import: ' + e.target.href);
}

function findBaseURL() {

	var getUrl = window.location;
	var baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1] + "/" + getUrl.pathname.split('/')[2] + "/";
	console.log('baseURL ' + baseUrl);
	return baseUrl;
}

function appendBaseInHead(){

	var base = document.createElement('base');
	base.href = baseURL;
	document.head.appendChild(base);
}

function appendMetaInHead(headContent){

	var metaNodeList = headContent.querySelectorAll('meta');
	for (i = 0; i < metaNodeList.length; i++) {
		console.log('appending meta node ' + metaNodeList[i]);
		document.head.appendChild(metaNodeList[i]);
	}
}

function appendLinkInHead(headContent){

	var linkNodeList = headContent.querySelectorAll('link');
	for (i = 0; i < linkNodeList.length; i++) {
		console.log('appending link node ' + linkNodeList[i] + '' + linkNodeList[i].href);
		var cssHref=linkNodeList[i].href;
		var cssLink = document.createElement('link');
		cssLink.rel='stylesheet';
		cssLink.type='text/css';
		cssLink.href=baseURL+cssHref.slice(cssHref.indexOf('css'));
		console.log('resulting href now ' + cssLink.href);
		document.head.appendChild(cssLink);
	}
}

function appendScriptInHead(headContent){

	var scriptNodeList = headContent.querySelectorAll('script');
	for (i = 0; i < scriptNodeList.length; i++) {
		console.log('appending script node ' + scriptNodeList[i] + ' ' + scriptNodeList[i].src);
		var scriptSrc=scriptNodeList[i].src;
		var jsScript = document.createElement('script');
		jsScript.src = baseURL+scriptSrc.slice(scriptSrc.indexOf('js'));
		console.log('resulting src now ' + jsScript.src);
		document.head.appendChild(jsScript);
	}
}

function appendHead() {
	
	appendBaseInHead();
	
	var headLink = document.getElementById('headLink');
	var headContent = headLink.import;

	console.log('appending head script ' + headLink.rel);

	appendMetaInHead(headContent);
	appendLinkInHead(headContent);
	appendScriptInHead(headContent)

}

function setApp(appName) {
	var body = document.getElementById('appBody');
	body.setAttribute('ng-app', appName);
	// bootstrap again
    //angular.bootstrap(document.getElementById('content'), [appName]);
}

function appendBodyContentFromLink() {
	var bodyLink = document.getElementById('bodyLink');
	var bodyContent = bodyLink.import;
	var myBody = bodyContent.getElementById('demoCtrl');
	console.log('appending body content ' + myBody);
	document.body.appendChild(myBody);
}

function appendBodyContent() {
	// try creating div and inserting
	// <div ng-include="'html/body.html'"></div>
	setApp('demoApp');
	var includeDiv = document.createElement('div');
	includeDiv.setAttribute('ng-include', "'html/body.html'");
	document.body.appendChild(includeDiv);

}

function makeItSo() {

	//baseURL = findBaseURL();
	//appendHead();
	
	appendBodyContentFromLink();
	
}