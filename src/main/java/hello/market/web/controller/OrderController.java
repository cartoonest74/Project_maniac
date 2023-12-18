package hello.market.web.controller;

import hello.market.service.Cart.CartService;
import hello.market.web.session.LoginSessionManager;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/order/{artistId}")
public class OrderController {

    private CartService cartService;
    private LoginSessionManager loginSessionManager;

    @GetMapping("")
    private String get_orderPage(HttpServletRequest request){
        Integer user_id = loginSessionManager.sessionUUIDcheck(request);
        return "/order/order";
    }
}
