package hello.market.repository.mybatis.myPage;

import hello.market.dto.Cart;
import hello.market.dto.Complete_deliveryInfo;
import hello.market.dto.DeliveryStatus_manual;
import hello.market.dto.Purchase_list;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class MybatisRepository implements MyPageRepository {

    private final MyPageMapper myPageMapper;

    @Override
    public void update_pwd(String edit_pwd, int user_id) {
        myPageMapper.update_pwd(edit_pwd, user_id);
    }

    @Override
    public void update_addr(String edit_addr, int user_id) {
        myPageMapper.update_addr(edit_addr,user_id);
    }

    @Override
    public void update_email(String edit_email, int user_id) {
        myPageMapper.update_email(edit_email,user_id);
    }

    @Override
    public void update_phone(String edit_phone, int user_id) {
        myPageMapper.update_tel(edit_phone, user_id);
    }

    @Override
    public List<DeliveryStatus_manual> select_deliveryStatus(int user_id) {
        List<DeliveryStatus_manual> deliveryStatusManuals = myPageMapper.select_deliveryStatus(user_id);
        return deliveryStatusManuals;
    }

    @Override
    public List<Purchase_list> select_purchaseLists(int user_id, long purchase_date, int purchase_status) {
        List<Purchase_list> purchaseLists = myPageMapper.select_purchaseLists(user_id, purchase_date, purchase_status);
        return purchaseLists;
    }

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
