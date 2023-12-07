package hello.market.repository.mybatis.product;

import hello.market.dto.Product;

import java.util.List;

public interface ProductRepository {
    void insert(Product product);
    void update(Product product);
    void delete(int id);
    List<Product> select_all(int artist_id, String category, int page_limit);
    Product select(int id);

    Integer selectLength(int artist_id, String category);
}
