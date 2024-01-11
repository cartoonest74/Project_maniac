package hello.market.service.artist.artistSns;

import hello.market.dto.Artist_sns;
import hello.market.repository.mybatis.artist.artistSns.ArtistSnsRepository;
import hello.market.repository.mybatis.artist.artistSns.MybatisArtistSnsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ArtistSnsServiceImpl implements ArtistSnsService {

    private final ArtistSnsRepository artistSnsRepository;
    @Override
    public List<Artist_sns> snsSelect(int id) {
        List<Artist_sns> snsList = artistSnsRepository.select(id);
        return snsList;
    }
}
