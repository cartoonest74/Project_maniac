package hello.market.service.artist.artistSns;

import hello.market.dto.Artist_sns;

import java.util.List;

public interface ArtistSnsService {
    List<Artist_sns> snsSelect(int id);
}
