package hello.market.web.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import hello.market.dto.Cart;
import hello.market.dto.Product;
import hello.market.service.Cart.CartService;
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

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/cart")
public class BasketController {

    private final ProductService productService;
    private final LoginSessionManager loginSessionManager;
    private final CartService cartService;

    //TODO CART
    @ResponseBody
    @DeleteMapping("/sold-delete")
    private String delete_soldDelete(HttpServletRequest request) {
        int user_id = loginSessionManager.sessionUUIDcheck(request);
        List<Cart> carts = cartService.quantity_check(user_id);
        List<String> cartKeys = new ArrayList<>();
        for (Cart cart : carts) {
            String cartKey = cart.getCartKey();
            int restQuantity = cart.getRestQuantity();
            if(restQuantity == 0){
                cartKeys.add(cartKey);
            }
        }
        // 삭제할 데이터 없을 시 반환
        if(cartKeys.size() == 0){
            return "no data";
        }
        for(String key:cartKeys){
            String json_key = new StringBuilder()
                    .append("$.")
                    .append(key)
                    .toString();
            cartService.delete_cart(user_id,json_key);
        }
        return "ok";
    }

    @ResponseBody
    @PutMapping("/add-cart")
    private String put_addCart(@RequestParam String option_part, @RequestParam Integer productNo, @RequestParam JSONObject option, HttpServletResponse response, HttpServletRequest request) {

        Integer user_id = loginSessionManager.sessionUUIDcheck(request);
        if(user_id == 0){
            return "0";
        }

        LocalDateTime date = LocalDateTime.now();
        String dateFormat = date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        Integer max_quantity = (Integer) option.get("max");
        JSONArray option_arr = option.getJSONArray("option");
        List<Cart> po_list = new ArrayList<>();
        JSONObject jsonObject = new JSONObject();
        JSONArray indexArray = new JSONArray();
        JSONArray quantityArray = new JSONArray();
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

            String purchase_productKey = new StringBuilder()
                    .append(option_part)
                    .append("x")
                    .append(productNo)
                    .append("x")
                    .append(optionId)
                    .toString();
            
            // 구매이력 검사
            Integer purchaseQuantity = cartService.purchaseQuantity_check(user_id, purchase_productKey);
            purchaseQuantity = purchaseQuantity == null? 0:purchaseQuantity;

            int calc_quantity = max_quantity - (purchaseQuantity + quantity);
            if(calc_quantity < 0){
                indexArray.put(optionId);
                quantityArray.put(purchaseQuantity);
                continue;
            }
            cartService.add_cart(user_id, goodsNo, quantity);
        }
        jsonObject.put("overOptionId", indexArray);
        jsonObject.put("overOptionQuantity", quantityArray);
        Integer cartCount = cartService.cart_length(user_id);

        String jsonObjectString = jsonObject.toString();
        return jsonObjectString;
    }

    @ResponseBody
    @PostMapping("/view-cart")
    private String post_viewCart(HttpServletRequest request) throws JsonProcessingException {
        JSONObject jsonObject = new JSONObject();

        Integer user_id = loginSessionManager.sessionUUIDcheck(request);

        Integer cartCount = cartService.cart_length(user_id);
        if (cartCount == 0) {
            return "empty";
        }

        List<Cart> cartList = cartService.select_cart(user_id,0);
        ObjectMapper objectMapper = new ObjectMapper();
        JSONArray jsonArray = new JSONArray();
        for (Cart cart : cartList) {
            String cartKey = cart.getCartKey();
            log.info("cartKey = {}", cartKey);
            String cartString = objectMapper.writeValueAsString(cart);
            jsonArray.put(cartString);
        }
        jsonObject.put("cart_array", jsonArray);
        String jsonObjectString = jsonObject.toString();
        return jsonObjectString;
    }


    @GetMapping("/{artistId}/view-cart")
    private String get_viewCart(@PathVariable(required = false) Integer artistId,
            HttpServletRequest request, Model model){
        if(artistId == null) artistId = 0;

        Integer user_id = loginSessionManager.sessionUUIDcheck(request);
        if (user_id == 0) {
            return "redirect:/member/login-account";
        }

        Integer cartCount = cartService.cart_length(user_id);
        if (cartCount == 0) {
            model.addAttribute("products", "");
            return "/basket/basket";
        }

        // 90 overdue data delete
        LocalDateTime localDateTime = LocalDateTime.now();
        LocalDateTime before3month = localDateTime.minusMonths(3);
        String str_before3month = before3month.toString().split("T")[0];
        List<Cart> overdueCart = cartService.get_overdueCart(user_id, str_before3month);
        if(overdueCart != null){
            for(Cart cart:overdueCart){
                String cartKey = cart.getCartKey();
                cartService.delete_cart(user_id,cartKey);
            }
        }

        List<Cart> cartList = cartService.select_cart(user_id, 0);
        for (Cart cart : cartList) {
            String mainImg = cart.getMainImg();
            log.info("mainImg={}", mainImg);
        }

        model.addAttribute("cartList", cartList);
        model.addAttribute("artistId", artistId);

        return "/basket/basket";
    }

    @ResponseBody
    @PostMapping("/view/edit-cart")
    private String view_editCart(@RequestParam Integer editGoods_Id){
        Product product1 = productService.findProduct(editGoods_Id);

        int id = product1.getId();
        String title = product1.getTitle();
        String optionList = product1.getOptionList();
        String mainImg = product1.getMainImg();
        String price = product1.getPrice();
        String optionMent = product1.getOptionMent();
        JSONObject jsonObject = new JSONObject();

        jsonObject.put("id", id);
        jsonObject.put("title", title);
        jsonObject.put("optionList",optionList );
        jsonObject.put("mainImg", mainImg);
        jsonObject.put("price", price);
        jsonObject.put("optionMent", optionMent);

        String jsonObjectString = jsonObject.toString();
        return jsonObjectString;
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
}
