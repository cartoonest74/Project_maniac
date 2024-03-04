package hello.market.service.Cart;

import hello.market.dto.Cart;

import java.util.List;

public interface CartService {
    Integer purchaseQuantity_check(int user_id, String product_no);
    List<Cart> quantity_check(int user_id);
    void create_cart(int user_id);
    void delete_cart(int user_id,String productNo);
    void add_cart(int user_id,String productNo, int quantity);
    List<Cart> get_overdueCart(int user_id,String overdue_date);
    Integer cart_length(int user_id);
    List<Cart> select_cart(int user_id, int limit);
}
