package hello.market.repository.mybatis.member;

import hello.market.dto.Member;

import java.util.List;

public interface MemberRepository {
    void insert(Member member);
    void delete(int id);
    Member select(String str,String userId);
    Member select(int id);
    List<Member> selectAll();

    void update(Member member);
}
