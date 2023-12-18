package hello.market.web.controller;

import hello.market.dto.Member;
import hello.market.service.Cart.CartService;
import hello.market.service.login.LoginService;
import hello.market.service.member.MemberService;
import hello.market.web.session.LoginSessionManager;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Controller
@RequestMapping("/login-action")
@RequiredArgsConstructor
public class LoginController {
    private Member member;
    private Map<String, String> sessionStore = new ConcurrentHashMap<>();

    private final MemberService memberService;
    private final LoginService loginService;
    private final LoginSessionManager loginSessionManager;
    private final CartService cartService;

    @PostMapping("/login")
    private String login(@RequestParam(defaultValue = "/main") String referUrl) {
        return "redirect:"+referUrl;
    }

    @ResponseBody
    @PostMapping("/login-inspect")
    private String loginInspect(@RequestParam String id, @RequestParam String pwd, HttpServletResponse response, HttpServletRequest request){

        member = memberService.memberSelect(id);
        if (Objects.isNull(member)) {
            return "notId";
        }
        member = new Member();
        member = loginService.loginAction(id, pwd);
        if (Objects.isNull(member)) {
            return "pwdNo";
        }

        String userId = member.getUserId();
        int userNo = member.getId();
        int grade = member.getGrade();

        Integer cartLength = cartService.cart_length(userNo);
        loginSessionManager.createSessionLogin(response, request, userId, userNo, grade, cartLength);
        return "";
    }

    @PostMapping("/logout")
    private String logOut(HttpServletRequest request,HttpServletResponse response) {
        HttpSession session = request.getSession(false);
//    로그인 session이 살아있는지 생사확인 없으면 생성
        loginSessionManager.getSession(request);
        
        Integer userNo = loginSessionManager.sessionUUIDcheck(request);
        loginService.logOutAction(userNo);
        log.info("userId={}", userNo);
        if (session != null) {
            session.invalidate();
        }
        loginSessionManager.expire(response);
        return "redirect:/artist";
    }
}
