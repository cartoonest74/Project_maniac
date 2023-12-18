/**
 * navLeft
 */
$(function(){
	const contextPath = $("#contextPath").val();
	const artistId = $("#artistId").val();
    $.ajax({
        type: "post",
        async: true,
        url: `/artist/${artistId}`,
        dataType: "text",
        success: function(data, textStatus) {
            $("#currentArtist").html(data);
        }
    });

    const cartCount = ()=>{
        const cartLength = $("input[data-cart]").attr("data-cart").trim();
        console.log("cartLength= ",cartLength)
    }
    cartCount();
});
