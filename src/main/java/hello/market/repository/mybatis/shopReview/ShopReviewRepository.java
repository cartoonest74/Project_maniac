package hello.market.repository.mybatis.shopReview;

import hello.market.dto.ShopReview;

import java.util.List;

public interface ShopReviewRepository {
    void insert(ShopReview shopReview);

    void delete(int id);

    List<ShopReview> selectAll(int ProductNo, int limit);

    ShopReview select(int user_id, int product_id, int limit);

    Integer selectLength(int product_id, int user_id);

    void update(ShopReview shopReview);
}
