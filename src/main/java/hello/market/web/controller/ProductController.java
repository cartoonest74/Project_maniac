package hello.market.web.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import hello.market.dto.Product;
import hello.market.dto.Cart;
import hello.market.repository.mybatis.cart.CartRepository;
import hello.market.service.Cart.CartService;
import hello.market.service.like.LikeService;
import hello.market.service.member.MemberService;
import hello.market.service.product.ProductService;
import hello.market.web.session.LoginSessionManager;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Controller
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {
    Map<Integer, List<Product>> productPack = new ConcurrentHashMap<>();
    private Product product;

    // cart 변수
    private Map<Integer, Integer> cartMaps;
    private int productNo;
    private int cartCount;

    private final ProductService productService;
    private final CartRepository cartRepository;
    private final LoginSessionManager loginSessionManager;
    private final LikeService likeService;

    private final StringBuilder shop_menuTag = new StringBuilder();

    @GetMapping("/{artistId}/find-product/{product_id}")
    private String findProduct(@PathVariable Integer artistId, @PathVariable Integer product_id, Model model) {
        product = productService.findProduct(product_id);
        model.addAttribute("productinfo", product);
        model.addAttribute("artistId", artistId);
        return "/shop/shopInfo";
    }

    @ResponseBody
    @PostMapping("/{artistId}/shop/{category}")
    private String post_productShop(@PathVariable Integer artistId,
                               @PathVariable("category") String category,
                               @RequestParam("limit") int page,
                                    HttpServletRequest request){
        Integer user_id = loginSessionManager.sessionUUIDcheck(request);

        shop_menuTag.setLength(0);
//        int limit = (page-1) *20;
        List<Integer> likes = new ArrayList<>();

        if(user_id != 0){
            likes = likeService.my_likeList(user_id);
        }

        List<Product> products = productService.findProducts(artistId, category, page);
        for (Product product1 : products) {
            int id = product1.getId();
            int artistId1 = product1.getArtistId();

            String likeHeart_class = new StringBuilder()
                        .append("<i data-btn-artistId=\"")
                        .append(artistId1)
                        .append("\" data-btn data-btn-like=\"")
                        .append(id)
                        .append("\" class=\"fa-regular fa-heart fa-lg\"></i>")
                        .toString();

            if(likes.contains(id)){
                 likeHeart_class = new StringBuilder()
                        .append("<i data-btn-like=\"")
                        .append(id)
                        .append("\" style=\"color:#d43f3f\" class=\"fa-solid  fa-heart fa-lg\">")
                        .append("</i>")
                        .toString();
            }
            create_shopMenuTag(product1, likeHeart_class);
        }
        Integer lengthProduct = productService.lengthProduct(artistId, category);
        String shop_menuTagString = shop_menuTag.toString();

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("allCount", lengthProduct);
        jsonObject.put("content", shop_menuTagString);
        return jsonObject.toString();
    }

    @GetMapping("/{artistId}/shop/{category}")
    private String get_productShop(@PathVariable Integer artistId,
                               @PathVariable("category") String category,
                               @RequestParam(value="page",required = false,defaultValue = "1")int page, Model model){
        page = page < 1 ? 1 : page;
        int limit = (page-1) *20;
        List<Product> products = productService.findProducts(artistId, category, limit);
        model.addAttribute("products", products);
        return "/shop/shop";
    }

    private void create_shopMenuTag(Product product, String likeHeart_class) {
        String shop_title = product.getTitle();
        int shop_artistId = product.getArtistId();
        String shop_price = product.getPrice();
        String shop_mainImg = product.getMainImg();
        int product_id = product.getId();
        String shopInfoUrl = new StringBuilder()
                    .append("/product/")
                    .append(shop_artistId)
                    .append("/find-product/")
                    .append(product_id)
                    .toString();
        shop_menuTag.append("<div class=\"shopEtc_content\">\n")
                        .append("<button data-btn-artistId="+shop_artistId+" data-btn-like="+product_id+" class=\"btnLike\" type=\"button\">")
                                .append(likeHeart_class)
                        .append("</button>")
                        .append("<a href="+shopInfoUrl+" class=\"shopEtc_contentImg\">\n")
                            .append("<img src=\""+shop_mainImg+"\" alt=\""+shop_title+"\">\n")
                        .append("</a>\n")
                        .append("<nav class=\"shopEtc_contentInfo\">\n")
                            .append("<h1>"+shop_title+"</h1>\n")
                            .append("<p>"+shop_price+"</p>\n")
                        .append("</nav>\n")
                    .append("</div>");
    }
}
