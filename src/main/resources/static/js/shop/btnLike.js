$(function(){
    const body_append = (position, tag)=>{
        const body = document.querySelector("body");
        body.insertAdjacentHTML(position,tag);
    }
 // btn_like
    async function add_like_axios(resolveMapping,_method,formData, _ProductId, heartTag){
        const artistId = document.querySelector("#artistId").value;

        // loading
        const loading_tag='<div id="loadingTag" style="position:fixed; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:10;"></div>'
        body_append("afterbegin",loading_tag);
        const loadingTag =  document.querySelector("div#loadingTag");

        const res = await fetch(resolveMapping,{
                method:_method,
                body:formData})
                .then((response)=>response.text())
                .then((data)=>{
                    if(Number(data)==0){
                        window.location.href=`/${artistId}/member/login-account`
                        return;
                    }
                    const btnLike_ico = document.querySelector(`button[data-btn-like="${_ProductId}"]`);
                    btnLike_ico.innerHTML=heartTag;
                }).catch(error=>console.log(error));
        loadingTag.remove();
    }

    $(document).on("click","button[data-btn-like]",async function(e){
        const _ProductId = e.target.getAttribute("data-btn-like");
        const _categoryId = e.target.getAttribute("data-btn-artistId");
        const solid_heatTag = `<i data-btn-like="${_ProductId}" data-btn-artistId="${_categoryId}" style="color:#d43f3f" class="fa-solid  fa-heart fa-lg"></i>`;
        const regular_heatTag = `<i data-btn-like="${_ProductId}" data-btn-artistId="${_categoryId}" class="fa-regular  fa-heart fa-lg"></i>`;
        const add_like_mapping = "/add-like";
        const delete_like_mapping = "/del-like";
        const formData = new FormData();
        let _method = ""
    //  solid
        if(e.target.classList.contains("fa-regular")){
            formData.append("productId",_ProductId);
            formData.append("categoryId",_categoryId);
            _method = "PUT";
            const regular_like = await add_like_axios(add_like_mapping,_method,formData, _ProductId,solid_heatTag);
            return
        }

    // regular
        if(e.target.classList.contains("fa-solid")){
            const like_json = new Object();
            const arr_check = [];
            arr_check.push({"productId":Number(_ProductId)});
            like_json.like = arr_check;
            const _strLike_json = JSON.stringify(like_json);
            formData.append("like_json",_strLike_json)
            _method = "DELETE";
            const regular_like = await add_like_axios(delete_like_mapping,_method,formData, _ProductId,regular_heatTag)
        }
    });
});