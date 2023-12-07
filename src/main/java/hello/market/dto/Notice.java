package hello.market.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Notice {
    private int id;
    private int artistId;
    private String category;
    private String title;
    private String content;
    private String date;
}
