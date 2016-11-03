package gov.samhsa.c2s.adminui;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;

@Component
@ConfigurationProperties(prefix = "c2s.admin-ui")
@Data
public class AdminUIProperties {

    private Oauth2 oauth2;
    private SecuredApis securedApis;
    private UnsecuredApis unsecuredApis;

    @Data
    public static class Oauth2 {
        private Client client;

        @Data
        public static class Client {
            @JsonIgnore
            private String clientId;
            @JsonIgnore
            private String secret;

            public byte[] getBase64BasicKey() {
                return (clientId + ":" + secret).getBytes(StandardCharsets.UTF_8);
            }
        }
    }

    @Data
    public static class SecuredApis {
        private String phrApiBaseUrl;
        private String registrationApiBaseUrl;
        private String userInfo;
        private String patientUserApiBaseUrl;
        private String pepApiBaseUrl;
    }

    @Data
    public static class UnsecuredApis {
        private String tokenUrl;
    }
}
