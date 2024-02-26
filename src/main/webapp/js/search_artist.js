
$(function(){
    const search_boxTurnOff = (turnOff)=>{
        const search_box = document.getElementById("search_box");
        search_box.style.display =turnOff;
    }
    const close_searchBox = document.getElementById("close_searchBox");
    close_searchBox.addEventListener("click",function(){
        search_boxTurnOff("none");
    });

    $("#searchBtn").click(()=>{
        search_boxTurnOff("inline-flex");
    });

    const CONTEXTPATH = document.getElementById("contextPath").value;
    const object_foreach=(jsonObject, appendTagId) => {
         const temp_arr = [];
         Object.keys(jsonObject).forEach(value =>{
                let jsonValue = jsonObject[value]
                let artist_array = jsonValue.split(",")
                let artist_id = artist_array[0];
                let artist_image = artist_array[1];
                let artist_name = artist_array[2];
                let create_tag = `
                    <dl class="search_artistInfo" data-artist-no="${artist_id}">
                        <dd class="serach_artistImg">
                            <a href="${CONTEXTPATH}/main/${artist_id}">
                                <img src="${CONTEXTPATH}${artist_image}" alt="${artist_name}">
                            </a>
                        </dd>
                        <dt class="search_artistName">
                            <h2>${artist_name}</h2>
                        </dt>
                    </dl>
                `
                temp_arr.push(create_tag)
                });
         let create_tags = temp_arr.join(",")
         $(appendTagId).html(create_tags);
    };

    $("#artist_search").keyup(function(){
        const _search_text = $(this).val();
        const searchShow = "#searchShow";
        const search_text_length = _search_text.length;
        if (_search_text  < 1 && _search_text == ''){
            return $(searchShow).html();
        }
        $.ajax({
            type:"post",
            async: true,
            url: "/artist-search",
            dataType: "json",
            data:{
                search_text: _search_text
            },
            success:function(data, textStatus){
                object_foreach(data,"#searchShow");
            }
        });
    });



    $("#searchBtn").click(function(){
        $.ajax({
            type:"post",
            async: true,
            url:"/artist-search-max",
            dataType:"json",
            success:function(data, textStatus){
                 object_foreach(data,"#topSearch");
            }
        });
    })
});