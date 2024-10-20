PropertyPro

PropertyPro is a web-based property management system designed to streamline tenant management, lease tracking, and maintenance requests. This application is built using Spring Boot on the backend and React on the frontend.

Features

	•	Tenant Dashboard: Tenants can view lease details, submit maintenance requests, and make rent payments.
	•	Admin Dashboard: Property managers can manage tenants, leases, and properties from one place.
	•	Session-Based Authentication: Secure login system for tenants and admins using session-based authentication.
	•	Maintenance Requests: Tenants can submit issues, and admins can track and resolve requests.
	•	Property Listings: Displays available properties, with links for more details.

Tech Stack

	•	Backend: Java, Spring Boot, MySQL, Hibernate
	•	Frontend: React, Bootstrap, Axios
	•	Build Tools: Gradle
	•	Authentication: Session-based authentication (Spring Security)

Setup Instructions

Prerequisites

	•	Java 17
	•	MySQL
	•	Node.js & npm
	•	Git

Backend Setup

	1. Clone the repository:

    - git clone https://github.com/htrillo95/PropertyPro.git
    cd PropertyPro/PP-Api

  2. Update the application.properties with your MySQL credentials:

    - spring.datasource.url=jdbc:mysql://localhost:3306/propertypro_db
    spring.datasource.username=your_username
    spring.datasource.password=your_password

  3. Run the backend:
  	   
    - ./gradlew bootRun

Frontend Setup

	1.	Navigate to the pp-ui folder:

    - cd ../pp-ui

  2.	Install dependencies:

    - npm install

  3.	Run the frontend:

    - npm start

How to Use

	•	For Tenants: Register/login via the Tenant Portal to view lease information and submit requests.
	•	For Admins: Login to the Admin Dashboard to manage tenants, properties, and view maintenance requests.

Contributing?

Feel free to fork this project and submit pull requests. Suggestions and improvements are always welcome!

  	   
 
