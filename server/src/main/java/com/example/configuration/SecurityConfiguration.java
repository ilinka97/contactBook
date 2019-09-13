package com.example.configuration;

import javax.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;

import com.example.filter.AuthenticationFilter;
import com.example.filter.AuthorizationFilter;
import com.example.service.CustomUserDetailsService;

import lombok.RequiredArgsConstructor;

@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	private final CustomUserDetailsService userDetailsService;
	private final TokenProperties tokenProperties;

	@Bean
	public PasswordEncoder encoder() {
		return new BCryptPasswordEncoder();
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(encoder());
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			.cors()
		.and()
			.csrf().disable()
			.sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		.and()
			.exceptionHandling()
				.authenticationEntryPoint(unauthorizedResponse())
		.and()
            .logout()
            	.logoutUrl("/api/logout")
            	.logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler())
        .and()
            .addFilter(new AuthenticationFilter(authenticationManagerBean(), tokenProperties))
            .addFilterAfter(new AuthorizationFilter(tokenProperties), UsernamePasswordAuthenticationFilter.class)
			.authorizeRequests()
				.antMatchers(HttpMethod.POST, tokenProperties.getLoginPath()).permitAll()
				.antMatchers(HttpMethod.POST, "/api/users/register").permitAll()
				.antMatchers(HttpMethod.GET, "/api/users/username").permitAll()
				.antMatchers("/api/**").authenticated()
				.anyRequest().permitAll();
	}
	private AuthenticationEntryPoint unauthorizedResponse() {
		return (req, rsp, e) -> rsp.sendError(HttpServletResponse.SC_UNAUTHORIZED);
	}
}
