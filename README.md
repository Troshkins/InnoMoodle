# InnoMoodle

![logo](frontend/assets/logo.png)

Moodle but he's stronger, he's smarter.

[Deployed Product](http://193.148.59.45:8080/)

![Demo Video](docs/demos/demo2.mov)

## About

### Project Description:

InnoMoodle is a learning management system designed to replace the university’s current educational portal. Leveraging modern UX/UI principles and responsive design, InnoMoodle will deliver a clean, intuitive interface that streamlines course creation, management, and delivery. By focusing on the needs of both instructors and students, the platform aims to foster engagement, improve usability, and reduce administrative overhead.

### Project Objectives:

1. Seamless Migration: Safely migrate existing courses, user accounts, and content from the legacy system to InnoMoodle with minimal downtime.
2. Enhanced User Experience
3. Instructor-Centric Tools
4. Improved Engagement
5. Accessibility & Compliance
6. Scalability & Security
7. Integration & Extensibility
## Project context diagram
![Diagram](https://github.com/Troshkins/InnoMoodle/blob/main/docs/ProjContextDiagram.pdf)
## Roadmap
[Roadmap](https://docs.google.com/spreadsheets/d/1S57L4N_ecyXp19cwjlobZJZQs6WOP7KI8R7cf5FZ6OM/edit?gid=1707224305#gid=1707224305)

## Usage

### Environment Requirements

* Go >= 1.24.4
* Docker & Docker Compose >= 1.29
* PostgreSQL (if running locally) >= 15

### Installation Steps

1. Clone the repository (for all commands from here use bash):

   git clone https://github.com/Troshkins/InnoMoodle.git
   cd InnoMoodle

2. Configure environment variables: copy .env.example to .env and fill in:

   dotenv
   DB_USER=myapp_user
   DB_PASSWORD=secret123
   DB_NAME=myapp_db
   DB_HOST=db
   DB_PORT=5432
   SERVER_PORT=8080

3. Initialize the database using (if not using Docker Compose init):

   psql -U myapp_user -d myapp_db -f db/init/init.sql


### Running the Application

* With Docker Compose:

  docker-compose up --build


  * The API will be available at http://localhost:8080/api/health
  * The frontend is served at http://localhost:8080/

* Locally (without Docker):

  1. Start PostgreSQL and create the database and user as above.
  2. In backend/, install dependencies:

     cd backend
     go mod download

  3. Run the Go server:

     go run main.go

  4. Serve static files by opening index.html in a browser or using a simple HTTP server:

     npx serve static/


### Access Credentials

* No authentication is required for the sample GET /api/hello endpoint.
* For protected routes, use:

  Username: admin@example.com
  Password: password123


## Architecture

See ![Architecture](docs/architecture/architecture.md)

## Development

![Contributing](docs/CONTRIBUTING.md)

## Quality Assurance

### Quality Attribute Scenarios

See [Quality Attribute Scenarios](docs/quality-assurance/quality-attribute-scenarios.md)

### Automated Tests

See ![Automated Tests](docs/quality-assurance/automated-tests.md)

### User Acceptance Tests

See [User Acceptance Tests](docs/quality-assurance/user-acceptance-tests.md)

## Build and Deployment

### Continuous Integration

See ![Continious Integration](docs/automation/continious-integration.md)

## Licence

![Licence](docs/LICENCE.md)

## Design "for customer"
The project will continue to be done, so a developed design section is needed to avoid re-work.

![Design in Figma](docs/Innomoodle.fig)
