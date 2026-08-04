# KEYSTONE - Field Service Management Platform

## 📌 Project Overview

KEYSTONE is a full-stack Field Service Management Platform designed to
streamline maintenance operations for commercial facilities.

The platform helps organizations manage customers, sites, work orders,
technicians, inventory, service requests, notifications, and field
operations through a centralized role-based system.

------------------------------------------------------------------------

# 🚀 Features

## 🔐 Authentication & Authorization

-   JWT based authentication
-   Secure login system
-   Role Based Access Control (RBAC)
-   Protected routes
-   Token based security

Supported Roles: - Manager - Dispatcher - Technician - Customer

------------------------------------------------------------------------

# 👥 User Modules

## Manager Module

Features: - Dashboard analytics - Customer management - Site
management - Work Order management - Technician management - Inventory
management - Reports dashboard - Notifications

------------------------------------------------------------------------

## Dispatcher Module

Features: - Dashboard access - Customer management - Site management -
Work Order assignment - Work Order tracking - Notifications

------------------------------------------------------------------------

## Technician Module

Features: - Technician Dashboard - View assigned jobs - Update work
order status - Part Usage tracking - Time Logs management -
Notifications

------------------------------------------------------------------------

## Customer Module

Features: - Customer Portal - Raise Service Request - View submitted
requests - Track request status - Profile management - Settings
management - Notifications

------------------------------------------------------------------------

# 🛠 Technology Stack

## Backend

-   Java 17
-   Spring Boot
-   Spring Security
-   JWT Authentication
-   Spring Data JPA
-   Hibernate
-   MySQL
-   Maven

## Frontend

-   React.js
-   TypeScript
-   Material UI (MUI)
-   Axios
-   React Router

## Tools

-   Eclipse / IntelliJ IDEA
-   Visual Studio Code
-   Postman
-   MySQL Workbench
-   Git & GitHub

------------------------------------------------------------------------

# 📂 Project Structure

    KEYSTONE-field-service-management

    │
    ├── keystone-field-service-management
    │   ├── src
    │   ├── pom.xml
    │   ├── mvnw
    │   └── Spring Boot Backend
    │
    ├── keystone-frontend
    │   ├── src
    │   ├── public
    │   ├── package.json
    │   └── React Frontend
    │
    └── README.md

------------------------------------------------------------------------

# ⚙️ Backend Setup

## Database Configuration

Create MySQL database:

``` sql
CREATE DATABASE keystone_db;
```

Update database configuration in:

    src/main/resources/application.properties

Example:

``` properties
spring.datasource.url=jdbc:mysql://localhost:3306/keystone_db?serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

Replace `your_password` with your local MySQL password.

------------------------------------------------------------------------

## Run Backend

Navigate to backend folder:

``` bash
cd keystone-field-service-management
```

Run:

``` bash
mvn spring-boot:run
```

Backend URL:

    http://localhost:8080

------------------------------------------------------------------------

# 🌐 Frontend Setup

Navigate to frontend folder:

``` bash
cd keystone-frontend
```

Install dependencies:

``` bash
npm install
```

Run application:

``` bash
npm run dev
```

Frontend URL:

    http://localhost:5173

------------------------------------------------------------------------

# 📡 API Modules

Implemented REST APIs:

-   Authentication API
-   User Management API
-   Customer API
-   Site API
-   Work Order API
-   Technician API
-   Inventory API
-   Part Usage API
-   Time Logs API
-   Notification API
-   Customer Portal API
-   Reports API

------------------------------------------------------------------------

# 🧪 API Testing

Postman collection is available for API testing.

Covered modules:

-   Authentication APIs
-   Customer APIs
-   Site APIs
-   Work Order APIs
-   Technician APIs
-   Inventory APIs
-   Notification APIs
-   Customer Portal APIs

------------------------------------------------------------------------

# 📊 Project Status

✅ Authentication Completed\
✅ Role Based Access Control Completed\
✅ Dashboard Completed\
✅ Customer Module Completed\
✅ Site Module Completed\
✅ Work Order Module Completed\
✅ Technician Module Completed\
✅ Inventory Module Completed\
✅ Part Usage Module Completed\
✅ Time Logs Module Completed\
✅ Notification Module Completed\
✅ Customer Portal Completed\
✅ Profile Management Completed\
✅ Settings Management Completed\
✅ Reports Dashboard Completed

------------------------------------------------------------------------

# 🏗 Build Information

Backend Build:

    mvn clean package

Frontend Build:

    npm run build

------------------------------------------------------------------------

# 👨‍💻 Developer

**Harsh Rathore**

Java Full Stack Developer Intern

Project:

**KEYSTONE - Field Service Management Platform**

------------------------------------------------------------------------

# 📌 Internship Project

Developed as part of Java Full Stack Development Internship.

This project demonstrates full-stack application development using
Spring Boot, React, TypeScript, JWT Authentication, REST APIs, and MySQL
database integration.
