$(function(){
 // btn_like
    $(document).on("click","[data-btn-like]",function(e){
        const _ProductId = $(e.target).attr("data-btn-like");
        const _categoryId = $(e.target).attr("data-btn-artistId");
        const solid_heatTag = `<i data-btn-like="${_ProductId}" style="color:#d43f3f" class="fa-solid  fa-heart fa-lg"></i>`;
        const regular_heatTag = `<i data-btn-like="${_ProductId}" class="fa-regular  fa-heart fa-lg"></i>`;
        const add_like_mapping = "/add-like";
        const delete_like_mapping = "/del-like";

    //  solid
        if($(e.target).hasClass("fa-regular")){
            $.ajax({
                type:"PUT",
                async:true,
                url:add_like_mapping,
                dataType:"text",
                data:{
                    productId:_ProductId,
                    categoryId:_categoryId
                },
                success: function(data, status){
                    if(Number(data)==0){
                        return alert("로그인 플리스")
                    }
                    $("button[data-btn-like="+_ProductId+"]").html(solid_heatTag)
                }
            });
            return
        }

    // regular
        if($(e.target).hasClass("fa-solid")){
            const like_json = new Object();
            const arr_check = [];
            arr_check.push({"productId":Number(_ProductId)});
            like_json.like = arr_check;
            const _strLike_json = JSON.stringify(like_json);
            $.ajax({
                    type:"DELETE",
                    async:true,
                    url:delete_like_mapping,
                    dataType:"text",
                    data:{
                        like_json:_strLike_json
                    },
                    success: function(data, status){
                        $("button[data-btn-like="+_ProductId+"]").html(regular_heatTag);
                    }
            });
        }
    });
});