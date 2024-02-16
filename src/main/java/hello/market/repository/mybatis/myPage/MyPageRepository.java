package hello.market.repository.mybatis.myPage;

import hello.market.dto.Cart;
import hello.market.dto.Complete_deliveryInfo;
import hello.market.dto.DeliveryStatus_manual;
import hello.market.dto.Purchase_list;

import java.util.List;

public interface MyPageRepository {
    void update_pwd(String edit_pwd, int user_id);
    void update_addr(String edit_addr, int user_id);
    void update_email(String edit_email, int user_id);
    void update_phone(String edit_phone, int user_id);

    List<DeliveryStatus_manual> select_deliveryStatus(int user_id);
    List<Purchase_list> select_purchaseLists(int user_id, long purchase_date, int purchase_status);
    Complete_deliveryInfo select_deliveryAddr(int user_id, String purchase_id);

    List<Cart> select_purchaseList(int user_id, String purchase_id);
}
