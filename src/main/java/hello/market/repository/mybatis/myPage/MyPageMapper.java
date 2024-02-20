package hello.market.repository.mybatis.myPage;

import hello.market.dto.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MyPageMapper {
    void update_pwd(@Param("edit_pwd") String edit_pwd, @Param("user_id") int user_id);
    void update_addr(@Param("edit_addr") String edit_addr, @Param("user_id") int user_id);
    void update_email(@Param("edit_email") String edit_email, @Param("user_id") int user_id);
    void update_tel(@Param("edit_tel") String edit_tel, @Param("user_id") int user_id);

    void del_qna(int qna_id);
    void del_review(int review_id);
    List<Artist> select_searchReview(int user_id);
    List<Artist> select_searchQna(int user_id);
    Integer select_lengthShopReview(@Param("user_id") int user_id,@Param("artist_id") int artist_id);
    Integer select_lengthShopQna(@Param("user_id") int user_id, @Param("artist_id") int artist_id);
    List<ShopReview> select_shopReview(@Param("user_id") int user_id, @Param("artist_id") int artist_id, @Param("page_limit") int page_limit);
    List<ShopQna> select_shopQna(@Param("user_id") int user_id, @Param("artist_id") int artist_id, @Param("page_limit") int page_limit);
    List<DeliveryStatus_manual> select_deliveryStatus(@Param("user_id") int user_id);
    List<Purchase_list> select_purchaseLists(@Param("user_id") int user_id, @Param("purchase_date") long purchase_date, @Param("purchase_status") int purchase_status);
    Complete_deliveryInfo select_deliveryAddr(@Param("user_id") int user_id, @Param("purchase_id") String purchase_id);

    List<Cart> select_purchaseList(@Param("user_id") int user_id, @Param("purchase_id") String purchase_id);
}
