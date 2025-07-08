# Quality Attribute Scenarios

This document captures the key ISO/IEC 25010 sub-characteristics selected with our customer and defines concrete scenario tests for each.

## Functional Suitability

### Functional Correctness

**Importance:** Ensures calculated results (e.g., quiz scores, report data) are accurate and reliable, maintaining customer trust.

#### Scenario: Validate computation logic

* **Source:** API or module where computation occurs
* **Stimulus:** Input a known dataset with expected outcomes
* **Environment:** Controlled test environment with seeded data
* **Artifact:** Calculation routine or service
* **Response:** Returned results match expected values exactly
* **Response Measure:** Assertion that actual == expected

**Execution Steps:**

1. Prepare test inputs and expected outputs.
2. Invoke computation endpoint or function.
3. Compare returned result to expected.

## Performance Efficiency

### Time Behaviour

**Importance:** Users demand fast responses; slow API or UI leads to poor adoption.

#### Scenario: Measure response latency

* **Source:** Key API endpoint or page render
* **Stimulus:** Standard request under typical load
* **Environment:** Production-like dataset and hardware
* **Artifact:** Request handling component
* **Response:** Response time within target threshold (e.g., ≤ 200 ms)
* **Response Measure:** Percentile latency metrics

**Execution Steps:**

1. Simulate requests using a load-testing tool.
2. Record response times.
3. Verify metrics meet SLA.

### Resource Utilization

**Importance:** Controls infrastructure costs and avoids resource exhaustion during peak usage.

#### Scenario: Monitor CPU and memory under load

* **Source:** System monitoring
* **Stimulus:** Sustained load test
* **Environment:** Limited resource environment
* **Artifact:** Application process
* **Response:** CPU and memory usage stay below set thresholds
* **Response Measure:** Average CPU < 80%, memory < 70% of capacity

**Execution Steps:**

1. Run load test.
2. Collect monitoring metrics.
3. Assert usage metrics within limits.

## Usability

### Operability

**Importance:** Enables non-technical users (e.g., admins) to perform routine tasks without developer support.

#### Scenario: Execute administrative action

* **Source:** Admin UI or command interface
* **Stimulus:** Trigger of a management operation (e.g., resend notification)
* **Environment:** User with admin privileges
* **Artifact:** UI action handler or CLI command
* **Response:** Operation completes successfully with confirmation
* **Response Measure:** Status code or UI feedback correctness

**Execution Steps:**

1. Log in as admin.
2. Perform the admin action.
3. Verify success message and resulting state.

