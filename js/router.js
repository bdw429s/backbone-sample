$(function(){
	
		if(!window.app){
		window.app = {};		
	}

    window.app.appRouter = Backbone.Router.extend({
		routes: {
            "view/:id": "viewSomeone"
        },
		viewSomeone: function(id) {
			doSomething(id);
			var routedModel = window.app.myAppView.myPersonCollection.get(id);
			if(routedModel) {
				window.app.myAppView.viewDetails(routedModel);	
			} else {
				alert('User with an id of ' + id + ' couldn\'t be found.');
			}
		}
    });
	
});