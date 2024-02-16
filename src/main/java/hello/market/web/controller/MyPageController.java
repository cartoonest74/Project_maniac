package hello.market.web.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import hello.market.dto.DeliveryStatus_manual;
import hello.market.dto.Member;
import hello.market.dto.Purchase_list;
import hello.market.service.member.MemberService;
import hello.market.service.myPage.MyPageService;
import hello.market.web.session.LoginSessionManager;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

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
        List<DeliveryStatus_manual> deliveryStatus = myPageService.get_deliveryStatus(user_id);
        model.addAttribute("memberInfo", member);
        model.addAttribute("artistId", artistId);
        model.addAttribute("deliveryStatus", deliveryStatus);
        return "/myPage/userInfo";
    }

    @GetMapping("/order_list")
    private String get_orderList(@PathVariable int artistId,
                                 @RequestParam(value = "month", required = false, defaultValue = "1") int month,
                                 @RequestParam(value = "status", required = false, defaultValue = "0") int status,
                                 Model model) {
        model.addAttribute("month", month);
        model.addAttribute("status", status);
        return "/myPage/userOrderList";
    }

    @ResponseBody
    @PostMapping("/order_list")
    private String post_orderList(@PathVariable int artistId,
                                  @RequestParam(value = "date", required = false, defaultValue = "1") int purchaseDate,
                                  @RequestParam(value = "status", required = false, defaultValue = "0") int purchaseStatus,
                                  HttpServletRequest request) throws JsonProcessingException {
        int user_id = loginSessionManager.sessionUUIDcheck(request);
        ObjectMapper objectMapper = new ObjectMapper();
        JSONObject jsonObject = new JSONObject();
        JSONArray jsonArray = new JSONArray();
        // date
        LocalDateTime localDateTime = LocalDateTime.now();
        LocalDateTime before_3month = localDateTime.minusMonths(purchaseDate);
        long current_timeMills = Timestamp.valueOf(before_3month).getTime();
        List<Purchase_list> purchaseLists = myPageService.get_purchaseLists(user_id, current_timeMills, purchaseStatus);
        for (Purchase_list purchaseList : purchaseLists) {
            String writeValueAsString = objectMapper.writeValueAsString(purchaseList);
            jsonArray.put(writeValueAsString);
        }
        jsonObject.put("orderList_array", jsonArray);
        return jsonObject.toString();
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

    //TODO userInfo edit
    @ResponseBody
    @PatchMapping("/edit_pwd")
    private String patch_editPwd(@PathVariable int artistId,
                                 @RequestParam("edit_pwd") String edit_pwd,
                                 @RequestParam("current_pwd") String current_pwd,
                                 HttpServletRequest request) {
        int user_id = loginSessionManager.sessionUUIDcheck(request);
        Member member = memberService.memberSelect(user_id);
        String pwd = member.getPwd();
        if(! current_pwd.equals(pwd)){
            return "no";
        }

        myPageService.edit_memberPwd(edit_pwd, user_id);
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
