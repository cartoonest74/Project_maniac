package hello.market.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Board {
	private int id;
	private String writer;
	private String title;
	private String content;
	private int imgId;

}
