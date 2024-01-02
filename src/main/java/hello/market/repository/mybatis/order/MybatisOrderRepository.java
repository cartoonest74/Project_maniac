package hello.market.repository.mybatis.order;

import hello.market.dto.Order;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.List;

@Slf4j
@Repository
@RequiredArgsConstructor
public class MybatisOrderRepository implements OrderRepository {

    private final OrderMapper orderMapper;

    @Override
    public void update_orderInfo(int user_id, String orderInfo) {
        orderMapper.update_orderInfo(user_id,orderInfo);
    }

    @Override
    public void update_singleQuantity(int productNo, int optionQuantity) {
        orderMapper.update_singleQuantity(productNo,optionQuantity);
    }

    @Override
    public void update_multiQuantity(int productNo, int optionNo, int optionQuantity) {
        orderMapper.update_multiQuantity(productNo, optionNo, optionQuantity);
    }

    @Override
    public List<Order> select_orderList(int user_id, int limit) {
        List<Order> orders = orderMapper.select_orderList(user_id, limit);
        return orders;
    }

    @Override
    public Integer select_orderListLength(int user_id) {
        Integer orderListLength = orderMapper.select_orderListLength(user_id);
        return orderListLength;
    }
}
