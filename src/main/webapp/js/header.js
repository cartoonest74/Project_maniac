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
});
