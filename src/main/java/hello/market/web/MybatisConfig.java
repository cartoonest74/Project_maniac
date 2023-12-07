//package hello.market.web;
//
//import hello.market.repository.mybatis.cart.CartMapper;
//import hello.market.repository.mybatis.cart.CartRepository;
//import hello.market.repository.mybatis.cart.CartRepositoryImpl;
//import hello.market.repository.mybatis.login.LoginMapper;
//import hello.market.repository.mybatis.login.LoginRepository;
//import hello.market.repository.mybatis.login.MybatisLoginRepository;
//import hello.market.repository.mybatis.member.MemberMapper;
//import hello.market.repository.mybatis.member.MemberRepository;
//import hello.market.repository.mybatis.member.MybaitsMemberRepository;
//import hello.market.repository.mybatis.product.MybatisProductRepository;
//import hello.market.repository.mybatis.product.ProductMapper;
//import hello.market.repository.mybatis.product.ProductRepository;
//import hello.market.repository.mybatis.shopQna.MybatisShopQnaRepository;
//import hello.market.repository.mybatis.shopQna.ShopQnaMapper;
//import hello.market.repository.mybatis.shopQna.ShopQnaRepository;
//import hello.market.repository.mybatis.shopReview.MybatisShopReviewRepository;
//import hello.market.repository.mybatis.shopReview.ShopReviewMapper;
//import hello.market.repository.mybatis.shopReview.ShopReviewRepository;
//import hello.market.service.login.LoginService;
//import hello.market.service.login.LoginServiceImpl;
//import hello.market.service.member.MemberService;
//import hello.market.service.member.MemberServiceImpl;
//import hello.market.service.product.ProductService;
//import hello.market.service.product.ProductServiceImpl;
//import hello.market.service.shopQna.ShopQnaService;
//import hello.market.service.shopQna.ShopQnaServiceImpl;
//import hello.market.service.shopReview.ShopReviewService;
//import hello.market.service.shopReview.ShopReviewServiceImpl;
//import lombok.RequiredArgsConstructor;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//
//@Configuration
//@RequiredArgsConstructor
//public class MybatisConfig {
//    private final LoginMapper loginMapper;
//    private final MemberMapper memberMapper;
//    private final ShopReviewMapper shopReviewMapper;
//    private final ShopQnaMapper shopQnaMapper;
//    private final ProductMapper productMapper;
////    private final CartMapper cartMapper;
//    @Bean
//    public CartRepository cartRepository() {
//        return new CartRepositoryImpl();
//    }
//
//    @Bean
//    public LoginService loginService() {
//        return new LoginServiceImpl(loginRepository());
//    }
//
//    @Bean
//    public LoginRepository loginRepository() {
//        return new MybatisLoginRepository(loginMapper);
//    }
//
//    @Bean
//    public MemberService memberService() {
//        return new MemberServiceImpl(memberRepository());
//    }
//
//    @Bean
//    public MemberRepository memberRepository() {
//        return new MybaitsMemberRepository(memberMapper);
//    }
//
//    @Bean
//    public ProductService productService() {
//        return new ProductServiceImpl(productRepository());
//    }
//
//    @Bean
//    public ProductRepository productRepository() {
//        return new MybatisProductRepository(productMapper);
//    }
//
//    @Bean
//    public ShopReviewService shopReviewService() {
//        return new ShopReviewServiceImpl(shopReviewRepository());
//    }
//
//    @Bean
//    public ShopReviewRepository shopReviewRepository() {
//        return new MybatisShopReviewRepository(shopReviewMapper);
//    }
//
//    @Bean
//    public ShopQnaService shopQnaService() {
//        return new ShopQnaServiceImpl(shopQnaRepository());
//    }
//
//    @Bean
//    public ShopQnaRepository shopQnaRepository() {
//        return new MybatisShopQnaRepository(shopQnaMapper);
//    }
//}
