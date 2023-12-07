package hello.market.repository.mybatis.artist;

import hello.market.dto.Artist;

import java.util.List;

public interface ArtistRepository {
    Artist select(int id);

    List<Artist> search_select(String artistName);

    List<Artist> selectAll();

    List<Artist> search_count_max(int limit);
}
