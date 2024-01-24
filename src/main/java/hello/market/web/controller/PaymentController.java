package hello.market.web.controller;

import hello.market.dto.Portone;
import hello.market.service.order.OrderService;
import hello.market.web.session.LoginSessionManager;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/payments")
public class PaymentController {
    private final OrderService orderService;
    private final LoginSessionManager loginSessionManager;
    @ResponseBody
    @PostMapping("/complete")
    private String callback_receive(@ModelAttribute Portone portone, HttpServletRequest request) throws ParseException {
        Integer user_id = loginSessionManager.sessionUUIDcheck(request);
        String purchaseList = portone.getPurchaseList();
        JSONParser jsonParser = new JSONParser();
        Object parse = jsonParser.parse(purchaseList);
        JSONObject jsonObject = (JSONObject) parse;
        Set<String> keySet = jsonObject.keySet();
        log.info("keySet={}", keySet);
        log.info("jsonObject={}", jsonObject);
        for (String key : keySet) {
            String[] arr_cartKey = key.split("x");
            String option_part = arr_cartKey[0];
            Integer product_id = Integer.parseInt(arr_cartKey[1]);
            Integer option_index = Integer.parseInt(arr_cartKey[2]);
            Object quantity = jsonObject.get(key);
            if(option_part.contains("s")){
                log.info("option_index={}", option_index);
            }
            log.info("option_part={}", option_part);
            log.info("product_id={}", product_id);
            log.info("quantity={}", quantity);
        }
//        orderService.add_purchaseList(user_id,portone);
        return "ok";
    }
}

