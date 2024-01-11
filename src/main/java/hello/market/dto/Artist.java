package hello.market.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Blob;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Artist {
    private int id;
    private String name;
    private String korean_name;
    private String debut;

    private String mainImg;
}
