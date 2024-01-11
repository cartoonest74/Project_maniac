package hello.market.service.artist.artistMember;

import hello.market.dto.Artist_member;
import hello.market.repository.mybatis.artist.artistMember.ArtistMemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ArtistMemberServiceImpl implements ArtistMemberService {

    private final ArtistMemberRepository memberRepository;

    @Override
    public List<Artist_member> memberSelect(int id) {
        List<Artist_member> memberList = memberRepository.select(id);
        return memberList;
    }
}
