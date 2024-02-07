package hello.market.web.controller;

import hello.market.dto.Member;
import hello.market.service.member.MemberService;
import hello.market.service.myPage.MyPageService;
import hello.market.web.session.LoginSessionManager;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/myPage/{artistId}")
public class MyPageController {
    private final MyPageService myPageService;
    private final LoginSessionManager loginSessionManager;
    private final MemberService memberService;

    @GetMapping("")
    public String loginInfo(@PathVariable int artistId, Model model, HttpServletRequest request) {
        int user_id = loginSessionManager.sessionUUIDcheck(request);
        Member member = memberService.memberSelect(user_id);
        model.addAttribute("memberInfo", member);
        model.addAttribute("artistId", artistId);
        return "/myPage/userInfo";
    }

    @GetMapping("/user_edit")
    private String get_userEdit(@PathVariable int artistId,
                                HttpServletRequest request,
                                Model model) {
        int user_id = loginSessionManager.sessionUUIDcheck(request);
        memberService.memberSelect(user_id);
        return "/myPage/userEdit";
    }

    @GetMapping("/order_list")
    private String get_orderList(@PathVariable int artistId,
                                 @RequestParam(value = "page", required = false, defaultValue = "1") int page,
                                 @RequestParam(value = "category", required = false, defaultValue = "0") int statusId,
                                 HttpServletRequest request,
                                 Model model) {
        int user_id = loginSessionManager.sessionUUIDcheck(request);
        memberService.memberSelect(user_id);
        return "/myPage/userOrderList";
    }

    @GetMapping("/product_question")
    private String get_productQuestion(@PathVariable int artistId,
                                       @RequestParam(value = "page", required = false, defaultValue = "1") int page,
                                       @RequestParam(value = "category", required = false, defaultValue = "0") int categoryId,
                                       HttpServletRequest request,
                                       Model model) {
        int user_id = loginSessionManager.sessionUUIDcheck(request);
        memberService.memberSelect(user_id);
        return "/myPage/userProductQuestion";
    }

    @GetMapping("/product_review")
    private String get_productReview(@PathVariable int artistId,
                                     @RequestParam(value = "page", required = false, defaultValue = "1") int page,
                                     @RequestParam(value = "category", required = false, defaultValue = "0") int categoryId,
                                     HttpServletRequest request,
                                     Model model) {
        int user_id = loginSessionManager.sessionUUIDcheck(request);
        memberService.memberSelect(user_id);
        return "/myPage/userProductReview";
    }

    @ResponseBody
    @PatchMapping("/edit_pwd")
    private String patch_editPwd(@PathVariable int artistId,
                                 @RequestParam("edit_pwd") String edit_pwd,
                                 @RequestParam("current_pwd") String current_pwd,
                                 HttpServletRequest request) {
        int user_id = loginSessionManager.sessionUUIDcheck(request);
        myPageService.edit_memberPwd(edit_pwd, user_id);
        Member member = memberService.memberSelect(user_id);
        String pwd = member.getPwd();
        if(! current_pwd.equals(pwd)){
            return "no";
        }
        return "ok";
    }

    @ResponseBody
    @PatchMapping("/edit_addr")
    private String patch_editAddr(@PathVariable int artistId,
                                 @RequestParam("edit_addr") String edit_addr,
                                 HttpServletRequest request) {
        int user_id = loginSessionManager.sessionUUIDcheck(request);
        myPageService.edit_memberAddr(edit_addr, user_id);
        return "ok";
    }
    @ResponseBody
    @PatchMapping("/edit_tel")
    private String patch_editTel(@PathVariable int artistId,
                                 @RequestParam("edit_tel") String edit_tel,
                                 HttpServletRequest request) {
        int user_id = loginSessionManager.sessionUUIDcheck(request);
        myPageService.edit_memberPhone(edit_tel, user_id);
        return "ok";
    }
    @ResponseBody
    @PatchMapping("/edit_email")
    private String patch_editEmail(@PathVariable int artistId,
                                 @RequestParam("edit_email") String edit_email,
                                 HttpServletRequest request) {
        log.info("edit_email", edit_email);
        int user_id = loginSessionManager.sessionUUIDcheck(request);
        myPageService.edit_memberEmail(edit_email, user_id);
        return "ok";
    }
}
