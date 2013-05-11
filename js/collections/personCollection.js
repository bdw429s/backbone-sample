$(function(){
	
	if(!window.app){
		window.app = {};		
	}

	
	window.app.personCollection = Backbone.Collection.extend({
	    model: window.app.person,
	
		initialize: function() {
	      this.listenTo(this, 'add', this.render);
	      this.listenTo(this, 'sort', this.render);
	    },
		comparator: function(person) {
  			return person.get("name").toLowerCase();
		},
	    render: function() {
			$('#userList').html('');
			this.each(
				function(model){
					var myPersonSummaryView = new window.app.personSummaryView({model: model});
					$('#userList').append(myPersonSummaryView.render().$el);
				});
			return this;
	    }
		
	});

});