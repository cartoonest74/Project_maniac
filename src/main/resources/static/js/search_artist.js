
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

    const object_foreach=(jsonObject, appendTagId) => {
         const temp_arr = [];
         Object.keys(jsonObject).forEach(value =>{
                let jsonValue = JSON.parse(jsonObject[value]);
                let artist_id = jsonValue.id;
                let artist_image = jsonValue.main_img;
                let artist_name = jsonValue.name;
                let create_tag = `
                    <dl class="search_artistInfo" data-artist-no="${artist_id}">
                        <dd class="search_artistImg">
                            <button data-search-artist="${artist_id}">
                                <img data-search-artist="${artist_id}" src="${artist_image}" alt="${artist_name}">
                            </button>
                        </dd>
                        <dt class="search_artistName">
                            <h2>${artist_name}</h2>
                        </dt>
                    </dl>
                `
                temp_arr.push(create_tag)
                });
         let create_tags = temp_arr.join(",");
         document.querySelector(`div${appendTagId}`).innerHTML = create_tags;
    };

    $(document).on("click","button[data-search-artist]",async function(e){
        const artist_id = e.target.getAttribute("data-search-artist");
        const resolve_countUp =`/search-count?artist_id=${artist_id}`;
        await fetch(resolve_countUp,{method:"put"})
        .then(response=>response.text())
        .then(data=>location.href=data);
    });
    // 타이핑 될 때마다 해당 검색어와 관련된 artist 보여주기
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
                            const artistSearch_array = data.artistSearch_array;
                            object_foreach(artistSearch_array,"#searchShow");
                    });
    });


    // 조회가 가장많은 artist Top3를 검색박스 상단에 보여주기 위해 가져오기
    $("#searchBtn").click(async function(){
        const resolve_artistSearch_max ="/artist-search-max";
        const res = await fetch(resolve_artistSearch_max,{
                        method:"post"
                    })
                    .then(response=>response.json())
                    .then(data=>{
                         const artistSearchMax_array = data.artistSearchMax_array;
                         object_foreach(artistSearchMax_array,"#topSearch");
                    })
    })
});