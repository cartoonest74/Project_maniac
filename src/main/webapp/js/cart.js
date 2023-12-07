/**
 * 장바구니
 */
//$(function(){
//	const CONTEXTPATH = $("#contextPath").val();
//	const CART_URL = CONTEXTPATH.concat("/product/add-cart");
//
//	let _productNo = 0;
//	let _quantity = 1;
//	$(document).on("click","button[data-productNo]",function(e){
//		if($(e.target).attr("data-productNo") == undefined){
//			return;
//		}
//		_productNo = $(e.target).attr("data-productNo");
//		$.ajax({
//				type: "post",
//				async: true,
//				url: CART_URL,
//				dataType: "text",
//				data: {
//					productNo: _productNo,
//					quantity: _quantity
//				},
//				success: function(data, status) {
//					if(Number(data)!== 0){
//						$("#header_cart_btn").text("CART( "+data+" )");
//					}
//				}
//		    });
//	    })
//});