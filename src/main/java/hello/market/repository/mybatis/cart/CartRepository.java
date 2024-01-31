package hello.market.repository.mybatis.cart;

import hello.market.dto.Cart;

import java.util.List;

public interface CartRepository {
	Integer select_purchaseQuantity(int user_id, String productNo);
	List<Cart> quantity_check(int user_id);
	List<Cart> db_select(int user_id, int limit);
	void db_save(int productNo,String option_id, int quantity);

	void db_delete(int user_id,String productNo);

	void db_create(int user_id);

	Integer cart_length(int user_id);
}
