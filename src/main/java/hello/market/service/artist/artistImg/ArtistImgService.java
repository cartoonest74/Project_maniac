package hello.market.service.artist.artistImg;

import hello.market.dto.Artist_img;

import java.util.List;

public interface ArtistImgService {
    List<Artist_img> artistImgSelect(int id, int limit);

    Integer artistImgTotal(int id);
}
