package hello.market.service.shopQna;


import hello.market.dto.ShopQna;

import java.util.List;

public interface ShopQnaService {
	void addQna(ShopQna shopQna);
	Integer allQnaLength(int product_id, int user_id);
	List<ShopQna> allViewQna(int productNo, int limit);
	ShopQna findQna(int user_id, int product_id, int limit);
}
