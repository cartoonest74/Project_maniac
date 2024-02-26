package hello.market.service.artist;

import hello.market.dto.Artist;

import java.util.List;

public interface ArtistService {
    void put_searchCount(int artist_id);
    Artist artistSelect(int id);

    List<Artist> artistSearchSelect(String artistName);

    List<Artist> artistSelectAll();

    List<Artist> artistSearchMaxShow(int limit);
}
