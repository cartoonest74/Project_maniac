package hello.market.repository.mybatis.artist.artistAlbum;

import hello.market.dto.Artist_album;

import java.util.List;

public interface ArtistAlbumRepository {
    List<Artist_album> select(int id, int limit);

    Artist_album select_one(int id, int rowNum);
    Integer select_total(int id);
}
