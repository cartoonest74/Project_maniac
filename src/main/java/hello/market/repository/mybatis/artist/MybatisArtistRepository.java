package hello.market.repository.mybatis.artist;

import hello.market.dto.Artist;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.List;

@Slf4j
@Repository
@RequiredArgsConstructor
public class MybatisArtistRepository implements ArtistRepository {

    private final ArtistMapper artistMapper;

    @Override
    public void update_resetSearchCount() {
        artistMapper.update_resetSearchCount();
    }

    @Override
    public void update_searchCount(int artist_id) {
        artistMapper.update_searchCount(artist_id);
    }

    @Override
    public Artist select(int id) {
        Artist artist = artistMapper.select(id);
        return artist;
    }

    @Override
    public List<Artist> search_select(String artistName) {
        List<Artist> artists = artistMapper.search_select(artistName);
        return artists;
    }

    @Override
    public List<Artist> selectAll() {
        List<Artist> artists = artistMapper.selectAll();
        return artists;
    }

    @Override
    public List<Artist> search_count_max(int limit) {
        List<Artist> artists = artistMapper.search_count_max(limit);
        return artists;
    }
}
