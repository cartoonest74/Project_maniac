package hello.market.repository.mybatis.artist;

import org.springframework.stereotype.Repository;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class ArtistSearchResetRepository implements ArtistSearchResetRepositoryImpl {
    private final Map<String, Integer> resetCheck_map = new ConcurrentHashMap<>();

    @Override
    public boolean contain_dateKey(String dateKey) {
        boolean containsKey = resetCheck_map.containsKey(dateKey);
        return containsKey;
    }

    @Override
    public Integer get_size() {
        int size = resetCheck_map.size();
        return size;
    }

    @Override
    public void save_dateKey(String dateKey) {
        resetCheck_map.put(dateKey, 1);
    }

    @Override
    public void clear_dateKey() {
        resetCheck_map.clear();
    }
}
