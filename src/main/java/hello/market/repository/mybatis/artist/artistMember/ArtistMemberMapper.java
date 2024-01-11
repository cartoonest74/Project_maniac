package hello.market.repository.mybatis.artist.artistMember;

import hello.market.dto.Artist_member;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ArtistMemberMapper {
    List<Artist_member> select(int id);
}
