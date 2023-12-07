package hello.market.repository.mybatis.auth;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Data
@Repository
@NoArgsConstructor
public class AuthRepository {
    private Map<String, String> authStore = new ConcurrentHashMap<>();

    public void add(String type, String authNum){
        authStore.put(type, authNum);
    }

    public String getAuthCode(String type){
        String authNum = authStore.get(type);
        return authNum;
    }

    public void clear(){
        authStore.clear();
    }
}
