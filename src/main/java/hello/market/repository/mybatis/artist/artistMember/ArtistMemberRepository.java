package hello.market.repository.mybatis.artist.artistMember;

import hello.market.dto.Artist_member;

import java.util.List;

public interface ArtistMemberRepository {
    List<Artist_member> select(int id);
}
