# KEYSTONE - Field Service Management Platform

## 📌 Project Overview

KEYSTONE is a full-stack Field Service Management Platform designed to
streamline maintenance operations for commercial facilities.

The platform helps organizations manage customers, sites, work orders,
technicians, inventory, service requests, notifications, reports, and
field operations through a centralized role-based system.

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

-   Dashboard analytics
-   Customer management
-   Site management
-   Work Order management
-   Technician management
-   Inventory management
-   Reports dashboard
-   Notifications

## Dispatcher Module

-   Dashboard access
-   Customer management
-   Site management
-   Work Order assignment
-   Work Order tracking
-   Notifications

## Technician Module

-   Technician Dashboard
-   View assigned jobs
-   Update work order status
-   Part Usage tracking
-   Time Logs management
-   Notifications

## Customer Module

-   Customer Portal
-   Raise Service Request
-   View submitted requests
-   Track request status
-   Profile management
-   Settings management
-   Notifications

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

    keystone-field-service-management

    │
    ├── keystone-field-service-management
    │   └── Spring Boot Backend Application
    │       ├── src
    │       ├── pom.xml
    │       └── Maven Configuration Files
    │
    ├── keystone-frontend
    │   └── React Frontend Application
    │       ├── src
    │       ├── public
    │       ├── package.json
    │       └── Vite Configuration Files
    │
    ├── KeyStone_Project_User.postman_collection.json
    │   └── Complete Postman API Collection
    │
    ├── keystone_db.sql
    │   └── MySQL Database Backup File
    │
    └── README.md

------------------------------------------------------------------------

# 🗄 Database Setup & SQL Dump

The project uses MySQL database.

Database Name:

    keystone_db

A complete database backup file is included:

    keystone_db.sql

The SQL dump contains the required database structure and data used by
the KEYSTONE application.

It includes:

-   User related tables
-   Customer data
-   Site information
-   Work Order data
-   Technician records
-   Inventory and Parts data
-   Part Usage records
-   Time Logs
-   Notification data
-   Application related tables

## Import Database Using MySQL Workbench

1.  Open MySQL Workbench.
2.  Connect to MySQL Server.
3.  Open `keystone_db.sql`.
4.  Execute the SQL script.
5.  Database will be created with required tables and data.

Backend configuration file:

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

# ⚙️ Backend Setup

Navigate to backend:

    cd keystone-field-service-management

Run:

    mvn spring-boot:run

Backend URL:

    http://localhost:8080

------------------------------------------------------------------------

# 🌐 Frontend Setup

Navigate to frontend:

    cd keystone-frontend

Install dependencies:

    npm install

Run:

    npm run dev

Frontend URL:

    http://localhost:5173

------------------------------------------------------------------------

# 📡 API Documentation & Postman Collection

Complete Postman collection is included:

    KeyStone_Project_User.postman_collection.json

The collection contains API requests for:

-   Authentication API
-   User API
-   Customer API
-   Site API
-   WorkOrder API
-   Technician API
-   Inventory API
-   Part API
-   Part Usage API
-   TimeLog API
-   Status History API
-   Dashboard API
-   Analytics API
-   Report API
-   Customer Portal API
-   Notification API

## How to Test APIs Using Postman

1.  Start Spring Boot backend.
2.  Open Postman.
3.  Import:

```{=html}
<!-- -->
```
    KeyStone_Project_User.postman_collection.json

4.  Use backend URL:

```{=html}
<!-- -->
```
    http://localhost:8080

5.  Login using Auth API.
6.  Copy JWT token.
7.  Use token for protected APIs.

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

Backend:

    mvn clean package

Frontend:

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

This project demonstrates full-stack development using Spring Boot,
React.js, TypeScript, JWT Authentication, REST APIs, and MySQL database
integration.
