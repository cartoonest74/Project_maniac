package hello.market.service.like;

import hello.market.dto.Artist;
import hello.market.dto.Like;
import hello.market.dto.Product;

import java.util.List;

public interface LikeService {
    void addLike(int memberId, String productId, int categoryId);

    void delLike(int memberId, String productId);

    List<Product> showAllLike(int memberId, int limit, int artistId);

    Integer likeLength(int memberId, int artistId);

    List<Artist> likeCategory(int memberId);

    List<Integer> my_likeList(int memberId);
}
