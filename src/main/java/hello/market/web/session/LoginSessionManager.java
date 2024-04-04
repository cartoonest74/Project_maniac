package hello.market.web.session;

import hello.market.dto.LoginCheck;
import hello.market.dto.Member;
import hello.market.service.login.LoginService;
import hello.market.service.member.MemberService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

import static hello.market.web.SessionConst.*;


@Slf4j
@Component
@RequiredArgsConstructor
public class LoginSessionManager {

    private Cookie loginCookie;
    private final LoginService loginService;
    private final MemberService memberService;

    public void createSessionLogin(HttpServletResponse response, HttpServletRequest request,
                                   String userId,
                                   int userNo,
                                   int grade) {
        String uuid = UUID.randomUUID().toString();

        HttpSession session = request.getSession();
        session.setAttribute(LOGIN_USERID, userId);
        session.setAttribute(LOGIN_UUID, uuid);
        session.setAttribute(LOGIN_GRADE, grade);
        session.setMaxInactiveInterval(60 * 30);

        loginService.insert(userNo, uuid);
        createSession(response, uuid);
    }

    public void createSession(HttpServletResponse response,String uuid) {
        loginCookie = new Cookie(SESSION_LOGIN, uuid);
        loginCookie.setMaxAge(60 * 30);
        loginCookie.setPath("/");
        response.addCookie(loginCookie);
    }

    public void getSession(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {
            String name = cookie.getName();
            String value = cookie.getValue();
            if (name.equals(SESSION_LOGIN)) {
                if(session == null){
                    session.setAttribute(LOGIN_UUID,value);
                    int userNo = sessionUUIDcheck(request);
                    Member member = memberService.memberSelect(userNo);
                    String userId = member.getUserId();
                    int grade = member.getGrade();
                    session.setAttribute(LOGIN_USERID,userId);
                    session.setAttribute(LOGIN_GRADE,grade);
                }
            }
        }

    }

    public int sessionUUIDcheck(HttpServletRequest request) {
        String uuid = String.valueOf(request.getSession(false).getAttribute(LOGIN_UUID));
        Optional<LoginCheck> loginCheck = loginService.loginInCheck(uuid);
        Integer userNo = Integer.valueOf(loginCheck.map(hello.market.dto.LoginCheck::getUserNo).orElse("0"));
        return userNo;
    }

    public void expire(HttpServletResponse response) {
        loginCookie = new Cookie(SESSION_LOGIN, null);
        loginCookie.setMaxAge(0);
        response.addCookie(loginCookie);
    }
}
