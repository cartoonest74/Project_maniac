package hello.market.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.ibatis.type.Alias;

import static jakarta.persistence.GenerationType.IDENTITY;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Data
@Alias("LoginActionEntity")
@Table(name = "login_action")
public class LoginAction {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Integer id;

    @Column(name = "user_id")
    private Integer userId;

    private int login;
    private int count;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
}
