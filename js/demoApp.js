
_.templateSettings = {
	interpolate : /#(.+?)#/g
};

$(function(){
	
	window.app.idGenerator = {
		id: 0,
		newId: function() {
			return ++this.id;
		}
	};

    Backbone.history.start();	
	window.app.myAppView = new window.app.appView();


});