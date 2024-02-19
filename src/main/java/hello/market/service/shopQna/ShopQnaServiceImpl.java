package hello.market.service.shopQna;

import hello.market.dto.ShopQna;
import hello.market.repository.mybatis.shopQna.ShopQnaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ShopQnaServiceImpl implements ShopQnaService {

	private final ShopQnaRepository mybatisShopQnaRepository;

	@Override
	public void addQna(ShopQna shopQna) {
		mybatisShopQnaRepository.insert(shopQna);
	}

	@Override
	public Integer allQnaLength(int product_id, int user_id) {
		Integer allQnaLength = mybatisShopQnaRepository.allQnaLength(product_id,user_id);
		return allQnaLength;
	}

	@Override
	public List<ShopQna> allViewQna(int productNo, int limit) {
		List<ShopQna> shopQnaList = mybatisShopQnaRepository.selectAll(productNo, limit);
		return shopQnaList;
	}

	@Override
	public ShopQna findQna(int user_id, int product_id, int limit) {
		ShopQna shopQna = mybatisShopQnaRepository.select(user_id, product_id, limit);
		return shopQna;
	}

}
