package hello.market.repository.mybatis.order;

import hello.market.dto.Order;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MybatisOrderRepository implements OrderRepository {

    private OrderMapper orderMapper;

    @Override
    public Order select_remainAmount(int productNo) {

        return null;
    }

    @Override
    public void update_singleQuantity(int productNo, int optionQuantity) {

    }

    @Override
    public void update_multiQuantity(int productNo, int optionNo, int optionQuantity) {

    }

    @Override
    public List<Order> select_orderList(int user_id, int limit) {
        return null;
    }

    @Override
    public Integer select_orderListLength(int user_id) {
        return null;
    }
}
