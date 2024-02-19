package hello.market.repository.mybatis.shopReview;

import hello.market.dto.ShopReview;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class MybatisShopReviewRepository implements ShopReviewRepository {
    private final ShopReviewMapper shopReviewMapper;

    @Override
    public void insert(ShopReview shopReview) {
        shopReviewMapper.insert(shopReview);
    }

    @Override
    public List<ShopReview> selectAll(int productNo, int limit) {
        List<ShopReview> shopReviews = shopReviewMapper.selectAll(productNo, limit);
        return shopReviews;
    }

    @Override
    public ShopReview select(int user_id, int product_id, int limit) {
        ShopReview shopReview = shopReviewMapper.select(user_id, product_id, limit);
        return shopReview;
    }

    @Override
    public Integer selectLength(int product_id, int user_id) {
        Integer reviewLength = shopReviewMapper.selectLength(product_id, user_id);
        return reviewLength;
    }

}
