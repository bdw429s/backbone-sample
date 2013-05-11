$(function(){

	
	if(!window.app){
		window.app = {};		
	}

	window.app.person = Backbone.Model.extend({
	
		defaults: function() {
		  return {
		    name: "new person",
		    age: 21,
		    cool: false,
			id: window.app.idGenerator.newId()
		  };
		},		
		sayHello: function() {
		  return 'Hi, my name is "' + this.get('name') + '" and I am ' + (this.get('cool')? 'cool': 'not cool') + '.';
		},
		sync: function () { return false; }
			
	});
	
});