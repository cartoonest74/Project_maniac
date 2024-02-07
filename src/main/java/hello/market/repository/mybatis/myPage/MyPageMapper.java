package hello.market.repository.mybatis.myPage;

import hello.market.dto.Cart;
import hello.market.dto.Complete_deliveryInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MyPageMapper {
    void update_pwd(@Param("edit_pwd") String edit_pwd, @Param("user_id") int user_id);
    void update_addr(@Param("edit_addr") String edit_addr, @Param("user_id") int user_id);
    void update_email(@Param("edit_email") String edit_email, @Param("user_id") int user_id);
    void update_tel(@Param("edit_tel") String edit_tel, @Param("user_id") int user_id);
    Complete_deliveryInfo select_deliveryAddr(@Param("user_id") int user_id, @Param("purchase_id") String purchase_id);

    List<Cart> select_purchaseList(@Param("user_id") int user_id, @Param("purchase_id") String purchase_id);
}
