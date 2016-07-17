$(function(){
	var $orders = $(".order-list");

	$.ajax({
		url: 'api/orders.json',
		type: 'GET',
		success: function(orders){
			$.each(orders, function(index, order) {
				$orders.append('<li><span>Name: </span>' + order.name +' <span>Order: </span>' + order.order + '</li>');
			});
		}
	});
	
});