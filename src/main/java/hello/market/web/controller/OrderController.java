package hello.market.web.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import hello.market.dto.Cart;
import hello.market.dto.Member;
import hello.market.dto.OrderRegistry_info;
import hello.market.repository.mybatis.order.OrderCheckRepositoryImpl;
import hello.market.service.Cart.CartService;
import hello.market.service.member.MemberServiceImpl;
import hello.market.service.order.OrderService;
import hello.market.web.session.LoginSessionManager;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/order")
public class OrderController {

    private final CartService cartService;
    private final LoginSessionManager loginSessionManager;
    private final OrderService orderService;
    private final OrderCheckRepositoryImpl orderCheckRepository;
    private final MemberServiceImpl memberService;

    @GetMapping("/{artistId}")
    private String get_orderPage(@PathVariable("artistId") int artistId,
                                 @RequestParam("orderCheck") String orderCheck,
                                 HttpServletRequest request, Model model) {
        Integer user_id = loginSessionManager.sessionUUIDcheck(request);
        String orderUUID = orderCheckRepository.get_orderUUID(user_id);
        log.info("orderCheck={},orderUUID={}", orderCheck, orderUUID);
        if (! orderUUID.equals(orderCheck)) {
            return "redirect:/cart/view-cart";
        }

        List<Cart> carts = cartService.select_cart(user_id, 0);
        model.addAttribute("carts", carts);
        return "/order/order";
    }
    @ResponseBody
    @PostMapping("")
    private String post_orderPage(HttpServletRequest request) throws JsonProcessingException {
        Integer user_id = loginSessionManager.sessionUUIDcheck(request);
        List<Cart> carts = cartService.quantity_check(user_id);

        JSONObject jsonObject = new JSONObject();
        ObjectMapper objectMapper = new ObjectMapper();
        JSONArray jsonArray = new JSONArray();
        List<Cart> reCall_cart = carts.stream()
                .filter(val -> val.getRestQuantity() < 0)
                .collect(Collectors.toList());
        for (Cart cart : reCall_cart) {
            String cartString = objectMapper.writeValueAsString(cart);
            jsonArray.put(cartString);
        }
        // 수량초과 상품있을시
        if(reCall_cart.size() > 0){
            jsonObject.put("recall_array", jsonArray);
            String jsonObjectString = jsonObject.toString();
            return jsonObjectString;
        }
        orderCheckRepository.save_orderUUID(user_id);
        String orderUUID = orderCheckRepository.get_orderUUID(user_id);
        jsonObject.put("uuid",orderUUID);
        return jsonObject.toString();
    }

    @ResponseBody
    @PostMapping("/registryInfo")
    private String post_registryInfo(HttpServletRequest request){
        Integer user_id = loginSessionManager.sessionUUIDcheck(request);
        Member member = memberService.memberSelect(user_id);

        JSONObject jsonObject = new JSONObject();
        String name = member.getName();
        String first_name = name.substring(0,1);
        String last_name = name.substring(1);
        String email = member.getEmail();
        String phone = member.getPhone();

        jsonObject.put("Firstname", first_name);
        jsonObject.put("Lastname", last_name);
        jsonObject.put("Email", email);
        jsonObject.put("Tel", phone);

        return jsonObject.toString();
    }

    @ResponseBody
    @PostMapping("/save_registryInfo")
    private String post_save_registryInfo(@ModelAttribute OrderRegistry_info orderRegistry_info,
                                          HttpServletRequest request) throws UnsupportedEncodingException {
        request.setCharacterEncoding("UTF-8");
        Integer user_id = loginSessionManager.sessionUUIDcheck(request);
        String firstname = orderRegistry_info.getFirstname();
        String lastname = orderRegistry_info.getLastname();
        String email = orderRegistry_info.getEmail();
        String tel = orderRegistry_info.getTel();

        String orderInfo = new StringBuilder()
                .append("[{\"first_name\":")
                .append("\""+firstname+"\"")
                .append(",")
                .append("\"last_name\":")
                .append("\""+lastname+"\"")
                .append(",")
                .append("\"email\":")
                .append("\""+email+"\"")
                .append(",")
                .append("\"tel\":")
                .append("\""+tel+"\"")
                .append("}]")
                .toString();
        log.info("orderInfo ={}", orderInfo);
        log.info("user_id ={}", user_id);
        orderService.add_orderInfo(user_id,orderInfo);
        return "ok";
    }
}
