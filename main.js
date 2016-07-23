$(function(){
	var $orders = $(".order-list");
	var $name = $('#name');
	var $order = $('#order');

	function addOrder(order){
		$orders.append('<li><button title="remove" class="remove" data-id=' + order.id +' >x</button><span>Name: </span>' + order.name +'<br /><span>Order: </span>' + order.order + '</li>');
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
			// error: function(){
			// 	alert("error saving data");
			// }
		});
	});

	$orders.on('click', '.remove', function(event) {
		$li = $(this).parent();
		// alert($(this).attr('data-id'));

		$.ajax({
			url: 'http://rest.learncode.academy/api/rizwanahmed/orders/' + $(this).attr('data-id'),
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
	
});