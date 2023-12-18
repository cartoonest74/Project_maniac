package hello.market.service.order;

import hello.market.dto.Order;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements  OrderService {
    @Override
    public Order show_remainAmount(int productNo) {
        return null;
    }

    @Override
    public void calc_singleQuantity(int productNo, int optionQuantity) {

    }

    @Override
    public void calc_multiQuantity(int productNo, int optionNo, int optionQuantity) {

    }

    @Override
    public List<Order> show_orderList(int user_id, int limit) {
        return null;
    }

    @Override
    public Integer length_orderList(int user_id) {
        return null;
    }

}
