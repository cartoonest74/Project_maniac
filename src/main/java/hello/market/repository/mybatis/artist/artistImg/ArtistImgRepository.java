package hello.market.repository.mybatis.artist.artistImg;

import hello.market.dto.Artist_img;

import java.util.List;

public interface ArtistImgRepository {
    List<Artist_img> select(int id, int limit);

    Integer select_total(int id);
}
