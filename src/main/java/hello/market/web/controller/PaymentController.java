package hello.market.web.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import hello.market.dto.Portone;
import hello.market.service.order.OrderService;
import hello.market.web.session.LoginSessionManager;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Iterator;
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
    private String callback_receive(@ModelAttribute Portone portone, HttpServletRequest request) throws JsonProcessingException {
        Integer user_id = loginSessionManager.sessionUUIDcheck(request);
        String purchaseList = portone.getPurchaseList();
        ObjectMapper mapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,false);
        JSONObject jsonObject = mapper.readValue(purchaseList, JSONObject.class);
        Set<String> keySet = jsonObject.keySet();
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
        orderService.add_purchaseList(user_id,portone);
        return "ok";
    }
}

