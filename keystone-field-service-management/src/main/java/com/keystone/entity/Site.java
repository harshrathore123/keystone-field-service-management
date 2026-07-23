package com.keystone.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "sites")
@Data
public class Site {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String siteName;

    private String address;

    private String city;

    private String state;

    private String postalCode;

    private Boolean active;

	public Site(Long id, String siteName, String address, String city, String state, String postalCode,
			Boolean active) {
		super();
		this.id = id;
		this.siteName = siteName;
		this.address = address;
		this.city = city;
		this.state = state;
		this.postalCode = postalCode;
		this.active = active;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSiteName() {
		return siteName;
	}

	public void setSiteName(String siteName) {
		this.siteName = siteName;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getPostalCode() {
		return postalCode;
	}

	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public Site() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "Site [id=" + id + ", siteName=" + siteName + ", address=" + address + ", city=" + city + ", state="
				+ state + ", postalCode=" + postalCode + ", active=" + active + "]";
	}
    
    
}