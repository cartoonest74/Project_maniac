package hello.market.web.interceptor;

import hello.market.repository.mybatis.cart.CartRepository;
import hello.market.web.session.CartSessionManager;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.HandlerInterceptor;

import static hello.market.web.SessionConst.*;

@Slf4j
@RequiredArgsConstructor
public class CartInterceptor implements HandlerInterceptor {

    private final CartRepository cartRepository;
    private final CartSessionManager cartSessionManager;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        log.info("start");
        int cartCount = 0;
        Cookie[] cookies = request.getCookies();
        if(cookies == null){
            request.setAttribute(CARTCOUNT,cartCount);
            return true;
        }
        for (Cookie cookie : cookies) {
            if(cookie.getName().equals(CARTMAPS)){
                cartSessionManager.getCartSession(request);
                cartCount = cartRepository.show_length();
            }
        }
        request.setAttribute(CARTCOUNT,cartCount);
        return true;
    }
}
