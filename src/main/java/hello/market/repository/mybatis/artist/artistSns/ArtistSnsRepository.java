package hello.market.repository.mybatis.artist.artistSns;

import hello.market.dto.Artist_sns;

import java.util.List;

public interface ArtistSnsRepository {
    List<Artist_sns> select(int id);
}
