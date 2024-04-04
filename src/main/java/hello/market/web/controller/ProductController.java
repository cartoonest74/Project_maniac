package hello.market.web.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import hello.market.dto.Product;
import hello.market.repository.mybatis.cart.CartRepository;
import hello.market.service.like.LikeService;
import hello.market.service.product.ProductService;
import hello.market.web.session.LoginSessionManager;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.simple.JSONObject;
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
                                    HttpServletRequest request) throws JsonProcessingException {
        Integer user_id = loginSessionManager.sessionUUIDcheck(request);

        ObjectMapper objectMapper = new ObjectMapper();
        JSONArray like_jsonArray = new JSONArray();
        JSONArray product_jsonArray = new JSONArray();
        JSONObject jsonObject = new JSONObject();
//        int limit = (page-1) *20;
        shop_menuTag.setLength(0);

        if(user_id != 0){
            List<Integer> likes = likeService.my_likeList(user_id);
            for (Integer like : likes) {
                like_jsonArray.put(like);
            }
        }

        List<Product> products = productService.findProducts(artistId, category, page);
        for (Product product1 : products) {
            String writeValueAsString = objectMapper.writeValueAsString(product1);
            product_jsonArray.put(writeValueAsString);
        }
        Integer lengthProduct = productService.lengthProduct(artistId, category);

        jsonObject.put("allCount", lengthProduct);
        jsonObject.put("like_list", like_jsonArray);
        jsonObject.put("product_list", product_jsonArray);
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
}
