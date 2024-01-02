//package hello.market.web.session;
//
//import hello.market.repository.mybatis.cart.CartRepository;
//import jakarta.servlet.http.Cookie;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.json.JSONObject;
//import org.springframework.stereotype.Component;
//
//import java.util.Map;
//
//import static hello.market.web.SessionConst.*;
//
//@Slf4j
//@Component
//@RequiredArgsConstructor
//public class CartSessionManager {
//    private final CartRepository cartRepository;
//
//    public void cartCreateSession(HttpServletResponse response, CartRepository cartMaps) {
//        String cartMapToString = getMapString(cartMaps);
//
//        Cookie cartCookie = new Cookie(CARTMAPS, cartMapToString);
//        cartCookie.setPath("/");
//        cartCookie.setMaxAge(60 * 60 * 24);
//        response.addCookie(cartCookie);
//        log.info("CookieGetValue = {}", cartCookie.getValue());
//    }
//
//    // Map toString 으로 변환
//    private String getMapString(CartRepository cartMaps) {
//        StringBuilder sb = new StringBuilder();
//        int index = 0;
//        Integer cartCount = cartMaps.show_length();
//        for (Map.Entry<Integer, Integer> cartMap : cartMaps.all().entrySet()) {
//            index ++;
//            Integer key = cartMap.getKey();
//            Integer value = cartMap.getValue();
//            sb.append(key + ":" + value);
//            if(index != cartCount) sb.append(":");
//            log.info("value = {}",value);
//        }
//        String cartMapToString = sb.toString();
//        log.info("cartMapToString = {}",cartMapToString);
//        return cartMapToString;
//    }
//
//    public void getCartSession(HttpServletRequest request){
//        Cookie[] cookies = request.getCookies();
//        Integer cartKey = 0;
//        Integer cartValue = 0;
//        for (Cookie cookie : cookies) {
//            String name = cookie.getName();
//            String value = cookie.getValue();
//            if (name.equals(CARTMAPS)) {
//                String[] cartList = value.split(":");
//                // string to List
//                int index = 0;
//                for (String cart : cartList) {
//                    if(! cart.equals("")){
//                        if(index % 2 == 0)  cartKey = Integer.parseInt(cart);
//                        if(index % 2 == 1)  cartValue = Integer.parseInt(cart);
//                        cartRepository.save(cartKey, cartValue);
//                    }
//                    index++;
//                }
//            }
//        }
//    }
//
//    public void deleteCartSession(HttpServletRequest request,HttpServletResponse response){
//        Cookie[] cartCookies = request.getCookies();
//        for (Cookie cartCookie : cartCookies) {
//            if(cartCookie.getName().equals(CARTMAPS)){
//                cartCookie.setPath("/");
//                cartCookie.setMaxAge(0);
//                response.addCookie(cartCookie);
//            }
//        }
//    }
//}
