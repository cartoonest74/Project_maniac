package hello.market.repository.mybatis.order;

import hello.market.dto.Order;
import hello.market.dto.OrderDelivery_info;
import hello.market.dto.OrderRegistry_info;

import java.util.List;

public interface OrderRepository {
    List<OrderDelivery_info> select_deliveryAddr(int user_id);

    OrderRegistry_info select_orderInfo(int user_id);

    void update_deliveryAddr(int user_id, OrderDelivery_info orderDeliveryInfo);
    void update_orderInfo(int user_id,String orderInfo);
    void update_singleQuantity(int productNo, int optionQuantity);
    void update_multiQuantity(int productNo, int optionNo, int optionQuantity);

    List<Order> select_orderList(int user_id, int limit);

    Integer select_orderListLength(int user_id);
}
