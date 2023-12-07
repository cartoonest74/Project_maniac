package hello.market.service.product;


import hello.market.dto.Product;

import java.util.List;

public interface ProductService {
	void productAdd(Product product);
	void productUpdate(Product product);
	void productDelete(int id);
	List<Product> findProducts(int artistId, String categoryName, int page_limit);
	Product findProduct(int id);

	Integer lengthProduct(int artistId, String category);
}
