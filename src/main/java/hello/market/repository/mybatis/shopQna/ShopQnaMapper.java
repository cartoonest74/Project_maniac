package hello.market.repository.mybatis.shopQna;

import hello.market.dto.ShopQna;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Mapper
public interface ShopQnaMapper {
    void insert(ShopQna shopQna);

    void delete(@Param("id") int id);

    Integer selectLength(@Param("product_id") int product_id, @Param("user_id") int user_id);

    List<ShopQna> selectAll(@Param("productNo") int productNo, @Param("limit") int limit);

    ShopQna select(@Param("user_id") int user_id, @Param("product_id") int product_id, @Param("limit") int limit);

    void update(ShopQna shopQna);
}
