$(function(){
	
	window.app = {};

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
	
	
	window.app.appView = Backbone.View.extend({
		el: $("#app"),		
	    myTemplate: _.template($('#app-template').html()),
		myPersonDetailsView: null,
		myPersonCollection: null,
		myAppRouter: null,
		initialize: function(){
			
			this.render();
							
			window.app.personDetailsView = Backbone.View.extend({
				
				el: $("#userDetails"),
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
					var newName = prompt('Please enter a new name',this.model.get('name'));
					this.model.set('name',newName);
					this.model.collection.sort();
					event.preventDefault();
					return this;
				},
				 	
				editAge: function(event){
					var newAge = prompt('Please enter a new age',this.model.get('age'));
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
					

			
			var myPerson = new window.app.person({name: "Brad Wood", age: 33, cool: true});
			var myPerson2 = new window.app.person({name: "Rachel Wood", age: 31, cool: false});			
			this.myPersonCollection = new window.app.personCollection(myPerson);
			this.myPersonCollection.add(myPerson2);
			this.myPersonCollection.add({name: "Alexis Wood", age: 7, cool: true});
			this.myPersonCollection.add([
				{name: "Eliza Wood", age: 3, cool: false},
				{name: "Oivia Wood", age: 1.5, cool: true}
			]);
	
    		this.myAppRouter = new window.app.appRouter;
			
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
				this.myPersonDetailsView = new window.app.personDetailsView({model: model})
			} else {
				this.myPersonDetailsView.unBind();
				this.myPersonDetailsView.model = model;
				this.myPersonDetailsView.initialize();
			}
			
			this.myPersonDetailsView.render();
			this.myAppRouter.navigate('view/' + model.get('id'));
		},			 	
	    render: function() {
			$('#app').html(this.myTemplate());
			return this;
	    }
				
    });
		
    window.app.appRouter = Backbone.Router.extend({
        routes: {
            "view/:id": "viewSomeone"
        },
		viewSomeone: function(id) {
			var routedModel = window.app.myAppView.myPersonCollection.get(id);
			if(routedModel) {
				window.app.myAppView.viewDetails(routedModel);	
			} else {
				alert('User with an id of ' + id + ' couldn\'t be found.');
			}
		}
    });
	
	window.app.idGenerator = {
		id: 0,
		newId: function() {
			return ++this.id;
		}
	};
			
    Backbone.history.start();
	window.app.myAppView = new window.app.appView();


});