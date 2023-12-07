package hello.market.repository.mybatis.product;

import hello.market.dto.Product;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.List;

@Slf4j
@Repository
@RequiredArgsConstructor
public class MybatisProductRepository implements ProductRepository{

    private final ProductMapper productMapper;

    @Override
    public void insert(Product product) {

    }

    @Override
    public void update(Product product) {

    }

    @Override
    public void delete(int id) {

    }

    @Override
    public List<Product> select_all(int artistId, String category, int page_limit) {
        List<Product> products = productMapper.select_all(artistId, category, page_limit);
        log.info("products === {}" ,products);
        return products;
    }

    @Override
    public Product select(int id) {
        Product product = productMapper.select(id);
        log.info("product = {}", product);
        return product;
    }

    @Override
    public Integer selectLength(int artistId, String category) {
        Integer productLength = productMapper.selectLength(artistId, category);
        return productLength;
    }
}
