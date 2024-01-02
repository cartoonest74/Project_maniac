package hello.market.repository.mybatis.order;

import hello.market.dto.Order;

import java.util.List;

public interface OrderRepository {
    void update_orderInfo(int user_id,String orderInfo);
    void update_singleQuantity(int productNo, int optionQuantity);
    void update_multiQuantity(int productNo, int optionNo, int optionQuantity);

    List<Order> select_orderList(int user_id, int limit);

    Integer select_orderListLength(int user_id);
}
