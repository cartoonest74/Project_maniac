package hello.market.service.myPage;

import hello.market.dto.Cart;
import hello.market.dto.Complete_deliveryInfo;
import hello.market.dto.Product;

import java.util.List;

public interface MyPageService {
    Complete_deliveryInfo view_purchase_deliveryInfo(int user_id, String purchase_id);

    List<Cart> get_purchaseList(int user_id, String purchase_id);
}
