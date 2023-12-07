package hello.market.repository.mybatis.shopReview;

import hello.market.dto.ShopReview;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Mapper
public interface ShopReviewMapper {
    void insert(ShopReview shopReview);

    void delete(@Param("id") int id);

    List<ShopReview> selectAll(@Param("productNo") int ProductNo,@Param("limit") int limit);

    Integer selectLength(@Param("product_id") int product_id, @Param("user_id") int user_id);

    ShopReview select(@Param("user_id") int user_id, @Param("product_id") int product_id, @Param("limit") int limit);

    void update(ShopReview shopReview);
}
