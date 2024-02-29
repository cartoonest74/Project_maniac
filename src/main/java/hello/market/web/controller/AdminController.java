package hello.market.web.controller;

import hello.market.dto.Admin;
import hello.market.service.admin.AdminService;
import hello.market.service.myPage.MyPageService;
import hello.market.web.session.AdminSessionManager;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {
    private final MyPageService myPageService;
    private final AdminService adminService;
    private final AdminSessionManager adminSessionManager;

    @GetMapping("")
    private String get_adminLogin() {
        return "/admin/adminLogin";
    }

    @GetMapping("/manager")
    private String get_managerPage(Model model,HttpServletRequest request) {
        int admin_id = adminSessionManager.sessionUUIDcheck(request);
        if(admin_id == 0){
            return "redirect:/admin";
        }
        Admin adminInfo = adminService.get_adminInfo(admin_id);
        model.addAttribute("admin", adminInfo);
        return "/admin/adminManager";
    }

    @ResponseBody
    @PostMapping("/login")
    private String post_adminLogin(@ModelAttribute Admin admin, HttpServletResponse response, HttpServletRequest request) {
        String adminId1 = admin.getAdminId();
        Admin adminInfo = adminService.get_inspectAdminInfo(admin);
        if (adminInfo == null) {
            return "";
        }

        int id = adminInfo.getId();
        String adminId = adminInfo.getAdminId();
        adminSessionManager.createSessionLogin(response, request, adminId, id);
        return "ok";
    }

    @PostMapping("/logout")
    private String adminLogout(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
//    로그인 session이 살아있는지 생사확인 없으면 생성
        adminSessionManager.getSession(request);

        Integer userNo = adminSessionManager.sessionUUIDcheck(request);
        adminService.put_endLogin(userNo);
        log.info("userId={}", userNo);
        if (session != null) {
            session.invalidate();
        }
        adminSessionManager.expire(response);
        return "redirect:/admin";
    }
}
