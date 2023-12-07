package hello.market.repository.mybatis.login;

import hello.market.dto.LoginCheck;
import hello.market.dto.Member;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

@Mapper
public interface LoginMapper {
    Member inspect(@Param("userId") String userId, @Param("pwd") String pwd);

    Optional<LoginCheck> select(@Param("uuid") String uuid);

    void insert(@Param("userNo") int userNo, @Param("uuid") String uuid);

    void delete(@Param("userNo") int userNo);
}
