package hello.market.repository.mybatis.artist.artistSns;

import hello.market.dto.Artist_sns;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class MybatisArtistSnsRepository implements ArtistSnsRepository {

    private final ArtistSnsMapper artistSnsMapper;

    @Override
    public List<Artist_sns> select(int id) {
        List<Artist_sns> snsList = artistSnsMapper.select(id);
        return snsList;
    }
}
