package hello.market.repository.mybatis.artist.artistSns;

import hello.market.dto.Artist_sns;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ArtistSnsMapper {
    List<Artist_sns> select(int id);
}
