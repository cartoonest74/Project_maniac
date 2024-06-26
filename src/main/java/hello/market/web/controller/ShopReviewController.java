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
import org.json.simple.JSONObject;
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



    @ResponseBody
    @PostMapping("/view-review")
    private String viewReview(@RequestParam Integer productNo, @RequestParam Integer limit){
        Integer reviewLength = shopReviewService.allReviewLength(productNo,0);

        review_tag.setLength(0);
        List<ShopReview> shopReviews = shopReviewService.allViewReview(productNo, limit);

        for (ShopReview sr : shopReviews) {
            create_reviewTag(sr);
        }
        String review_tag_complete = review_tag.toString();

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("allCount", reviewLength);
        jsonObject.put("content", review_tag_complete);

        return jsonObject.toString();
    }

    @GetMapping("/view-addReview")
    private String viewAdddReview(@PathVariable Integer artistId,@RequestParam Integer productNo, HttpServletRequest request, Model model){
        int id = sessionLoginCheck.sessionUUIDcheck(request);

        Product product = productService.findProduct(productNo);
        Member member = memberService.memberSelect(id);
        String memberId = member.getUserId();

        model.addAttribute("productinfo", product);
        model.addAttribute("memberId", memberId);
        model.addAttribute("artistId", artistId);
        return "/review/writer_review";
    }

    @ResponseBody
    @PutMapping("/add-review")
    private String post_addReview(@PathVariable Integer artistId,
                                  @ModelAttribute ReviewUploadForm reviewUploadForm,
                                  HttpServletRequest request) throws IOException {
        UploadFile uploadFile = fileStore.storeFile(REVIEW_SHOP_IMG_DIR,reviewUploadForm.getReviewImgFile());
        String saveFileName = uploadFile.getSaveFileName();
        String saveFilePath = uploadFile.getSavePath();

        // 업로드할 파일 경로를 설정
        String userContent = reviewUploadForm.getContent();
        int productNum = reviewUploadForm.getProductNo();
        int review_artistId = reviewUploadForm.getArtistId();
        int userId = sessionLoginCheck.sessionUUIDcheck(request);

        ShopReview shopReview = new ShopReview();
        shopReview.setProductNo(productNum);
        shopReview.setArtist_id(review_artistId);
        shopReview.setUserNo(userId);
        shopReview.setUrl(saveFilePath);
        shopReview.setContent(userContent);

        shopReviewService.addReview(shopReview);
        return "ok";
    }

    private void create_reviewTag(ShopReview shopReview) {
        String userId = shopReview.getUserId();
        String productTitle = shopReview.getTitle();
        String userUrl = shopReview.getUrl();
        String userDate = shopReview.getDate();
        String userContent = shopReview.getContent();
        String[] urlArrays = userUrl.split("/");
        String urlAlt = urlArrays[urlArrays.length - 1];
        review_tag.append("<nav class=\"shopInfo_bc_header\">")
                .append("<p class=\"shopInfo_re_title\">")
                .append(productTitle)
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
