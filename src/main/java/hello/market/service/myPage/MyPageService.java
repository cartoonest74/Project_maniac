package hello.market.service.myPage;

import hello.market.dto.*;

import java.util.List;

public interface MyPageService {
    void edit_memberPwd(String edit_pwd, int user_id);
    void edit_memberAddr(String edit_addr, int user_id);
    void edit_memberPhone(String edit_phone, int user_id);
    void edit_memberEmail(String edit_email, int user_id);
    void edit_userReview(int user_id, int review_id, String editText, String editImg_url);

    void del_userShopReview(int review_id);
    void del_userShopQna(int qna_id);

    List<Artist> get_searchReviewType(int user_id);
    List<Artist> get_searchQnaType(int user_id);
    Integer get_lengthSopReview(int user_id,int artistId);

    Integer get_lengthShopQna(int user_id,int artistId);
    List<ShopReview> get_userShopReview(int user_id, int artist_id, int page_limit);

    List<ShopQna> get_userShopQna(int user_id, int artist_id, int page_limit);
    List<DeliveryStatus_manual> get_deliveryStatus(int user_id);
    List<Purchase_list> get_purchaseLists(int user_id, long purchase_date,int purchase_status);
    Complete_deliveryInfo view_purchase_deliveryInfo(int user_id, String purchase_id);

    List<Cart> get_purchaseList(int user_id, String purchase_id);
}
