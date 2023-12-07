package hello.market.repository.mybatis.artist;

import hello.market.dto.Artist;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Mapper
public interface ArtistMapper {
    Artist select(@Param("id") int id);
    List<Artist> search_select(@Param("artistName") String artistName);
    List<Artist> selectAll();
    List<Artist> search_count_max(@Param("limit") int limit);
}
