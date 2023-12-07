package hello.market.web.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Slf4j
@Controller
public class BasicController {

	@GetMapping("/about")
	private String moveAbout(){
		return "/about/about";
	}
}
