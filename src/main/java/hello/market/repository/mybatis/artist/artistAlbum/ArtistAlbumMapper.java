package hello.market.repository.mybatis.artist.artistAlbum;

import hello.market.dto.Artist_album;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ArtistAlbumMapper {

    List<Artist_album> select(@Param("id") int id, @Param("limit") int limit);

    Integer select_total(int id);
}
