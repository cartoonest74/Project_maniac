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

	private Map<Integer, Integer> cartMap = new ConcurrentHashMap<>();
	private int cartMapCount;

	@Override
	public List<Cart> db_select(int user_id) {
		List<Cart> cartList = cartMapper.select(user_id);
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

	@Override
	public void save(int productNo, int quantity) {cartMap.put(productNo, quantity);
	}

	@Override
	public void remove(int key) {
		cartMap.remove(key);
	}

	@Override
	public Map<Integer, Integer> all() {
		return cartMap;
	}

	@Override
	public int show_length() {
		cartMapCount = cartMap.size();
		return cartMapCount;
	}

	@Override
	public void clear() {
		cartMap.clear();
	}
}
