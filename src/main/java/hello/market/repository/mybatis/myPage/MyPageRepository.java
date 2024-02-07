package hello.market.repository.mybatis.myPage;

import hello.market.dto.Cart;
import hello.market.dto.Complete_deliveryInfo;

import java.util.List;

public interface MyPageRepository {
    void update_pwd(String edit_pwd, int user_id);
    void update_addr(String edit_addr, int user_id);
    void update_email(String edit_email, int user_id);
    void update_phone(String edit_phone, int user_id);
    Complete_deliveryInfo select_deliveryAddr(int user_id, String purchase_id);

    List<Cart> select_purchaseList(int user_id, String purchase_id);
}
