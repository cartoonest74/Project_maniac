package hello.market.service.artist.artistAlbum;

import hello.market.dto.Artist;
import hello.market.dto.Artist_album;

import java.util.List;

public interface ArtistAlbumService {
    List<Artist_album> albumSelect(int id, int limit);

    Artist_album albumSelect_one(int id, int rowNum);
    Integer albumTotal(int id);
}
