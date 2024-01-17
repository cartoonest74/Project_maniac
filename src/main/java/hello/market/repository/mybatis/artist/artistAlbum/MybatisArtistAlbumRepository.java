package hello.market.repository.mybatis.artist.artistAlbum;

import hello.market.dto.Artist_album;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class MybatisArtistAlbumRepository implements  ArtistAlbumRepository {
    private final ArtistAlbumMapper artistAlbumMapper;

    @Override
    public List<Artist_album> select(int id, int limit) {
        List<Artist_album> albumList = artistAlbumMapper.select(id, limit);
        return albumList;
    }

    @Override
    public Artist_album select_one(int id, int rowNum) {
        Artist_album artistAlbum = artistAlbumMapper.select_one(id, rowNum);
        return artistAlbum;
    }

    @Override
    public Integer select_total(int id) {
        Integer total = artistAlbumMapper.select_total(id);
        return total;
    }
}
