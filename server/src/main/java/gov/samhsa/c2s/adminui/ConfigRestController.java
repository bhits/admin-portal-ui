package gov.samhsa.c2s.adminui;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ConfigRestController {

    @Autowired
    private AdminUIProperties adminUIProperties;

    @RequestMapping(value = "/config", method = RequestMethod.GET)
    public AdminUIProperties getConfig() {
        return adminUIProperties;
    }
}