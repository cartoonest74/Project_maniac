package hello.market.repository.mybatis.artist.artistMember;

import hello.market.dto.Artist_member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class MybatisArtistMemberRepository implements ArtistMemberRepository {
    private final ArtistMemberMapper artistMemberMapper;

    @Override
    public List<Artist_member> select(int id) {
        List<Artist_member> memberList = artistMemberMapper.select(id);
        return memberList;
    }
}
