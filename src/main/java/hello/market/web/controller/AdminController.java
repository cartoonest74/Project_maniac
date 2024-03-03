package hello.market.web.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import hello.market.dto.Admin;
import hello.market.dto.Artist;
import hello.market.dto.ShopReview;
import hello.market.service.admin.AdminService;
import hello.market.service.myPage.MyPageService;
import hello.market.web.session.AdminSessionManager;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {
    private final MyPageService myPageService;
    private final AdminService adminService;
    private final AdminSessionManager adminSessionManager;

    @Value("${file.dir}")
    private String uploadPath;

    @GetMapping("")
    private String get_adminLogin() {
        return "/admin/adminLogin";
    }

    @GetMapping("/main")
    private String get_managerPage(Model model,HttpServletRequest request) {
        int admin_id = adminSessionManager.sessionUUIDcheck(request);
        if(admin_id == 0){
            return "redirect:/admin";
        }
        Admin adminInfo = adminService.get_adminInfo(admin_id);
        model.addAttribute("admin", adminInfo);
        return "/admin/admin_main";
    }

    @GetMapping("/main/qna")
    private String get_adminQna(Model model,HttpServletRequest request){
        int admin_id = adminSessionManager.sessionUUIDcheck(request);
        Admin adminInfo = adminService.get_adminInfo(admin_id);
        model.addAttribute("admin",adminInfo);
        return "/admin/admin_qna";
    }

    @GetMapping("/main/review")
    private String get_adminReview(@RequestParam(value = "categoryId", required = false, defaultValue = "0") int categoryId,
                                   @RequestParam(value = "page", required = false, defaultValue = "0") int page,
                                   Model model,
                                   HttpServletRequest request){
        int page_limit = page * 10;
        int admin_id = adminSessionManager.sessionUUIDcheck(request);
        Admin adminInfo = adminService.get_adminInfo(admin_id);
        List<ShopReview> adminReview = adminService.get_adminReview(categoryId, page_limit);
        model.addAttribute("admin",adminInfo);
        model.addAttribute("adminReviews",adminReview);
        return "/admin/admin_review";
    }
    @ResponseBody
    @DeleteMapping("/del_review")
    private String del_productReview(@RequestParam("imgUrl") String imgUrl,
                                     @RequestParam("reviewId") int reviewId) throws IOException {
        myPageService.del_userShopReview(reviewId);
        delete_file(imgUrl);
        return "ok";
    }

    @ResponseBody
    @PostMapping("/main/review")
    private String post_adminReview(@RequestParam int categoryId, @RequestParam int page) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        JSONObject jsonObject = new JSONObject();
        JSONArray arr_adminReview = new JSONArray();
        JSONArray arr_artist = new JSONArray();

        List<Artist> artists = adminService.get_adminSearchReview();
        for (Artist artist : artists) {
            String writeValueAsString = objectMapper.writeValueAsString(artist);
            arr_artist.put(writeValueAsString);
        }

        Integer reviewLength = adminService.get_reviewLength(categoryId);
        List<ShopReview> adminReview = adminService.get_adminReview(categoryId, page);
        for (ShopReview shopReview : adminReview) {
            String writeValueAsString = objectMapper.writeValueAsString(shopReview);
            arr_adminReview.put(writeValueAsString);
        }

        jsonObject.put("reviewList", arr_adminReview);
        jsonObject.put("allCount", reviewLength);
        jsonObject.put("searchList", arr_artist);
        return jsonObject.toString();
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

    @ResponseBody
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
        return "ok";
    }
    private void delete_file(String imgUrl) throws IOException {
        String del_imgPath = new StringBuilder()
                .append(uploadPath)
                .append(imgUrl)
                .toString();
        Path filePath = Paths.get(del_imgPath);
        boolean exists = Files.exists(filePath);
        if(exists){
            Files.delete(filePath);
        }
    }
}
