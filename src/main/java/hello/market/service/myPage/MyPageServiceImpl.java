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
    public void edit_memberPwd(String edit_pwd, int user_id) {
        myPageRepository.update_pwd(edit_pwd,user_id);
    }

    @Override
    public void edit_memberAddr(String edit_addr, int user_id) {
        myPageRepository.update_addr(edit_addr, user_id);
    }

    @Override
    public void edit_memberPhone(String edit_phone, int user_id) {
        myPageRepository.update_phone(edit_phone,user_id);
    }

    @Override
    public void edit_memberEmail(String edit_email, int user_id) {
        myPageRepository.update_email(edit_email, user_id);
    }

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
