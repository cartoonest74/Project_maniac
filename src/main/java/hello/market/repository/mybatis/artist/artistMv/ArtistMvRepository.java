package hello.market.repository.mybatis.artist.artistMv;

import hello.market.dto.Artist_mv;

import java.util.List;

public interface ArtistMvRepository {
    Integer select_total(int id);

    List<Artist_mv> select(int id, int limit);

}
