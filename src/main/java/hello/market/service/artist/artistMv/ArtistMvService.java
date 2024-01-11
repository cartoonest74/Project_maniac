package hello.market.service.artist.artistMv;

import hello.market.dto.Artist;
import hello.market.dto.Artist_mv;

import java.util.List;

public interface ArtistMvService {
    Integer mvTotal(int id);

    List<Artist_mv> mvSelect(int id, int limit);
}
