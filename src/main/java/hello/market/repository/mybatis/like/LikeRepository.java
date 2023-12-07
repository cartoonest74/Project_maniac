package hello.market.repository.mybatis.like;



import hello.market.dto.Artist;
import hello.market.dto.Like;
import hello.market.dto.Product;

import java.util.List;

public interface LikeRepository {

    void update(int memberId, String productId, int categoryId);

    void delete(int memberId, String productId);

    List<Product> select(int memberId, int limit, int artistId);

    Integer selectLength(int memberId, int artistId);

    List<Artist> selectCategory(int memberId);

    List<Integer> selectLike(int memberId);
}
