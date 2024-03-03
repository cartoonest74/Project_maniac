package hello.market.service.myPage;

import hello.market.dto.*;
import hello.market.repository.mybatis.myPage.MyPageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MyPageServiceImpl implements MyPageService {
    private final MyPageRepository myPageRepository;

    @Override
    public void edit_memberPwd(String edit_pwd, int user_id) {
        myPageRepository.update_pwd(edit_pwd,user_id);
    }

    @Override
    public void edit_memberAddr(String edit_addr, int user_id) {
        myPageRepository.update_addr(edit_addr, user_id);
    }

    @Override
    public void edit_memberPhone(String edit_phone, int user_id) {
        myPageRepository.update_phone(edit_phone,user_id);
    }

    @Override
    public void edit_memberEmail(String edit_email, int user_id) {
        myPageRepository.update_email(edit_email, user_id);
    }

    @Override
    public void edit_userReview(int user_id, int review_id, String editText, String editImg_url) {
        myPageRepository.update_editReview(user_id,review_id,editText,editImg_url);
    }

    @Override
    public void del_userShopReview(int review_id) {
        myPageRepository.del_review(review_id);
    }

    @Override
    public void del_userShopQna(int qna_id) {
        myPageRepository.del_qna(qna_id);
    }

    @Override
    public List<Artist> get_searchReviewType(int user_id) {
        List<Artist> artists = myPageRepository.select_searchReview(user_id);
        return artists;
    }

    @Override
    public List<Artist> get_searchQnaType(int user_id) {
        List<Artist> artists = myPageRepository.select_searchQna(user_id);
        return artists;
    }

    @Override
    public Integer get_lengthSopReview(int user_id,int artistId) {
        Integer lengthShopReview = myPageRepository.select_lengthShopReview(user_id,artistId);
        return lengthShopReview;
    }

    @Override
    public Integer get_lengthShopQna(int user_id,int artistId, int answerCheck_start, int answerCheck_end) {
        Integer lengthShopQna = myPageRepository.select_lengthShopQna(user_id,artistId,answerCheck_start,answerCheck_end);
        return lengthShopQna;
    }

    @Override
    public List<ShopReview> get_userShopReview(int user_id, int artist_id, int page_limit) {
        List<ShopReview> shopReviews = myPageRepository.select_shopReview(user_id, artist_id, page_limit);
        return shopReviews;
    }

    @Override
    public List<ShopQna> get_userShopQna(int user_id, int artist_id, int page_limit, int answerCheck_start, int answerCheck_end) {
        List<ShopQna> shopQnas = myPageRepository.select_shopQna(user_id, artist_id, page_limit, answerCheck_start, answerCheck_end);
        return shopQnas;
    }

    @Override
    public List<DeliveryStatus_manual> get_deliveryStatus(int user_id) {
        List<DeliveryStatus_manual> deliveryStatusManuals = myPageRepository.select_deliveryStatus(user_id);
        return deliveryStatusManuals;
    }

    @Override
    public List<Purchase_list> get_purchaseLists(int user_id, long purchase_date, int purchase_status) {
        List<Purchase_list> purchaseLists = myPageRepository.select_purchaseLists(user_id, purchase_date, purchase_status);
        return purchaseLists;
    }

    @Override
    public Complete_deliveryInfo view_purchase_deliveryInfo(int user_id, String purchase_id) {
        Complete_deliveryInfo completeDeliveryInfo = myPageRepository.select_deliveryAddr(user_id, purchase_id);
        return completeDeliveryInfo;
    }

    @Override
    public List<Cart> get_purchaseList(int user_id, String purchase_id) {
        List<Cart> carts = myPageRepository.select_purchaseList(user_id, purchase_id);
        return carts;
    }
}
