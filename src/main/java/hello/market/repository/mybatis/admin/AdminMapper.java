package hello.market.repository.mybatis.admin;

import hello.market.dto.Admin;
import hello.market.dto.LoginCheck;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Optional;

@Mapper
public interface AdminMapper {
    Optional<LoginCheck> select_adminLoginCheck(String uuid);
    void update_startLogin(@Param("adminId") int adminId, @Param("uuid") String uuid);
    void update_endLogin(@Param("adminId") int adminId);

    void insert_qna(@Param("qnaId") int qnaId,@Param("content") String content,@Param("adminId") int adminId);
    Admin select_inspectAdminInfo(@Param("Admin") Admin admin);

    Admin select_adminInfo(int adminId);
}
