$(function(){
	
	if(!window.app){
		window.app = {};		
	}

	
	window.app.personSummaryView = Backbone.View.extend({
		
	    myTemplate: _.template($('#person-template-brief').html()),
		
		initialize: function() {
	      this.listenTo(this.model, 'change', this.render);
	      this.listenTo(this.model, 'destroy', this.remove);
	    },
		events: {
			'click .details' : 'viewDetails',
			'click .delete' : 'removePerson'
		},		
		viewDetails: function(event){
			window.app.myAppView.viewDetails(this.model);
			return this;
		},
		removePerson: function(event){
			this.model.destroy();
			return this;
		},
	    render: function() {
			this.$el.html(this.myTemplate({person: this.model}));
			return this;
	    }

	});
	
});