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
public class Order {
    private int productNo;
    private String title;
    private String singleMultiple;
    private String price;
    private String mainImg;
    private String optionTitle;
    private String orderKey;
    private int quantity;
    private int restQuantity;
}
