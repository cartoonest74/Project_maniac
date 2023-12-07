package hello.market.config;

import hello.market.repository.mybatis.cart.CartRepository;
import hello.market.web.interceptor.CartInterceptor;
import hello.market.web.interceptor.LoginCheckInterceptor;
import hello.market.web.session.CartSessionManager;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {
    private final CartRepository cartRepository;
    private final CartSessionManager cartSessionManager;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new CartInterceptor(cartRepository, cartSessionManager))
                .order(1)
                .addPathPatterns("/**")
                .excludePathPatterns("/css/**", "/*.ico", "/error");
        registry.addInterceptor(new LoginCheckInterceptor())
                .order(2)
                .addPathPatterns("/product/*/view-cart")
                .excludePathPatterns("/css/**", "/*.ico", "/error");
    }
}
