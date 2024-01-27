package hello.market.repository.mybatis.myPage;

import hello.market.dto.Cart;
import hello.market.dto.Complete_deliveryInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class MybatisRepository implements MyPageRepository {

    private final MyPageMapper myPageMapper;

    @Override
    public Complete_deliveryInfo select_deliveryAddr(int user_id, String purchase_id) {
        Complete_deliveryInfo completeDeliveryInfo = myPageMapper.select_deliveryAddr(user_id, purchase_id);
        return completeDeliveryInfo;
    }

    @Override
    public List<Cart> select_purchaseList(int user_id, String purchase_id) {
        List<Cart> carts = myPageMapper.select_purchaseList(user_id, purchase_id);
        return carts;
    }
}
