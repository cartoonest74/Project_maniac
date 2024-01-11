package hello.market.repository.mybatis.artist.artistMv;

import hello.market.dto.Artist_mv;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ArtistMvMapper {
    Integer select_total(int id);

    List<Artist_mv> select(@Param("id") int id, @Param("limit") int limit);
}
