package hello.market.web.controller;

import hello.market.dto.Member;
import hello.market.service.member.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

/**
 * Servlet implementation class MemberController
 */
@Slf4j
@Controller
@RequestMapping("/{artistId}/member")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    @GetMapping("/forgot-account")
    public String forgotAccount(@PathVariable int artistId,Model model) {
        model.addAttribute("artistId", artistId);
        return "/account/forgotInfo";
    }

    @GetMapping("/create-account")
    public String createAccount(@PathVariable int artistId,Model model){
        model.addAttribute("artistId", artistId);
        return "/account/createAccount";
    }

    @PostMapping("/complete-account")
    public String completeAccount(@PathVariable int artistId,@ModelAttribute Member member,Model model) {
        if(member == null){
            return "/account/createAccount";
        }
        memberService.memberAdd(member);
        String createdId = member.getUserId();
        model.addAttribute("artistId", artistId);
        model.addAttribute("createdId", createdId);
        log.info("complete = {} !!!!",createdId);
        return "/account/completeAccount";
    }

    @GetMapping("/login-account")
    public String get_loginAccount(@PathVariable int artistId,
                                   HttpServletRequest request, Model model) {
        String referUrl = referUrlOutput(request);
        referUrl = referUrl == null ? "/main/" + artistId : referUrl;
        model.addAttribute("referUrl", referUrl);
        model.addAttribute("artistId", artistId);
        return "/account/login";
    }

    @PostMapping("/login-account")
    public String post_loginAccount(@PathVariable int artistId,HttpServletRequest request, Model model) {
        String referUrl = referUrlOutput(request);
        model.addAttribute("referUrl", referUrl);
        return "/account/login";
    }

    private String referUrlOutput(HttpServletRequest request) {
        String referer = request.getHeader("referer");
        return referer;
    }

    @ResponseBody
    @PostMapping("/duple_check")
    public String dupleCheck(@PathVariable int artistId,@RequestParam("id") String id) {
        Member member = memberService.memberSelect(id);
        if (member != null) {
            return "duple";
        }
        return "notDuple";
    }

}
