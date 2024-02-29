package hello.market.config;

import hello.market.repository.mybatis.cart.CartRepository;
//import hello.market.web.interceptor.CartInterceptor;
import hello.market.web.interceptor.AdminCheckInterceptor;
import hello.market.web.interceptor.LoginCheckInterceptor;
//import hello.market.web.session.CartSessionManager;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
//        registry.addInterceptor(new AdminCheckInterceptor())
//                .order(1)
//                .addPathPatterns("/admin/**")
//                .excludePathPatterns("/css/**", "/*.ico", "/error");
        registry.addInterceptor(new LoginCheckInterceptor())
                .order(1)
                .addPathPatterns("/cart/*/view-cart","/*/like/view","/order/**","/myPage/**")
                .excludePathPatterns("/css/**", "/*.ico", "/error");
    }
}
