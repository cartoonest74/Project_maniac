//package hello.market.session;
//
//import hello.market.service.login.LoginService;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import jakarta.servlet.http.HttpSession;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.stereotype.Component;
//
//import java.util.Optional;
//import java.util.UUID;
//
//import static hello.market.web.SessionConst.LOGIN_USERID;
//import static hello.market.web.SessionConst.LOGIN_UUID;
//
//@Slf4j
//@Component
//@RequiredArgsConstructor
//public class SessionLoginCheck {
//
//    private final LoginService loginService;
//    private final LoginSessionManager loginSessionManager;
//
//    public void createSessionLogin(HttpServletResponse response, HttpServletRequest request, String userId, int userNo) {
//        String uuid = UUID.randomUUID().toString();
//
//        HttpSession session = request.getSession();
//        session.setAttribute(LOGIN_USERID, userId);
//        session.setAttribute(LOGIN_UUID, uuid);
//        session.setMaxInactiveInterval(60 * 30);
//
//        loginService.insert(userNo, uuid);
//        loginSessionManager.createSession(response, uuid);
//    }
//
//    public int sessionUUIDcheck(HttpServletRequest request) {
//        String uuid = String.valueOf(request.getSession(false).getAttribute(LOGIN_UUID));
//        Optional<hello.market.dto.LoginCheck> loginCheck = loginService.loginInCheck(uuid);
//        Integer userNo = Integer.valueOf(loginCheck.map(hello.market.dto.LoginCheck::getUserNo).orElse(null));
//        log.info("userNo = {}", userNo);
//        return userNo;
//    }
//}
