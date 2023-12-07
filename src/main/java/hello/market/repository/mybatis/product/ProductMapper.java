package hello.market.repository.mybatis.product;

import hello.market.dto.Product;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Mapper
public interface ProductMapper {
    void insert(Product product);
    void update(Product product);
    void delete(@Param("id") int id);
    List<Product> select_all(@Param("artistId") int artistId, @Param("category") String category, @Param("page_limit") int page_limit);
    Product select(@Param("id") int id);
    Integer selectLength(@Param("artistId") int artistId, @Param("category") String category);
}

