package hello.market.service.Cart;

import hello.market.dto.Cart;
import hello.market.repository.mybatis.cart.CartRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CartServiceImpl implements  CartService{

    private final CartRepository cartRepository;

    @Override
    public Integer purchaseQuantity_check(int user_id, String product_no) {
        Integer purchaseQuantity = cartRepository.select_purchaseQuantity(user_id, product_no);
        return purchaseQuantity;
    }

    @Override
    public List<Cart> quantity_check(int user_id) {
        List<Cart> carts = cartRepository.quantity_check(user_id);
        return carts;
    }

    @Override
    public void create_cart(int user_id) {
        cartRepository.db_create(user_id);
    }

    @Override
    public void add_cart(int user_id, String productNo, int quantity) {
        cartRepository.db_save(user_id,productNo,quantity);
    }

    @Override
    public List<Cart> get_overdueCart(int user_id, String overdue_date) {
        List<Cart> carts = cartRepository.select_overdueCart(user_id, overdue_date);
        return carts;
    }

    @Override
    public Integer cart_length(int user_id) {
        Integer cart_length = cartRepository.cart_length(user_id);
        return cart_length;
    }

    @Override
    public List<Cart> select_cart(int user_id, int limit) {
        List<Cart> cartList = cartRepository.db_select(user_id, limit);
        return cartList;
    }

    @Override
    public void delete_cart(int user_id, String productNo) {
        cartRepository.db_delete(user_id,productNo);
    }

}
