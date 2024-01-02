package hello.market.repository.mybatis.order;

import hello.market.dto.Order;
import hello.market.dto.OrderRegistry_info;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface OrderMapper {
    void update_orderInfo(@Param("user_id") int user_id, @Param("orderInfo") String orderInfo);
    void update_singleQuantity(@Param("productNo") int productNo, @Param("optionQuantity") int optionQuantity);
    void update_multiQuantity(@Param("productNo") int productNo,@Param("optionNo") int optionNo,@Param("optionQuantity") int optionQuantity);
    List<Order> select_orderList(@Param("user_id") int user_id,@Param("limit") int limit);

    Integer select_orderListLength(@Param("user_id") int user_id);
}
