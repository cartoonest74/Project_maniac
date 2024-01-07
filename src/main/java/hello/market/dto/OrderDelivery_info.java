package hello.market.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class OrderDelivery_info {
    private int basicMain;
    private int deliveryIndex;
    private String Firstname;
    private String Lastname;
    private String mainAddr;
    private String detailAddr;
    private String postNum;
    private String Tel;
}
