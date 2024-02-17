package hello.market.web.controller;


import hello.market.dto.Member;
import hello.market.dto.Product;
import hello.market.dto.QnaUploadForm;
import hello.market.dto.ShopQna;
import hello.market.service.member.MemberService;
import hello.market.service.product.ProductService;
import hello.market.service.shopQna.ShopQnaService;
import hello.market.web.session.LoginSessionManager;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.json.simple.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/product-qna/{artistId}")
public class ShopQnaController {

    private final MemberService memberService;
    private final ProductService productService;
    private final ShopQnaService shopQnaService;
    private final LoginSessionManager sessionLoginCheck;

    private StringBuilder qna_tag = new StringBuilder();

    @GetMapping("/view-addQna")
    private String viewAddQna(@PathVariable Integer artistId, @RequestParam int productNo, HttpServletRequest request, Model model) {
        Product product = productService.findProduct(productNo);

        Integer userNo = sessionLoginCheck.sessionUUIDcheck(request);
        Member member = memberService.memberSelect(userNo);
        String memberId = member.getUserId();

        model.addAttribute("productinfo", product);
        model.addAttribute("memberId", memberId);
        model.addAttribute("artistId", artistId);
        log.info("userNo = {}, memberId = {}", userNo, memberId);
        return "/qna/writer_qna";
    }

    @ResponseBody
    @PostMapping("/view-qna")
    private String viewQna(@RequestParam("productNo") int productNo, @RequestParam("limit") int limit) {
        Integer qnaLength = shopQnaService.allQnaLength(productNo,0);

        qna_tag.setLength(0);
        List<ShopQna> shopQnas = shopQnaService.allViewQna(productNo, limit);

        for (ShopQna sq : shopQnas) {
//            userId = sq.getUserId();
//            userDate = sq.getDate();
//            userContent = sq.getContent();
//            answer_check = sq.getAnswer_check();
            create_qnaTag(sq);
        }
        String qna_tag_complete = qna_tag.toString();

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("allCount", qnaLength);
        jsonObject.put("content", qna_tag_complete);
        return jsonObject.toString();
    }

    @PostMapping("/add-qna")
    private String addQna(@PathVariable Integer artistId,@ModelAttribute QnaUploadForm qnaUploadForm, HttpServletRequest request) {
        int productNo = qnaUploadForm.getProduct_no();
        int userId = sessionLoginCheck.sessionUUIDcheck(request);

        String content = qnaUploadForm.getContent();
        log.info("productNo = {}, userId = {}, content = {}", productNo, userId, content);
        ShopQna shopQna = new ShopQna();
        shopQna.setProductNo(productNo);
        shopQna.setWriter_num(userId);
        shopQna.setContent(content);

        shopQnaService.addQna(shopQna);
        return String.format("redirect:/product/%d/find-product/%d",artistId,productNo);
    }

    @GetMapping("/qna-answer")
    private String qnaAnswer() {
        return "";
    }

    @GetMapping("/del_qna")
    private String delQna() {
        return "";
    }

    private void create_qnaTag(ShopQna sq) {
        Integer answerCheck = sq.getAnswerCheck();
        String qnaTitle = sq.getTitle();
        String userId = sq.getUserId();
        String date = sq.getDate();
        String content = sq.getContent();
        int id = sq.getId();
        log.info("answer_check = {}", answerCheck);
        qna_tag.append("<div class=\"shopInfo_bc_container\">")
                .append("<nav class=\"shopInfo_bc_header\">")
                .append("<p class=\"shopInfo_re_title\">")
                .append(qnaTitle)
                .append("</p>")
                .append("<p>Q :&nbsp;</p>").append("<p>" + userId + "</p>")
                .append("<p>" + date + "</p>")
                .append("</nav>")
                .append("<div class=\"shopInfo_bc_content\">")
                .append("<p class=\"shopInfo_bc_text\">" + content + "</p>");

        if (answerCheck != 1) {
            qna_tag.append("<button data-answer-qna=\"" + id + "\" " + "class=\"shopInfo_qna_re_btn\" "
                    + "type=\"button\">Answer</button>");
        }
        qna_tag.append("</div>");

        String rootDate = sq.getRootDate();
        String rootContent = sq.getRootContent();

        if (answerCheck == 1 ) {
            qna_tag.append("<nav class=\"shopInfo_bc_header\">")
                    .append("<p>\r\n"
                            + "	<i class=\"fa-solid fa-arrow-turn-up fa-rotate-90 fa-lg\"></i>&nbsp;\r\n"
                            + "	&nbsp;A&nbsp;:&nbsp;\r\n" + "</p>")
                    .append("<p>ADMIN</p>").append("<p>" + rootDate + "</p>")
                    .append("</nav>")
                    .append("<div class=\"shopInfo_bc_content\">")
                    .append("<p class=\"shopInfo_bc_text\">" + rootContent + "</p>")
                    .append("</div>");
        }
        qna_tag.append("</div>");
    }
}
