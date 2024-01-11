package hello.market.service.artist.artistMember;

import hello.market.dto.Artist_member;

import java.util.List;

public interface ArtistMemberService {
    List<Artist_member> memberSelect(int id);
}
