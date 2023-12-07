package hello.market.service.product;

import hello.market.dto.Product;
import hello.market.repository.mybatis.product.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

	private List<Product> products = new ArrayList<>();
	private Map<String, String> productStatus = new HashMap<>();
	private final ProductRepository mybatisProductRepository;

	@Override
	public void productAdd(Product product) {

	}

	@Override
	public void productUpdate(Product product) {

	}

	@Override
	public void productDelete(int id) {

	}

	@Override
	public List<Product> findProducts(int artistId, String categoryName, int page_limit) {
		List<Product> products = mybatisProductRepository.select_all(artistId, categoryName, page_limit);
		return products;
	}

	@Override
	public Product findProduct(int id) {
		Product product = mybatisProductRepository.select(id);
		return product;
	}

	@Override
	public Integer lengthProduct(int artistId, String category) {
		Integer productLength = mybatisProductRepository.selectLength(artistId, category);
		return productLength;
	}
}
