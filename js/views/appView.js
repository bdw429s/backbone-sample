$(function(){
	
	if(!window.app){
		window.app = {};
	}

	window.app.appView = Backbone.View.extend({
		el: $("#app-container"),		
	    myTemplate: _.template($('#app-template').html()),
		myPersonDetailsView: null,
		myPersonCollection: null,
		myAppRouter: null,
		logoURL: 'images/backbone.png',
		initialize: function(){
			
			this.render();
					
			var myPerson = new window.app.person({name: "Brad Wood", age: 33, cool: true});
			var myPerson2 = new window.app.person({name: "Rachel Wood", age: 31, cool: false});			
			this.myPersonCollection = new window.app.personCollection(myPerson);
			this.myPersonCollection.add(myPerson2);
			this.myPersonCollection.add({name: "Alexis Wood", age: 7, cool: true});
			this.myPersonCollection.add([
				{name: "Eliza Wood", age: 3, cool: false},
				{name: "Oivia Wood", age: 1.5, cool: true}
			]);
	
    		this.myAppRouter = new window.app.appRouter();
			
		},
		events: {
			'click .new' : 'newPerson',
		},		
		newPerson: function(event){
			var newName = prompt('Please enter a name','');
			var newAge = prompt('Please enter an age','');
			var newCool = (prompt('Is this person cool?','') == 'yes'? true : false);
			this.myPersonCollection.add({name: newName, age: newAge, cool: newCool});
			return this;
		},
		viewDetails: function(model){
			// Create detail view once and then reuse
			if (!this.myPersonDetailsView) {
				this.myPersonDetailsView = new window.app.personDetailsView({model: model, el: $('#userDetails')})
			} else {
				this.myPersonDetailsView.unBind();
				this.myPersonDetailsView.model = model;
				this.myPersonDetailsView.initialize();
			}
			
			this.myPersonDetailsView.render();
			this.myAppRouter.navigate('view/' + model.get('id'));
		},			 	
	    render: function() {
			this.$el.html(this.myTemplate({logoURL: this.logoURL}));
			return this;
	    }
				
    });
	
});