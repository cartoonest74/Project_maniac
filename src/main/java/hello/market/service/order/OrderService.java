package hello.market.service.order;


import hello.market.dto.Order;
import hello.market.dto.OrderDelivery_info;
import hello.market.dto.OrderRegistry_info;
import hello.market.dto.Portone;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface OrderService {
    List<OrderDelivery_info> get_deliveryAddr(int user_id);
    OrderRegistry_info get_orderInfo(int user_id);

    void add_purchaseList(int user_id, Portone portone);
    void delete_deliveryAddr(int user_id, OrderDelivery_info orderDeliveryInfo);
    void add_deliveryAddr(int user_id, OrderDelivery_info orderDeliveryInfo);
    void add_orderInfo(int user_id, String orderInfo);
    void calc_singleQuantity(int productNo, int optionQuantity);
    void calc_multiQuantity(int productNo, int optionNo, int optionQuantity);

    List<Order> show_orderList(int user_id, int limit);

    Integer length_orderList(int user_id);
}