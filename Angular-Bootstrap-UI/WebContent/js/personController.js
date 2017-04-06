/**
 * personController.js
 * PersonController and Person factory
 * angular code for online example of basic CRUD app using Spring MVC REST
 * http://www.concretepage.com/spring-4/spring-mvc-4-rest-angularjs-hibernate-4-integration-crud-tutorial-with-ngresource-example
 */

"use strict";
/* demoApp defined in demoApp.js
 * 
 * var app = angular.module('demoApp', [ 'ngResource','ngRoute' ]);
 */
//how to supply this in and environment-specific properties file?
//var dbHost = 'http://IBMT440PC03M14N.caremarkrx.net:8080';
var dbHost = 'http://localhost:8080';

app.factory('Person', [ '$resource', function($resource) {
	return $resource(dbHost+'/info/person/:personId', {
		personId : '@pid'
	},
		{
			updatePerson : {
				method : 'PUT'
			}
		}
	);
} ]);

app.controller('PersonController', [ '$scope', 'Person', function($scope, Person) {
	var ob = this;
	ob.persons = [];
	ob.person = new Person();
	
	ob.fetchAllPersons = function() {
		console.log('Inside fetchAllPersons');
		ob.persons = Person.query();
	};
	//ob.fetchAllPersons(); //don't load data by default
	
	ob.setPersonFormScope = function(personForm){
		console.log('Inside setPersonFormScope');
		// is this actually sending the element?
		console.log('..' + personForm.$name);
		//for(thing in personForm)console.log('...' + thing);
		
		ob.personForm = personForm;
	};
	ob.personNameExists = function(){
		console.log('Inside personNameExists');
		exists = false;
		
		angular.forEach(ob.persons, function(person, key){
			angular.forEach(person, function(value, key){
				//console.log('key:' + key + ' value:' + value);
				if(key==='name'){ 
					//console.log('found:' + value + ' ' + ob.person.name);
					if(value == ob.person.name){
						console.log('found:' + value + ' == ' + ob.person.name);
						exists = true;						
					}
				} 

			})
		});
		if (ob.personForm)
			if(exists){
				ob.personForm.name.$setValidity("duplicate", false);	
			}else{
				ob.personForm.name.$setValidity("duplicate", true);
			}
			
		
		return exists;
	};
	ob.addPerson = function() {
		console.log('Inside save');
		if (ob.personForm.$valid) {
			ob.person.$save(function(person) {
				console.log('saving ...');
				console.log(person);
				ob.flag = 'created';
				ob.reset();
				console.log('finishing...');
				ob.fetchAllPersons();
			},
				function(err) {
					console.log(err.status);
					ob.flag = 'failed';
				}
			);
		}
	};
	ob.editPerson = function(id) {
		console.log('Inside edit');
		ob.person = Person.get({
			personId : id
		}, function() {
			ob.flag = 'edit';
		});
	};
	ob.updatePersonDetail = function() {
		console.log('Inside update');
		if (ob.personForm.$valid) {
			ob.person.$updatePerson(function(person) {
				console.log(person);
				ob.updatedId = person.pid;
				ob.reset();
				ob.flag = 'updated';
				ob.fetchAllPersons();
			});
		}
	};
	ob.deletePerson = function(id) {
		console.log('Inside delete');
		ob.person = Person.delete({
			personId : id
		}, function() {
			ob.reset();
			ob.flag = 'deleted';
			ob.fetchAllPersons();
		});
	};
	ob.reset = function() {
		ob.person = new Person();
		ob.personForm.$setPristine();
	};
	ob.cancelUpdate = function(id) {
		ob.person = new Person();
		ob.flag = '';
		ob.fetchAllPersons();
	};
	ob.personEmpty = function() {
		return Object.keys(ob.person).length === 0;
	};
} ]);