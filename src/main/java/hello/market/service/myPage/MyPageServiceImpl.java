package hello.market.service.myPage;

import hello.market.dto.Cart;
import hello.market.dto.Complete_deliveryInfo;
import hello.market.dto.Product;
import hello.market.repository.mybatis.myPage.MyPageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MyPageServiceImpl implements MyPageService {
    private final MyPageRepository myPageRepository;
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
