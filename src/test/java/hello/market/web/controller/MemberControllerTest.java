package hello.market.web.controller;

import hello.market.dto.Member;
import hello.market.service.member.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;


import java.io.File;
import java.io.IOException;
import java.net.URLDecoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@Slf4j
@SpringBootTest
class MemberControllerTest {

    @Autowired
    MemberService memberService;

    @Value("${file.dir}")
    private String fileDir;

    @Test
    void memberTest(){
        Member member = memberService.memberSelect(1);
        assertThat(member.getUserId()).isEqualTo("gdragon");
    }

    @Test
    void dateTest() throws IOException {
        LocalDateTime localDateTime = LocalDateTime.now();
        LocalDateTime before_3month = localDateTime.minusMonths(3);
        long current_timeMills = Timestamp.valueOf(before_3month).getTime();
        String decode = URLDecoder.decode("e64792f5-3cb6-43f1-9e0d-763579bd1a88.jpg", "UTF-8");
        File file = new File(fileDir + "/shopimg/review/adsadsad.jpg");
        file.delete();
    }

}