package hello.market.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Img {
	
	private int id;
	private String name;
	private	String url;
	private String size;

}
