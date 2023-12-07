package hello.market.repository.mybatis.like;

import hello.market.dto.Artist;
import hello.market.dto.Like;
import hello.market.dto.Product;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface LikeMapper {

    void update(@Param("memberId") int memberId, @Param("productId") String productId, @Param("categoryId") int categoryId);

    void delete(@Param("memberId") int memberId, @Param("productId") String productId);

    List<Product> select(@Param("memberId") int memberId, @Param("limit") int limit,@Param("artistId") int artistId);

    Integer selectLength(@Param("memberId") int memberId, @Param("artistId") int artistId);

    List<Artist> selectCategory(@Param("memberId") int memberId);

    List<Integer> selectLike(@Param("memberId") int memberId);

}
