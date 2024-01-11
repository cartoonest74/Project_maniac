package hello.market.repository.mybatis.artist.artistMv;

import hello.market.dto.Artist_mv;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class MybatisArtistMvRepository implements ArtistMvRepository {
    private final ArtistMvMapper artistMvMapper;

    @Override
    public Integer select_total(int id) {
        Integer total = artistMvMapper.select_total(id);
        return total;
    }

    @Override
    public List<Artist_mv> select(int id, int limit) {
        List<Artist_mv> mvList = artistMvMapper.select(id, limit);
        return mvList;
    }
}
