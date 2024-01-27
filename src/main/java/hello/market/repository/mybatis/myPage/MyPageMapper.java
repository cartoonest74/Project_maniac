package hello.market.repository.mybatis.myPage;

import hello.market.dto.Cart;
import hello.market.dto.Complete_deliveryInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MyPageMapper {
    Complete_deliveryInfo select_deliveryAddr(@Param("user_id") int user_id, @Param("purchase_id") String purchase_id);

    List<Cart> select_purchaseList(@Param("user_id") int user_id, @Param("purchase_id") String purchase_id);
}
