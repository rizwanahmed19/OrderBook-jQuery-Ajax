$(function(){
	var $orders = $(".order-list");
	var $name = $('#name');
	var $order = $('#order');

	function addOrder(order){
		$orders.append('<li data-id=' + order.id +'><button title="remove" class="remove">x</button><b>Name: </b><span class="name no-edit">' + order.name +'</span><input type="text" class="edit name"><br /><b>Order: </b><span class="order no-edit">' + order.order + '</span><input type="text" class="edit order"><br><button class="edit-btn edit-order no-edit">Edit</button><button class="edit-btn save-order edit">Save</button><button class="edit-btn cancel-edit edit">Cancel</button> </li>');
	}

	$.ajax({
		url: 'http://rest.learncode.academy/api/rizwanahmed/orders',
		method: 'GET',
		success: function(orders){
			$.each(orders, function(index, order) {
				addOrder(order);			
			});
		},
		error: function(){
			alert('error loading data');
		}
	});

	$('#add-order').on('click', function(event) {
		/* Act on the event */
		var orderToAdd = {
			name: $name.val(),
			order: $order.val()
		};

		$.ajax({
			url: 'http://rest.learncode.academy/api/rizwanahmed/orders',
			method: 'POST',
			data: orderToAdd,
			success: function(newOrder){
				$name.val("");
				$order.val("");
			}
		});
	});

	$orders.on('click', '.remove', function(event) {
		$li = $(this).parent();
		$.ajax({
			url: 'http://rest.learncode.academy/api/rizwanahmed/orders/' + $li.attr('data-id'),
			type: 'DELETE',
		})
		.done(function() {
			$li.fadeOut('300', function() {
				$(this).remove();
			});
		})
		.fail(function() {
			alert("error removing data");
		});
		
	});

	$orders.on('click', '.edit-order', function(event) {
		/* Act on the event */
		$li = $(this).parent();
		$li.find('input.name').val( $li.find('span.name').html() );
		$li.find('input.order').val( $li.find('span.order').html() );
		$li.addClass('edit');
	});
	
	$orders.on('click', '.cancel-edit', function(event) {
		/* Act on the event */
		$(this).parent().removeClass('edit');
	});

	$orders.on('click', '.save-order', function(event) {
		$li = $(this).parent();
		var orderToUpdate = {
			name: $li.find('input.name').val(),
			order: $li.find('input.order').val()
		};

		$.ajax({
			url: 'http://rest.learncode.academy/api/rizwanahmed/orders/' + $li.attr('data-id'),
			type: 'PUT',
			data: orderToUpdate,
			success: function(newOrder){
				$li.find('span.name').html(orderToUpdate.name);
				$li.find('span.order').html(orderToUpdate.order);
				$li.removeClass('edit');
			},
			error: function(){
				alert('error updating data');
			}
		});

		
	});
});