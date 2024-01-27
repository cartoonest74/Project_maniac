package hello.market.repository.mybatis.myPage;

import hello.market.dto.Cart;
import hello.market.dto.Complete_deliveryInfo;

import java.util.List;

public interface MyPageRepository {
    Complete_deliveryInfo select_deliveryAddr(int user_id, String purchase_id);

    List<Cart> select_purchaseList(int user_id, String purchase_id);
}
