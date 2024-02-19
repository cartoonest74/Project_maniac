package hello.market.service.shopReview;

import hello.market.dto.ShopReview;

import java.util.List;

public interface ShopReviewService {
	void addReview(ShopReview shopReview);
	List<ShopReview> allViewReview(int productNo, int limit);
	ShopReview findReview(int user_id, int product_id, int limit);

	Integer allReviewLength(int product_id, int user_id);
}
