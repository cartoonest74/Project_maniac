package hello.market.repository.mybatis.order;

import hello.market.dto.Order;
import hello.market.dto.OrderDelivery_info;
import hello.market.dto.OrderRegistry_info;
import hello.market.dto.Portone;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface OrderMapper {
    List<OrderDelivery_info> select_deliveryAddr(@Param("user_id") int user_id);
    OrderRegistry_info select_orderInfo(@Param("user_id") int user_id);

    void update_purchaseList(@Param("user_id") int user_id, @Param("Portone") Portone portone);
    void update_deleteAddr(@Param("user_id") int user_id, @Param("OrderDelivery_info") OrderDelivery_info orderDeliveryInfo);
    void update_deliveryAddr(@Param("user_id") int user_id,@Param("OrderDelivery_info") OrderDelivery_info orderDeliveryInfo);
    void update_orderInfo(@Param("user_id") int user_id, @Param("orderInfo") String orderInfo);
    void update_multiQuantity(@Param("productNo") int productNo,@Param("optionNo") int optionNo,@Param("optionQuantity") int optionQuantity);
    List<Order> select_orderList(@Param("user_id") int user_id,@Param("limit") int limit);

    Integer select_orderListLength(@Param("user_id") int user_id);
}