package hello.market.service.artist;

import hello.market.dto.Artist;
import hello.market.repository.mybatis.artist.ArtistRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ArtistServiceImpl implements ArtistService{

    private final ArtistRepository mybatisArtistRepository;

    @Override
    public Artist artistSelect(int id) {
        Artist artist = mybatisArtistRepository.select(id);
        return artist;
    }

    @Override
    public List<Artist> artistSearchSelect(String artistName) {
        List<Artist> artists = mybatisArtistRepository.search_select(artistName);
        return artists;
    }

    @Override
    public List<Artist> artistSelectAll() {
        List<Artist> artists = mybatisArtistRepository.selectAll();
        return artists;
    }

    @Override
    public List<Artist> artistSearchMaxShow(int limit) {
        List<Artist> artists = mybatisArtistRepository.search_count_max(limit);
        return artists;
    }
}
