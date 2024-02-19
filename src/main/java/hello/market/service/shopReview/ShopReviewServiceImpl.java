package hello.market.service.shopReview;

import hello.market.dto.ShopReview;
import hello.market.repository.mybatis.shopReview.ShopReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ShopReviewServiceImpl implements ShopReviewService {

	private final ShopReviewRepository mybatisShopReviewRepository;

	@Override
	public void addReview(ShopReview shopReview) {
		mybatisShopReviewRepository.insert(shopReview);
	}

	@Override
	public List<ShopReview> allViewReview(int productNo, int limit) {
		List<ShopReview> shopReviewList = mybatisShopReviewRepository.selectAll(productNo, limit);
		return shopReviewList;
	}

	@Override
	public ShopReview findReview(int user_id, int product_id, int limit) {
		ShopReview shopReview = mybatisShopReviewRepository.select(user_id, product_id, limit);
		return shopReview;
	}

	@Override
	public Integer allReviewLength(int product_id, int user_id) {
		Integer reviewLength = mybatisShopReviewRepository.selectLength(product_id, user_id);
		return reviewLength;
	}

}
