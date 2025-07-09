The architecture documentation resides in docs/architecture/ with the following structure:


docs/architecture/
├── static-view/
│   └── component-diagram.png
├── dynamic-view/
│   └── sequence-diagram.png
└── deployment-view/
    └── deployment-diagram.png


### Static View

![Component Diagram](docs/architecture/static-view/component-diagram.png)

* Key Components:

  * API Server (Go): REST endpoints, business logic
  * Database Module: db package, handles connections
  * Repository Layer: repository package, abstracts data operations
  * Frontend: static HTML/CSS/JS served by Go server
* Coupling & Cohesion:

  * Low coupling between server and persistence via repository interface
  * High cohesion within each package
* Maintainability:

  * Modular structure enables independent enhancements
  * Clear separation of concerns

### Dynamic View

![Sequence Diagram](docs/architecture/dynamic-view/sequence-diagram.png)

This diagram illustrates a typical request to GET /api/hello:

1. Client sends HTTP request to Go server
2. Router (mux) dispatches to handler
3. Handler uses repository to construct response
4. Server sends JSON response back to client

* Runtime Performance: average response time \~150 ms in production

### Deployment View

![Deployment Diagram](docs/architecture/deployment-view/deployment-diagram.png)

* Infrastructure:

  * Docker Compose orchestrates two containers: app and db
  * Volume db_data persists PostgreSQL data
  * CI/CD uses GitHub Actions
* Scalability & Resilience:

  * Scale app container horizontally behind a load balancer
  * Database backup and replication strategies can be introduced

