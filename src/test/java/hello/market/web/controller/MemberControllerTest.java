package hello.market.web.controller;

import hello.market.dto.Member;
import hello.market.repository.mybatis.artist.ArtistSearchResetRepositoryImpl;
import hello.market.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;


import java.io.IOException;

import static org.assertj.core.api.Assertions.assertThat;

@Slf4j
@SpringBootTest
class MemberControllerTest {

    @Autowired
    MemberService memberService;
    @Autowired
    ArtistSearchResetRepositoryImpl artistSearchResetRepository;

    @Value("${file.dir}")
    private String fileDir;

    @Test
    void memberTest(){
        Member member = memberService.memberSelect(1);
        assertThat(member.getUserId()).isEqualTo("gdragon");
    }

    @Test
    void dateTest() throws IOException {
        Integer size = artistSearchResetRepository.get_size();
        log.info("size={}", size);
    }

}