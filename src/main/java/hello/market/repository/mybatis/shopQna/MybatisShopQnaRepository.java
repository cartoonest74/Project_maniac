package hello.market.repository.mybatis.shopQna;

import hello.market.dto.ShopQna;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.List;

@Slf4j
@Repository
@RequiredArgsConstructor
public class MybatisShopQnaRepository implements ShopQnaRepository{
    private final ShopQnaMapper shopQnaMapper;

    @Override
    public void insert(ShopQna shopQna) {
        shopQnaMapper.insert(shopQna);
    }


    @Override
    public Integer allQnaLength(int product_id, int user_id) {
        Integer qnaLength = shopQnaMapper.selectLength(product_id, user_id);
        return qnaLength;
    }

    @Override
    public List<ShopQna> selectAll(int productNo, int limit) {
        List<ShopQna> shopQnas = shopQnaMapper.selectAll(productNo, limit);
        return shopQnas;
    }

    @Override
    public ShopQna select(int user_id, int product_id, int limit) {
        ShopQna shopQna = shopQnaMapper.select(user_id, product_id, limit);
        return shopQna;
    }
}
