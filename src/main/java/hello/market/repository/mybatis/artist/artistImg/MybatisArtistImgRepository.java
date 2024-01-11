package hello.market.repository.mybatis.artist.artistImg;

import hello.market.dto.Artist_img;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class MybatisArtistImgRepository implements ArtistImgRepository {
    private final ArtistImgMapper artistImgMapper;

    @Override
    public List<Artist_img> select(int id, int limit) {
        List<Artist_img> imgList = artistImgMapper.select(id, limit);
        return imgList;
    }

    @Override
    public Integer select_total(int id) {
        Integer total = artistImgMapper.select_total(id);
        return total;
    }
}
