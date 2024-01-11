package hello.market.repository.mybatis.artist.artistImg;

import hello.market.dto.Artist_img;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ArtistImgMapper {
    List<Artist_img> select(@Param("id") int id, @Param("limit") int limit);

    Integer select_total(int id);
}
