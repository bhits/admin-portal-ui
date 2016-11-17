package gov.samhsa.c2s.adminui;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.nio.charset.StandardCharsets;

@Component
@ConfigurationProperties(prefix = "c2s.admin-ui")
@Data
public class AdminUIProperties {

    @NotNull
    @Valid
    private Branding branding;

    @NotNull
    @Valid
    private Oauth2 oauth2;

    @NotNull
    @Valid
    private SecuredApis securedApis;

    @NotNull
    @Valid
    private UnsecuredApis unsecuredApis;

    @Data
    public static class Branding {
        @NotEmpty
        private String name;

        @NotEmpty
        private String initials;

        @NotEmpty
        private String smallLogo;

        @NotEmpty
        private String mediumLogo;

        @NotEmpty
        private String largeLogo;
    }

    @Data
    public static class Oauth2 {
        @Valid
        private Client client;

        @Data
        public static class Client {
            @JsonIgnore
            @NotEmpty
            private String clientId;
            @JsonIgnore
            @NotEmpty
            private String secret;

            public byte[] getBase64BasicKey() {
                return (clientId + ":" + secret).getBytes(StandardCharsets.UTF_8);
            }
        }
    }

    @Data
    public static class SecuredApis {
        @NotEmpty
        private String phrApiBaseUrl;

        @NotEmpty
        private String registrationApiBaseUrl;

        @NotEmpty
        private String userInfo;

        @NotEmpty
        private String patientUserApiBaseUrl;

        @NotEmpty
        private String pepApiBaseUrl;
    }

    @Data
    public static class UnsecuredApis {
        @NotEmpty
        private String tokenUrl;
    }
}