package hello.market.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.json.JSONObject;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Portone {
    private String txId;
    private String paymentId;
    private String purchaseList;
    private String amount;
}
