package hello.market.repository.mybatis.member;

import hello.market.dto.Member;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Mapper
public interface MemberMapper {
    void insert(Member member);
    void delete(@Param("id") int id);

    Member select_phone(@Param("phone") String phone);
    Member str_select(@Param("userId") String userId);
    Member int_select(@Param("id") int id);
    List<Member> selectAll();
}
