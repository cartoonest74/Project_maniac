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
