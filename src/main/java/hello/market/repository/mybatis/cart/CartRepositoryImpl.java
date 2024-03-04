package hello.market.repository.mybatis.cart;

import hello.market.dto.Cart;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Repository
@RequiredArgsConstructor
public class CartRepositoryImpl implements CartRepository {

	private final CartMapper cartMapper;

	@Override
	public List<Cart> select_overdueCart(int user_id, String overdue_date) {
		List<Cart> carts = cartMapper.select_overdueCart(user_id, overdue_date);
		return carts;
	}

	@Override
	public Integer select_purchaseQuantity(int user_id, String productNo) {
		Integer purchase_quantity = cartMapper.select_purchaseQuantity(user_id, productNo);
		return purchase_quantity;
	}

	@Override
	public List<Cart> quantity_check(int user_id) {
		List<Cart> carts = cartMapper.quantity_check(user_id);
		return carts;
	}
	@Override
	public List<Cart> db_select(int user_id, int limit) {
		List<Cart> cartList = cartMapper.select(user_id, limit);
		return cartList;
	}

	@Override
	public void db_save(int user_id, String productNo, int quantity) {
		cartMapper.save(user_id, productNo, quantity);
	}

	@Override
	public void db_delete(int user_id,String productNo) {
		cartMapper.delete(user_id, productNo);
	}

	@Override
	public void db_create(int user_id) {
		cartMapper.create_cart(user_id);
	}

	@Override
	public Integer cart_length(int user_id) {
		Integer cart_length = cartMapper.cart_length(user_id);
		return cart_length;
	}


}
