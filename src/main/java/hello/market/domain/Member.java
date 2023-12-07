package hello.market.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.ibatis.type.Alias;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.FetchType.LAZY;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Data
@Alias("MemberEntity")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="member_id")
    private Integer id;

    @Column(name = "user_id", length = 31)
    private String userId;

    @Column(length = 120)
    private String name;

    @Column(length = 31)
    private String pwd;

    @Column(length = 12)
    private String birth;

    @Column(length = 7)
    private String gender;

    @Column(length = 500)
    private String addr;

    @Column(length = 15)
    private String phone;

    private Timestamp date;

    @OneToMany(mappedBy = "member", fetch = LAZY)
    private List<Product> productList = new ArrayList<>();

    @OneToMany(mappedBy = "member", fetch = LAZY)
    private List<Board> boardList = new ArrayList<>();

    @OneToMany(mappedBy = "member", fetch = LAZY)
    private List<Cart> cartList = new ArrayList<>();

    @OneToMany(mappedBy = "member", fetch = LAZY)
    private List<ShopReview> shopReviewList = new ArrayList<>();

    @OneToMany(mappedBy = "member", fetch = LAZY)
    private List<ShopQna> shopQnaList = new ArrayList<>();

    @OneToMany(mappedBy = "member", fetch = LAZY)
    private List<LoginAction> loginActionList = new ArrayList<>();

}
