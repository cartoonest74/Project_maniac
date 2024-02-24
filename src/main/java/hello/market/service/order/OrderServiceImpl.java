package hello.market.service.order;

import hello.market.dto.Order;
import hello.market.dto.OrderDelivery_info;
import hello.market.dto.OrderRegistry_info;
import hello.market.dto.Portone;
import hello.market.repository.mybatis.order.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements  OrderService {

    private final OrderRepository orderRepository;

    @Override
    public List<OrderDelivery_info> get_deliveryAddr(int user_id) {
        List<OrderDelivery_info> orderDeliveryInfo = orderRepository.select_deliveryAddr(user_id);
        return orderDeliveryInfo;
    }

    @Override
    public OrderRegistry_info get_orderInfo(int user_id) {
        OrderRegistry_info orderRegistryInfo = orderRepository.select_orderInfo(user_id);
        return orderRegistryInfo;
    }

    @Override
    public void add_purchaseList(int user_id, Portone portone) {
        orderRepository.update_purchaseList(user_id, portone);
    }

    @Override
    public void delete_deliveryAddr(int user_id, OrderDelivery_info orderDeliveryInfo) {
        orderRepository.update_deleteAddr(user_id, orderDeliveryInfo);
    }

    @Override
    public void add_deliveryAddr(int user_id, OrderDelivery_info orderDeliveryInfo) {
        orderRepository.update_deliveryAddr(user_id, orderDeliveryInfo);
    }

    @Override
    public void add_orderInfo(int user_id, String orderInfo) {
        orderRepository.update_orderInfo(user_id,orderInfo);
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