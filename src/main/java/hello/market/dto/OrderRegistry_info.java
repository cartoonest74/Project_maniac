package hello.market.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderRegistry_info {
    private String Firstname;
    private String Lastname;
    private String Email;
    private String Tel;
}
