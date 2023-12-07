package hello.market.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Member {
	private int id;
	private String userId;
	private String name;
	private String birth;
	private String gender;
	private String addr;
	private String phone;
	private String pwd;
	private String email;
	private int grade;
}
