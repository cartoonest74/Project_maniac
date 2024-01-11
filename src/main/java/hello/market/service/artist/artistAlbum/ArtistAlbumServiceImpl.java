package hello.market.service.artist.artistAlbum;

import hello.market.dto.Artist;
import hello.market.dto.Artist_album;
import hello.market.repository.mybatis.artist.ArtistRepository;
import hello.market.repository.mybatis.artist.artistAlbum.ArtistAlbumRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ArtistAlbumServiceImpl implements ArtistAlbumService {

    private final ArtistAlbumRepository artistAlbumRepository;
    @Override
    public List<Artist_album> albumSelect(int id, int limit) {
        List<Artist_album> albumList = artistAlbumRepository.select(id, limit);
        return albumList;
    }

    @Override
    public Integer albumTotal(int id) {
        Integer total = artistAlbumRepository.select_total(id);
        return total;
    }
}
