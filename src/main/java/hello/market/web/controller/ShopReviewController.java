package hello.market.web.controller;

import hello.market.dto.Member;
import hello.market.dto.Product;
import hello.market.dto.ReviewUploadForm;
import hello.market.dto.ShopReview;
import hello.market.service.member.MemberService;
import hello.market.service.product.ProductService;
import hello.market.service.shopReview.ShopReviewService;
import hello.market.web.session.LoginSessionManager;
import hello.market.web.file.FileStore;
import hello.market.web.file.UploadFile;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

import static hello.market.dto.UploadDirName.*;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/product-review/{artistId}")
public class ShopReviewController {

    private final MemberService memberService;
    private final ProductService productService;
    private final ShopReviewService shopReviewService;
    private final FileStore fileStore;
    private final LoginSessionManager sessionLoginCheck;
    private StringBuilder review_tag = new StringBuilder();

    @PostMapping("/add-review")
    private String addReview(@PathVariable Integer artistId, @ModelAttribute ReviewUploadForm reviewUploadForm,HttpServletRequest request) throws IOException {

        UploadFile uploadFile = fileStore.storeFile(REVIEW_SHOP_IMG_DIR,reviewUploadForm.getReviewImgFile());
        String saveFileName = uploadFile.getSaveFileName();
        String saveFilePath = uploadFile.getSavePath();

        // 업로드할 파일 경로를 설정
        String userContent = reviewUploadForm.getContent();
        int proudctNum = reviewUploadForm.getProductNo();
        int userId = sessionLoginCheck.sessionUUIDcheck(request);

        ShopReview shopReview = new ShopReview();
        shopReview.setProductNo(proudctNum);
        shopReview.setUserNo(userId);
        shopReview.setUrl(saveFilePath);
        shopReview.setContent(userContent);
        shopReviewService.addReview(shopReview);
        return String.format("redirect:/product/%d/find-product/%d",artistId,proudctNum);
    }

    @ResponseBody
    @GetMapping("/view-review")
    private String viewReview(@RequestParam Integer productNo, @RequestParam Integer limit){
        Integer reviewLength = shopReviewService.allReviewLength(productNo,0);

        review_tag.setLength(0);
        List<ShopReview> shopReviews = shopReviewService.allViewReview(productNo, limit);

        for (ShopReview sq : shopReviews) {
            create_qnaTag(sq);
        }
        String review_tag_complete = review_tag.toString();

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("allCount", reviewLength);
        jsonObject.put("content", review_tag_complete);

        return jsonObject.toString();
    }

    @GetMapping("/view-addReview")
    private String viewAdddReview(@RequestParam Integer productNo, HttpServletRequest request, Model model){
        int id = sessionLoginCheck.sessionUUIDcheck(request);

        Product product = productService.findProduct(productNo);
        Member member = memberService.memberSelect(id);
        String memberId = member.getUserId();

        model.addAttribute("productinfo", product);
        model.addAttribute("memberId", memberId);
        return "/review/writer_review";
    }

    private String getcontextPath(HttpServletRequest request){
        StringBuffer requestURL = request.getRequestURL();
        String contextPath = request.getRequestURI();
        String[] uriSplit = requestURL.toString().split(contextPath);
        return uriSplit[0];
    }

    private void create_qnaTag(ShopReview shopReview) {
        String userId = shopReview.getUserId();
        String userUrl = shopReview.getUrl();
        String userDate = shopReview.getDate();
        String userContent = shopReview.getContent();
        String[] urlArrays = userUrl.split("/");
        String urlAlt = urlArrays[urlArrays.length - 1];
        review_tag.append("<nav class=\"shopInfo_bc_header\">")
                .append("<p class=\"shopInfo_re_title\">")
                .append("")
                .append("</p>")
                .append("<p>Q :</p>")
                .append("<p>" + userId + "</p>").append("<p>" + userDate + "</p>")
                .append("</nav>")
                .append("<div class=\"shopInfo_bc_content\">")
                .append(" <nav class=\"shopInfo_BoardImg\">\r\n")
                .append("<img src=" + userUrl + " alt=" + urlAlt + ">\r\n")
                .append("</nav>")
                .append("<p class=\"shopInfo_bc_text\">" + userContent + "</p>")
                .append("</div>");
    }
}
