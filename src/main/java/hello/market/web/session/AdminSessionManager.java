package hello.market.web.session;

import hello.market.dto.Admin;
import hello.market.dto.LoginCheck;
import hello.market.service.admin.AdminService;
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
public class AdminSessionManager {

    private Cookie loginCookie;
    private final AdminService adminService;

    public void createSessionLogin(HttpServletResponse response, HttpServletRequest request,
                                   String userId,
                                   int userNo) {
        String uuid = UUID.randomUUID().toString();

        HttpSession session = request.getSession();
        session.setAttribute(LOGIN_ADMINID, userId);
        session.setAttribute(LOGIN_UUID, uuid);
        session.setMaxInactiveInterval(60 * 30);

        adminService.put_startLogin(userNo, uuid);
        createSession(response, uuid);
    }

    public void createSession(HttpServletResponse response,String uuid) {
        loginCookie = new Cookie(SESSION_ADMIN, uuid);
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
            if (name.equals(SESSION_ADMIN)) {
                if(session == null){
                    session.setAttribute(LOGIN_UUID,value);
                    int userNo = sessionUUIDcheck(request);
                    Admin admin = adminService.get_adminInfo(userNo);
                    String adminId = admin.getAdminId();
                    session.setAttribute(LOGIN_ADMINID,adminId);
                }
            }
        }

    }

    public int sessionUUIDcheck(HttpServletRequest request) {
        String uuid = String.valueOf(request.getSession(false).getAttribute(LOGIN_UUID));
        Optional<LoginCheck> loginCheck = adminService.adminLoginCheck(uuid);
        Integer userNo = Integer.valueOf(loginCheck.map(LoginCheck::getUserNo).orElse("0"));
        log.info("userNo = {}", userNo);
        return userNo;
    }

    public void expire(HttpServletResponse response) {
        loginCookie = new Cookie(SESSION_ADMIN, null);
        loginCookie.setMaxAge(0);
        response.addCookie(loginCookie);
    }
}
