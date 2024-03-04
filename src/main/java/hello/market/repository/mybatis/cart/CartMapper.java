package hello.market.repository.mybatis.cart;

import hello.market.dto.Cart;
import hello.market.dto.Order;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Mapper
public interface CartMapper {
	List<Cart> select_overdueCart(@Param("user_id") int user_id, @Param("overdue_date") String overdue_date);
	Integer select_purchaseQuantity(@Param("user_id") int user_id, @Param("productNo") String productNo);
	List<Cart> quantity_check(@Param("user_id") int user_id);
	void create_cart(@Param("user_id") int user_id);

	void delete(@Param("user_id") int user_id, @Param("productNo") String productNo);

	void save(@Param("user_id") int user_id, @Param("productNo") String productNo, @Param("quantity") int quantity);

	List<Cart> select(@Param("user_id") int user_id, @Param("limit") int limit);

	Integer cart_length(@Param("user_id") int user_id);
}
