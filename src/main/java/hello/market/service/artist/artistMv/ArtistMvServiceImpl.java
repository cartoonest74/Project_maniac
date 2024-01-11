package hello.market.service.artist.artistMv;

import hello.market.dto.Artist;
import hello.market.dto.Artist_mv;
import hello.market.repository.mybatis.artist.ArtistRepository;
import hello.market.repository.mybatis.artist.artistMv.ArtistMvRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ArtistMvServiceImpl implements ArtistMvService {

    private final ArtistMvRepository artistMvRepository;

    @Override
    public Integer mvTotal(int id) {
        Integer total = artistMvRepository.select_total(id);
        return total;
    }

    @Override
    public List<Artist_mv> mvSelect(int id, int limit) {
        List<Artist_mv> mvList = artistMvRepository.select(id, limit);
        return mvList;
    }
}
