/**
 * navLeft
 */
$(function(){
	const artistId = document.getElementById("artistId").value;
	const currentArtist = document.getElementById("currentArtist");
    const get_artistName = async ()=>{
        const resolve_getArtistName = `/artist/${artistId}`;
        await fetch(resolve_getArtistName,{
                method: "post",
            }).then(response=>response.text())
            .then(result=>{
                currentArtist.innerText=result;
            });
    };
    get_artistName();
//    const cartCount = ()=>{
//        const cartLength = $("input[data-cart]").attr("data-cart").trim();
//        console.log("cartLength= ",cartLength)
//    }
//    cartCount();
});
