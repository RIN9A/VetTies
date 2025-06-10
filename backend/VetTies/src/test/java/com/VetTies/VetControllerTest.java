package com.VetTies;

import com.VetTies.service.JwtService;
import com.VetTies.service.VetService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class VetControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private VetService vetService;

    @Autowired
    private JwtService jwtService; // или JwtUtil

    @Test
    void getAllVets_shouldReturnOk_whenAuthorized() throws Exception {
        UserDetails userDetails = new User("admin@clinic.com", "admin12", Collections.emptyList());
        String token = jwtService.generateToken(userDetails);


        mockMvc.perform(get("/vets")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
               .andExpect(status().isOk());
    }
    @Test
    void getAllVets_shouldReturnUnauthorized_whenNoToken() throws Exception {
        mockMvc.perform(get("/vets"))
                .andExpect(status().is4xxClientError());
    }
}
