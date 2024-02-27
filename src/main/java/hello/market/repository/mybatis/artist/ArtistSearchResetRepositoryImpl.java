package hello.market.repository.mybatis.artist;

public interface ArtistSearchResetRepositoryImpl {
    boolean contain_dateKey(String dateKey);

    Integer get_size();

    void save_dateKey(String dateKey);

    void clear_dateKey();
}
