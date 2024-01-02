package hello.market.repository.mybatis.cart;

import hello.market.dto.Cart;
import org.apache.ibatis.annotations.Mapper;
import org.json.JSONObject;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface CartRepository {
	List<Cart> quantity_check(int user_id);
	List<Cart> db_select(int user_id, int limit);
	void db_save(int productNo,String option_id, int quantity);

	void db_delete(int user_id,String productNo);

	void db_create(int user_id);

	Integer cart_length(int user_id);
}
