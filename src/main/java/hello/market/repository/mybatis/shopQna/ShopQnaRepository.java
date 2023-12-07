package hello.market.repository.mybatis.shopQna;

import hello.market.dto.ShopQna;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ShopQnaRepository {
    void insert(ShopQna shopQna);

    void delete(int id);

    Integer allQnaLength(int product_id,int user_id);

    List<ShopQna> selectAll(int productNo, int limit);

    ShopQna select(int user_id, int product_id, int limit);

    void update(ShopQna shopQna);
}
