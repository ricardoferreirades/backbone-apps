//Backbone Model
var Blog = Backbone.Model.extend({
    defaults: {
        author: '',
        title: '',
        url: ''
    }
});

// creating a Collection 
var Blogs = Backbone.Collection.extend({});

//Instantiate two blogs
// var blog1 = new Blog({
//     author: 'Ricardo',
//     title: 'Ricardo\'s blog',
//     ulr: 'http://ricardoblog.com'
// });

// var blog2 = new Blog({
//     author: 'Renato',
//     title: 'Renato\'s blog',
//     ulr: 'http://renatoblog.com'
// });

//Instantiate a collection

var blogs = new Blogs();

var BlogView = Backbone.View.extend({
    model: new Blog(),
    tagName: 'tr',
    initialize: function() {
        this.template = _.template( $( '.blog-list-template' ).html() )
    },
    events: {
        'click .edit-blog': 'edit',
        'click .update-blog': 'update',
        'click .cancel': 'cancel',
        'click .delete': 'delete'
    },
    edit: function() {
        this.$('.edit-blog').hide();
        this.$('.delete-blog').hide();
        this.$('.update-blog').show();
        this.$('.cancel').show();

        var data_inputs = ['author', 'title', 'url'];
        
        for ( var i = 0; i < data_inputs.length; i++ ) {
            this.$( '.' + data_inputs[ i ] ).html( '<input type="text" class="form-control ' + data_inputs[ i ] + '-update' + '" value="' + $( '.' + data_inputs[ i ] ).html() + '">' );
        }
            
    },
    update: function() {
        this.model.set( 'author', $( '.author-update' ).val() );
        this.model.set( 'title', $( '.title-update' ).val() );
        this.model.set( 'url' , $( '.url-update' ).val() );
    },
    cancel: function() {
        blogsView.render()
    },
    delete: function(){
        this.model.destroy();
    },
    render: function() {
        this.$el.html( this.template( this.model.toJSON() ) );
        return this;
    }
});

var BlogsView = Backbone.View.extend({
    model: blogs,
    el: $( '.blogs-list' ),
    initialize: function () {
        var self = this;
        this.model.on( 'add', this.render, this );
        this.model.on( 'change', function() {
            setTimeout( function() {
                self.render()
            }, 30)
        }, this );
        this.model.on( 'remove', this.render, this );
    },
    render: function() {
        var self = this;
        this.$el.html('');
        _.each( this.model.toArray(), function( blog ) {
            self.$el.append( ( new BlogView( { model: blog } ) ).render().$el );
            return this;
        });
    }
});

var blogsView = new BlogsView();

$( function() {
    var $author = $('.author-input'),
        $title = $('.title-input'),
        $url = $('.url-input');

    $('.add-blog').on( 'click', function() {
        var blog = new Blog({
            author: $author.val(),
            title: $title.val(),
            url: $url.val()
        });
        console.log( blog.toJSON() );
        blogs.add( blog );
    })
});