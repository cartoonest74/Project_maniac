package hello.market.service.order;

import hello.market.dto.Order;
import hello.market.repository.mybatis.order.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements  OrderService {

    private final OrderRepository orderRepository;

    @Override
    public void add_orderInfo(int user_id, String orderInfo) {
        orderRepository.update_orderInfo(user_id,orderInfo);
    }

    @Override
    public void calc_singleQuantity(int productNo, int optionQuantity) {
        orderRepository.update_singleQuantity(productNo, optionQuantity);
    }

    @Override
    public void calc_multiQuantity(int productNo, int optionNo, int optionQuantity) {
        orderRepository.update_multiQuantity(productNo,optionNo, optionQuantity);
    }

    @Override
    public List<Order> show_orderList(int user_id, int limit) {
        List<Order> orders = orderRepository.select_orderList(user_id, limit);
        return orders;
    }

    @Override
    public Integer length_orderList(int user_id) {
        Integer orderListLength = orderRepository.select_orderListLength(user_id);
        return orderListLength;
    }
}
