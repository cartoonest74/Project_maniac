package hello.market.web.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import hello.market.dto.*;
import hello.market.service.member.MemberService;
import hello.market.service.myPage.MyPageService;
import hello.market.web.file.FileStore;
import hello.market.web.file.UploadFile;
import hello.market.web.session.LoginSessionManager;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

import static hello.market.dto.UploadDirName.REVIEW_SHOP_IMG_DIR;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/myPage/{artistId}")
public class MyPageController {
    private final MyPageService myPageService;
    private final LoginSessionManager loginSessionManager;
    private final MemberService memberService;
    private final FileStore fileStore;

    @Value("${file.dir}")
    private String uploadPath;

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

    @ResponseBody
    @DeleteMapping("/del_qna")
    private String del_productQna(@PathVariable int artistId, @RequestParam("qnaId") int qnaId) {
        myPageService.del_userShopQna(qnaId);
        return "ok";
    }

    @ResponseBody
    @PostMapping("/product_question")
    private String post_productQuestion(@PathVariable int artistId,
                                        @RequestParam("category") int category,
                                        @RequestParam("page") int page,
                                        @RequestParam int answerCheck_start, @RequestParam int answerCheck_end,
                                        HttpServletRequest request) throws JsonProcessingException {
        int user_id = loginSessionManager.sessionUUIDcheck(request);
        ObjectMapper objectMapper = new ObjectMapper();
        JSONObject jsonObject = new JSONObject();
        JSONArray arr_shopQna = new JSONArray();
        JSONArray arr_artist = new JSONArray();
        
        // qna 전체 게시글 개수 가져오기
        Integer lengthShopQna = myPageService.get_lengthShopQna(user_id, category, answerCheck_start, answerCheck_end);
        // 사용자가 작성한 qna 가져오기
        List<ShopQna> userShopQna = myPageService.get_userShopQna(user_id, category, page,answerCheck_start,answerCheck_end);
        for (ShopQna shopQna : userShopQna) {
            String writeValueAsString = objectMapper.writeValueAsString(shopQna);
            arr_shopQna.put(writeValueAsString);
        }
        // qna 상품 분류 아티스트 기준으로 아티스트 리스트 가져오기
        List<Artist> searchQnaType = myPageService.get_searchQnaType(user_id);
        for (Artist artist : searchQnaType) {
            String writeValueAsString = objectMapper.writeValueAsString(artist);
            arr_artist.put(writeValueAsString);
        }
        jsonObject.put("qnaList", arr_shopQna);
        jsonObject.put("allCount", lengthShopQna);
        jsonObject.put("searchList", arr_artist);
        return jsonObject.toString();
    }

    @GetMapping("/product_question")
    private String get_productQuestion(@PathVariable int artistId,
                                       @RequestParam(value = "page", required = false, defaultValue = "1") int page,
                                       @RequestParam(value = "category", required = false, defaultValue = "0") int category,
                                       @RequestParam(value = "answerCheck", required = false, defaultValue = "all") String answerCheck,
                                       HttpServletRequest request) {
        int user_id = loginSessionManager.sessionUUIDcheck(request);
        return "/myPage/userProductQuestion";
    }

    @ResponseBody
    @DeleteMapping("/del_review")
    private String del_productReview(@PathVariable int artistId,
                                     @RequestParam("imgUrl") String imgUrl,
                                     @RequestParam("reviewId") int reviewId) throws IOException {
        myPageService.del_userShopReview(reviewId);
        delete_file(imgUrl);
        return "ok";
    }

    @ResponseBody
    @PostMapping("/edit_review")
    private String put_editReview(@PathVariable int artistId,
                                  @RequestParam("reviewId") int reviewId,
                                  @RequestParam("del_imgPath") String del_imgPath,
                                  @RequestParam("is_changeImg") boolean is_changeImg,
                                  @RequestParam("editImgUrl") MultipartFile editImgUrl,
                                  @RequestParam("editText") String editText,
                                  HttpServletRequest request) throws IOException {
        int user_id = loginSessionManager.sessionUUIDcheck(request);
        if(is_changeImg) {
            UploadFile uploadFile = fileStore.storeFile(REVIEW_SHOP_IMG_DIR,editImgUrl);
            String saveFileName = uploadFile.getSaveFileName();
            String saveFilePath = uploadFile.getSavePath();
            delete_file(del_imgPath);
            myPageService.edit_userReview(user_id,reviewId,editText,saveFilePath);
            return "ok";
        }
        del_imgPath = "/img"+del_imgPath;
        myPageService.edit_userReview(user_id,reviewId,editText,del_imgPath);
        return "ok";
    }

    @ResponseBody
    @PostMapping("/product_review")
    private String post_productReview(@PathVariable int artistId,
                                      @RequestParam("page") int page,
                                      @RequestParam("category") int category,
                                      HttpServletRequest request) throws JsonProcessingException {
        int user_id = loginSessionManager.sessionUUIDcheck(request);

        ObjectMapper objectMapper = new ObjectMapper();
        JSONObject jsonObject = new JSONObject();
        JSONArray arr_shopReview = new JSONArray();
        JSONArray arr_artist = new JSONArray();

        Integer lengthSopReview = myPageService.get_lengthSopReview(user_id,category);
        List<ShopReview> userShopReview = myPageService.get_userShopReview(user_id, category, page);
        for (ShopReview shopReview : userShopReview) {
            String writeValueAsString = objectMapper.writeValueAsString(shopReview);
            arr_shopReview.put(writeValueAsString);
        }
        List<Artist> searchReviewType = myPageService.get_searchReviewType(user_id);
        for (Artist artist : searchReviewType) {
            String writeValueAsString = objectMapper.writeValueAsString(artist);
            arr_artist.put(writeValueAsString);
        }

        jsonObject.put("reviewList", arr_shopReview);
        jsonObject.put("allCount", lengthSopReview);
        jsonObject.put("searchList", arr_artist);
        return jsonObject.toString();
    }

    @GetMapping("/product_review")
    private String get_productReview(@PathVariable int artistId,
                                     @RequestParam(value = "page", required = false, defaultValue = "0") int page,
                                     @RequestParam(value = "category", required = false, defaultValue = "0") int category,
                                     HttpServletRequest request,
                                     Model model) {
        int user_id = loginSessionManager.sessionUUIDcheck(request);
        List<ShopReview> userShopReview = myPageService.get_userShopReview(user_id, category, page);
        model.addAttribute("userShopReview", userShopReview);
        log.info("userShopReview={}", userShopReview);
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