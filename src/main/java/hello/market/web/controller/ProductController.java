package hello.market.web.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import hello.market.dto.Product;
import hello.market.dto.Cart;
import hello.market.repository.mybatis.cart.CartRepository;
import hello.market.service.Cart.CartService;
import hello.market.service.like.LikeService;
import hello.market.service.like.LikeServiceImpl;
import hello.market.service.member.MemberService;
import hello.market.service.product.ProductService;
import hello.market.web.session.CartSessionManager;
import hello.market.web.session.LoginSessionManager;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
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
    private final MemberService memberService;
    private final CartRepository cartRepository;
    private final CartService cartService;
    private final CartSessionManager cartSessionManager;
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
                               @RequestParam("limit") int page, Model model,
                                    HttpServletRequest request){
        Integer user_id = loginSessionManager.sessionUUIDcheck(request);

        shop_menuTag.setLength(0);
        int limit = (page-1) *20;
        List<Integer> likes = new ArrayList<>();

        if(user_id != 0){
            likes = likeService.my_likeList(1);
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

    // CART
    @ResponseBody
    @PutMapping("/add-cart")
    private String addCart(@RequestParam String option_part, @RequestParam Integer productNo, @RequestParam JSONObject option, HttpServletResponse response, HttpServletRequest request) {

        Integer user_id = loginSessionManager.sessionUUIDcheck(request);
        if(user_id == 0){
            return "0";
        }

        JSONArray option_arr = option.getJSONArray("option");
        List<Cart> po_list = new ArrayList<>();
        log.info("option_part {}", option_part);
        for (int i = 0; i < option_arr.length(); i++) {
            Integer optionId = (Integer) ((JSONObject) option_arr.get(i)).get("option_id");
            Integer quantity = (Integer) ((JSONObject) option_arr.get(i)).get("quantity");

            // json key format
            String goodsNo = new StringBuilder()
                    .append("$.")
                    .append(option_part)
                    .append("x")
                    .append(productNo)
                    .append("x")
                    .append(optionId)
                    .toString();

            cartService.add_cart(user_id, goodsNo, quantity);
        }

        Integer cartCount = cartService.cart_length(user_id);
//        if (productNo != 0) {
//            cartRepository.save(productNo, 1);
//        }
//        cartSessionManager.cartCreateSession(response, cartRepository);
//
//        cartCount = cartRepository.show_length();
//        cartMaps = cartRepository.all();

        return String.valueOf(cartCount);
    }

    @GetMapping("/{artistId}/view-cart")
    private String viewCart(@PathVariable Integer artistId, HttpServletRequest request, Model model) throws JsonProcessingException {
        Integer user_id = loginSessionManager.sessionUUIDcheck(request);
        if (user_id == 0) {
            return "redirect:/member/login-account";
        }

        Integer cartCount = cartService.cart_length(user_id);
        if (cartCount == 0) {
            model.addAttribute("products", "");
            return "/basket/basket";
        }

        List<Cart> cartList = cartService.select_cart(user_id);
        for (Cart cart : cartList) {
            String mainImg = cart.getMainImg();
            log.info("mainImg={}", mainImg);
        }
//        List<Product> products = new ArrayList<>();
//
//        cartSessionManager.getCartSession(request);
//        cartMaps = cartRepository.all();
//        for (Entry<Integer, Integer> entry : cartMaps.entrySet()) {
//            productNo = entry.getKey();
//            log.info("productNo = {}",productNo);
//            Product product = productService.findProduct(productNo);
//            products.add(product);
//        }

        model.addAttribute("cartList", cartList);
        model.addAttribute("artistId", artistId);

        return "/basket/basket";
    }

    @ResponseBody
    @PutMapping("/edit-cart")
    private String editCart(@RequestParam String cartKey,@RequestParam JSONObject option){
        String[] cartKey_arr = cartKey.split("x");
        String option_part_keyWord = cartKey_arr[0];
        String product_no = cartKey_arr[1];
        String option_index = cartKey_arr[2];
        return "";
    }

    @ResponseBody
    @DeleteMapping("/del-cart")
    private String deleteCart(@RequestParam String cartKey, HttpServletRequest request){
        Integer user_id = loginSessionManager.sessionUUIDcheck(request);
        if (user_id == 0) {
            return "redirect:/member/login-account";
        }
        String jsonKey = new StringBuilder()
                .append("$.")
                .append(cartKey)
                .toString();
        cartService.delete_cart(user_id, jsonKey);
        return "ok";
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
                            .append("<img src="+shop_mainImg+" alt="+shop_title+">\n")
                        .append("</a>\n")
                        .append("<nav class=\"shopEtc_contentInfo\">\n")
                            .append("<h1>"+shop_title+"</h1>\n")
                            .append("<p>"+shop_price+"</p>\n")
                        .append("</nav>\n")
                    .append("</div>");
    }
}
