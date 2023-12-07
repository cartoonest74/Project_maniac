package hello.market.service.like;

import hello.market.dto.Artist;
import hello.market.dto.Like;
import hello.market.dto.Product;
import hello.market.repository.mybatis.like.LikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LikeServiceImpl implements LikeService {

    private final LikeRepository mybatisLikeRepository;

    @Override
    public void addLike(int memberId, String productId, int categoryId) {
        mybatisLikeRepository.update(memberId, productId, categoryId);
    }

    @Override
    public void delLike(int memberId, String productId) {
        mybatisLikeRepository.delete(memberId, productId);
    }

    @Override
    public List<Product> showAllLike(int memberId, int limit, int artistId) {
        List<Product> products = mybatisLikeRepository.select(memberId, limit, artistId);
        return products;
    }

    @Override
    public Integer likeLength(int memberId, int artistId) {
        Integer selectLength = mybatisLikeRepository.selectLength(memberId, artistId);
        return selectLength;
    }

    @Override
    public List<Artist> likeCategory(int memberId) {
        List<Artist> artists = mybatisLikeRepository.selectCategory(memberId);
        return artists;
    }

    @Override
    public List<Integer> my_likeList(int memberId) {
        List<Integer> likes = mybatisLikeRepository.selectLike(memberId);
        return likes;
    }
}
