
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
                        <dd class="search_artistImg">
                            <button data-search-artist="${artist_id}">
                                <img data-search-artist="${artist_id}" src="${CONTEXTPATH}${artist_image}" alt="${artist_name}">
                            </button>
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

    $(document).on("click","button[data-search-artist]",async function(e){
        const artist_id = e.target.getAttribute("data-search-artist");
        const resolve_countUp =`/search-count?artist_id=${artist_id}`;
        await fetch(resolve_countUp,{method:"put"})
        .then(response=>response.text())
        .then(data=>location.href=data);
    });

    $("#artist_search").keyup(async function(){
        const _search_text = $(this).val();
        const searchShow = "#searchShow";
        const search_text_length = _search_text.length;
        const resolve_artist_search = "/artist-search";
        if (_search_text  < 1 && _search_text == ''){
            return $(searchShow).html();
        }
        const formData = new FormData();
        formData.append("search_text",_search_text);

        const res = await fetch(resolve_artist_search,{
                        method:"post",
                        body:formData
                    })
                    .then(response=>response.json())
                    .then(data=>{
                            object_foreach(data,"#searchShow");
                    });
    });



    $("#searchBtn").click(async function(){
        const resolve_artistSearch_max ="/artist-search-max";
        const res = await fetch(resolve_artistSearch_max,{
                        method:"post"
                    })
                    .then(response=>response.json());
                    .then(data=>{
                         object_foreach(data,"#topSearch");
                    })
    })
});