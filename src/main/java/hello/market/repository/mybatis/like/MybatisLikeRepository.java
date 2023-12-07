package hello.market.repository.mybatis.like;

import hello.market.dto.Artist;
import hello.market.dto.Like;
import hello.market.dto.Product;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.List;

@Slf4j
@Repository
@RequiredArgsConstructor
public class MybatisLikeRepository implements  LikeRepository{

    private final LikeMapper likeMapper;

    @Override
    public void update(int memberId, String productId, int categoryId) {
        likeMapper.update(memberId, productId, categoryId);
    }

    @Override
    public void delete(int memberId, String productId) {
        likeMapper.delete(memberId, productId);
    }

    @Override
    public List<Product> select(int memberId, int limit, int artistId) {
        List<Product> products = likeMapper.select(memberId, limit, artistId);
        return products;
    }

    @Override
    public Integer selectLength(int memberId, int artistId) {
        Integer selectLength = likeMapper.selectLength(memberId, artistId);
        return selectLength;
    }

    @Override
    public List<Artist> selectCategory(int memberId) {
        List<Artist> artists = likeMapper.selectCategory(memberId);
        return artists;
    }

    @Override
    public List<Integer> selectLike(int memberId) {
        List<Integer> likes = likeMapper.selectLike(memberId);
        return likes;
    }
}
