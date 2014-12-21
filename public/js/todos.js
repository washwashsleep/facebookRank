var EnterKey = 13;
var IdsList = []
$.fn.isBound = function(type, fn) {
    var data = this.data('events')[type];

    if (data === undefined || data.length === 0) {
      return false;
    }
    return (-1 !== $.inArray(fn, data));
};

$(document).ready(function() {
	function runBind() {
    $('.destroy').on('click', function(e) {
      $currentListItem = $(this).closest('li');

      $currentListItem.remove();
    });

    $('.toggle').on('click', function(e) {
      var $currentListItemLabel = $(this).closest('li').find('label');

	  if ( $currentListItemLabel.attr('data') == 'done' ) {
		  $currentListItemLabel.attr('data', '');
	      $currentListItemLabel.css('text-decoration', 'none');
	  }
	  else {
		  $currentListItemLabel.attr('data', 'done');
      $currentListItemLabel.css('text-decoration', 'line-through');
	  }
		});
	}

  $todoList = $('#todo-list');
  $('#new-todo').keypress(function(e) {
    var $this = $(this);
    if (e.which === EnterKey) {
      var newTodo = $('#new-todo');
      var fansId = newTodo.val().split('?')[0].split('/').pop();
      $.get('http://graph.facebook.com/' + fansId , function( data ) {
        if(data.likes && IdsList.indexOf(data.id)<0){
          IdsList.push(data.id);
          var picture = 'http://graph.facebook.com/' + data.id + '/picture?width=30&height=30';
          var name = data.name;
          $('.destroy', '.toggle').off('click');
          var todos = $todoList.html();
          todos += ""+
            "<li>" +
              "<div class='view'>" +
                "<img src=" + picture + " />" +
                "<label data=''>" + " " + data.name + "</label>" +
                "<a class='destroy'></a>" +
              "</div>" +
            "</li>";
          $this.val('');
          $todoList.html(todos);
          runBind();
          $('#main').show();
          foo();
        }else{
          alert( "error" );
          $this.val('');
        }
      }).fail(function() {
        alert( "error" );
        $this.val('');
      });
    }
  });
  $('#fansCreate').on('click', function(){
    $.post('/fans/activeCreate', {fansIds:IdsList}, function(data){
      window.location.href = '/fans/list'
    });
  });
  $('#test').on('click', function(){
    $.post('/fans/activeCreate', {fansIds:[138881822836993, 1502894619932654, 190423601015316]})
  });
});

