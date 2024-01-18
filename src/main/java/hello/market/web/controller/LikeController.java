package hello.market.web.controller;

import hello.market.dto.Artist;
import hello.market.dto.Like;
import hello.market.dto.Product;
import hello.market.service.like.LikeService;
import hello.market.service.product.ProductService;
import hello.market.web.session.LoginSessionManager;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@Slf4j
@RequiredArgsConstructor
public class LikeController {

    private final LoginSessionManager loginSessionManager;
    private final LikeService likeService;

    private final StringBuilder like_menuTag = new StringBuilder();
    private final StringBuilder like_categoryTag = new StringBuilder();

    @ResponseBody
    @PutMapping("/add-like")
    private String addLike(@RequestParam Integer productId, @RequestParam Integer categoryId, HttpServletRequest request) {
        Integer user_id = loginSessionManager.sessionUUIDcheck(request);
        if(user_id ==0){
            return "0";
        }
        String json_key = new StringBuilder()
                .append("$.p")
                .append(productId)
                .toString();

        likeService.addLike(user_id, json_key, categoryId);
        return "1";
    }

    @ResponseBody
    @DeleteMapping("/del-like")
    private String delLike(@RequestParam JSONObject like_json, HttpServletRequest request){
        like_categoryTag.setLength(0);
        Integer user_id = loginSessionManager.sessionUUIDcheck(request);
        JSONArray like_arr = like_json.getJSONArray("like");

        for(int i = 0; i< like_arr.length(); i++){
            Integer del_productId = (Integer) ((JSONObject) like_arr.get(i)).get("productId");
            String json_key = new StringBuilder()
                    .append("$.p")
                    .append(del_productId)
                    .toString();
            likeService.delLike(1, json_key);
        }

        like_categoryTag.append("<button data-like-category=\"")
                .append(0)
                .append("\" class=\"likeCategory\" type=\"button\">")
                .append("All")
                .append("</button>");
        List<Artist> artists = likeService.likeCategory(user_id);
        for (Artist artist : artists) {
            create_likeCategoryTag(artist);
        }
        String categoryTagString = like_categoryTag.toString();
        return categoryTagString;
    }

    @ResponseBody
    @PostMapping("/{artistId}/like/view")
    private String post_showLike(@PathVariable int artistId,@RequestParam int page, @RequestParam int limit,@RequestParam int categoryId, HttpServletRequest request){
        like_menuTag.setLength(0);

        Integer user_id = loginSessionManager.sessionUUIDcheck(request);
//        if(StringUtils.hasText(String.valueOf(user_id))){
//            return "0";
//        }

        List<Product> products = likeService.showAllLike(user_id, limit, categoryId);
        for (Product product : products) {
            create_likeTag(product);
        }

        Integer likeLength = likeService.likeLength(user_id, categoryId);
        String like_menuTagString = like_menuTag.toString();

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("allCount", likeLength);
        jsonObject.put("content", like_menuTagString);
        return jsonObject.toString();
    }

    @GetMapping("/{artistId}/like/view")
    private String get_showLike(@PathVariable int artistId,@RequestParam(value="page",required = false,defaultValue = "1")int page,
                                HttpServletRequest request, Model model){
        page = page < 1 ? 1 : page;
        int limit = (page - 1) * 20;
        Integer user_id = loginSessionManager.sessionUUIDcheck(request);
        List<Product> products = likeService.showAllLike(user_id, limit, 0);
        Integer likeLength = likeService.likeLength(user_id, 0);
        List<Artist> artists = likeService.likeCategory(user_id);

        model.addAttribute("category", artists);
        model.addAttribute("artistId", artistId);
        model.addAttribute("likeMenuList", products);
        return "/like/like";
    }

    private void create_likeCategoryTag(Artist artist){
        int artistId = artist.getId();
        String artistName = artist.getName();
        like_categoryTag.append("<button data-like-category=\"")
                .append(artistId)
                .append("\" class=\"likeCategory\" type=\"button\">")
                .append(artistName)
                .append("</button>");
    }

    private void create_likeTag(Product product){
        int artistId = product.getArtistId();
        int productId = product.getId();
        String productMapping = new StringBuilder()
                .append("/product/")
                .append(artistId)
                .append("/find-product/")
                .append(productId)
                .toString();
        String productTitle = product.getTitle();
        String productPrice = product.getPrice();
        String mainImg = product.getMainImg();

        like_menuTag.append("<li class=\"likeContentBox\">")
                        .append("<div class=\"likeCheckBox\">")
                            .append("<input type=\"checkbox\" data-check-product=\""+productId+"\" name=\""+productTitle+"\"/>")
                        .append("</div>")
                        .append("<div class=\"likeContent\">")
                            .append("<a href=\""+productMapping+"\">")
                                .append("<img src="+mainImg+" alt=\""+productTitle+"\">")
                            .append("</a>")
                            .append("<p>"+productTitle+"<br><span>"+productPrice+"<span></p>")
                        .append("</div>")
                    .append("</li>");
    }
}
