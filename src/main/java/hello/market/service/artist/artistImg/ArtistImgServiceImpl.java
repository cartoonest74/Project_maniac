package hello.market.service.artist.artistImg;

import hello.market.dto.Artist_img;
import hello.market.repository.mybatis.artist.artistImg.ArtistImgRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ArtistImgServiceImpl implements ArtistImgService {
    private final ArtistImgRepository artistImgRepository;

    @Override
    public List<Artist_img> artistImgSelect(int id, int limit) {
        List<Artist_img> imgList = artistImgRepository.select(id, limit);
        return imgList;
    }

    @Override
    public Integer artistImgTotal(int id) {
        Integer total = artistImgRepository.select_total(id);
        return total;
    }
}
