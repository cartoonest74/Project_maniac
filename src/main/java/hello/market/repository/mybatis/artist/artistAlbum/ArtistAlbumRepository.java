package hello.market.repository.mybatis.artist.artistAlbum;

import hello.market.dto.Artist_album;

import java.util.List;

public interface ArtistAlbumRepository {
    List<Artist_album> select(int id, int limit);

    Integer select_total(int id);
}
