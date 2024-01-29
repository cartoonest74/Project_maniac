package hello.market.web.controller;

import hello.market.dto.Member;
import hello.market.service.member.MemberService;
import hello.market.service.myPage.MyPageService;
import hello.market.web.session.LoginSessionManager;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

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
                                 Model model){
        int user_id = loginSessionManager.sessionUUIDcheck(request);
        memberService.memberSelect(user_id);
        return "/myPage/userEdit";
    }
    @GetMapping("/order_list")
    private String get_orderList(@PathVariable int artistId,
                                 @RequestParam(value="page",required = false,defaultValue = "1")int page,
                                 @RequestParam(value="category",required = false,defaultValue = "0")int statusId,
                                 HttpServletRequest request,
                                 Model model){
        int user_id = loginSessionManager.sessionUUIDcheck(request);
        memberService.memberSelect(user_id);
        return "/myPage/userOrderList";
    }
    @GetMapping("/product_question")
    private String get_productQuestion(@PathVariable int artistId,
                                       @RequestParam(value="page",required = false,defaultValue = "1")int page,
                                       @RequestParam(value="category",required = false,defaultValue = "0")int categoryId,
                                       HttpServletRequest request,
                                       Model model){
        int user_id = loginSessionManager.sessionUUIDcheck(request);
        memberService.memberSelect(user_id);
        return "/myPage/userProductQuestion";
    }
    @GetMapping("/product_review")
    private String get_productReview(@PathVariable int artistId,
                                     @RequestParam(value="page",required = false,defaultValue = "1")int page,
                                     @RequestParam(value="category",required = false,defaultValue = "0")int categoryId,
                                     HttpServletRequest request,
                                     Model model){
        int user_id = loginSessionManager.sessionUUIDcheck(request);
        memberService.memberSelect(user_id);
        return "/myPage/userProductReview";
    }
}
