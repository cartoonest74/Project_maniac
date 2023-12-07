package hello.market.repository.mybatis.member;

import hello.market.dto.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.List;

@Slf4j
@Repository
@RequiredArgsConstructor
public class MybaitsMemberRepository implements MemberRepository {

    private final MemberMapper memberMapper;


    @Override
    public void insert(Member member) {
        memberMapper.insert(member);
    }

    @Override
    public void delete(int id) {
        memberMapper.delete(id);
    }

    @Override
    public Member select(String str,String userId) {
        Member member = memberMapper.str_select(userId);
        return member;
    }

    @Override
    public Member select(int id) {
        Member member = memberMapper.int_select(id);
        return member;
    }

    @Override
    public List<Member> selectAll() {
        List<Member> members = memberMapper.selectAll();
        return members;
    }

    @Override
    public void update(Member member) {
        memberMapper.update(member);
    }
}
