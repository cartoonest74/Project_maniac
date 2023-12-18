package hello.market.service.order;


import hello.market.dto.Order;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface OrderService {
    Order show_remainAmount(int productNo);
    void calc_singleQuantity(int productNo, int optionQuantity);
    void calc_multiQuantity(int productNo, int optionNo, int optionQuantity);

    List<Order> show_orderList(int user_id, int limit);

    Integer length_orderList(int user_id);
}
