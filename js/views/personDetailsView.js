$(function(){
	
	if(!window.app){
		window.app = {};		
	}
					
	window.app.personDetailsView = Backbone.View.extend({
		
	    myTemplate: _.template($('#person-template').html()),

		initialize: function() {
	      this.listenTo(this.model, 'change', this.render);
	      this.listenTo(this.model, 'destroy', this.clear);
	    },
		
		events: {
			'click .editName' : 'editName',
			'click .editAge' : 'editAge'
		},
		 	
		editName: function(event){
			var newName = prompt('Please enter a new name',this.model.get('name')) || this.model.get('name');
			this.model.set('name',newName);
			this.model.collection.sort();
			event.preventDefault();
			return this;
		},
		 	
		editAge: function(event){
			var newAge = prompt('Please enter a new age',this.model.get('age')) || this.model.get('age');
			this.model.set('age',newAge);
			event.preventDefault();
			return this;
		},
		
	    clear: function() {
			this.$el.html('');
			return this;
	    },
		
	    unBind: function() {
			this.stopListening(this.model);
			return this;
	    },
		 		 	
	    render: function() {
			this.$el.html(this.myTemplate({person: this.model}));
			return this;			
	    }

	});
	
});