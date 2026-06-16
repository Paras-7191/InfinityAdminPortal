\# Implementation Plan



Version: 1.0



Status: Approved



Authority:

07 - Endpoints.md



\---



\# Objective



Implement the Admin Portal strictly against verified backend contracts.



No unverified endpoints.



No inferred functionality.



No architecture changes.



No UI redesign.



\---



\# Phase 1 — Project Foundation



\## Deliverables



\* React Application Setup

\* TypeScript Configuration

\* Routing Setup

\* State Management Setup

\* API Layer Setup

\* Theme Setup

\* Environment Configuration



\## Outputs



```text

Application Shell

API Client

Auth Store

Permission Store

Theme Store

```



\## Validation



\* Project builds successfully

\* Routing operational

\* API client operational



\---



\# Phase 2 — Authentication



\## Scope



Authentication workflows.



\## Endpoints



```http

POST /auth/admin/login

POST /auth/agent/login

POST /auth/verify-otp



GET /session/validate

POST /session/heartbeat

POST /session/logout

```



\## Deliverables



\* Login Screen

\* OTP Screen

\* Session Validation

\* Session Heartbeat

\* Logout



\## Validation



\* Admin login works

\* Agent login works

\* OTP verification works

\* Session restore works

\* Logout works



\---



\# Phase 3 — Authorization Framework



\## Scope



Permission enforcement.



\## Deliverables



\* Permission Store

\* Permission Hooks

\* Route Guards

\* Action Guards

\* Navigation Guards



\## Validation



\* Unauthorized routes blocked

\* Unauthorized actions hidden

\* Permission checks operational



\---



\# Phase 4 — Application Shell



\## Scope



Core UI structure.



\## Deliverables



\* Sidebar

\* Topbar

\* Breadcrumbs

\* Theme Toggle

\* Layout System



\## Validation



\* Navigation operational

\* Responsive layout operational



\---



\# Phase 5 — Dashboard



\## Scope



Operational monitoring.



\## Endpoints



```http

GET /management/runtime-status



GET /management/otp-queue



GET /management/activation-queue



GET /management/live-activity



GET /management/system-logs

GET /management/security-logs

GET /management/runtime-logs

```



\## Deliverables



\### Runtime Status Widget



\* Runtime cards

\* Health indicators



\### OTP Queue Widget



\* Queue table

\* Auto refresh



\### Activation Queue Widget



\* Queue table

\* Auto refresh



\### Live Activity Widget



\* Activity feed

\* Auto refresh



\### Logs Overview Widgets



\* System logs

\* Security logs

\* Runtime logs



\## Validation



\* All widgets load

\* Polling operational

\* Error states operational



\---



\# Phase 6 — User Management



\## Scope



Admins and Agents.



\## Endpoints



```http

GET /management/users



POST /management/users



PUT /management/users/{user\_id}



DELETE /management/users/{user\_id}

```



\## Deliverables



\### Admin Management



\* List

\* Create

\* Update

\* Delete



\### Agent Management



\* List

\* Create

\* Update

\* Delete



\## Validation



\* CRUD operational

\* Role filtering operational



\---



\# Phase 7 — Client Management



\## Endpoints



```http

GET /management/clients



POST /management/clients



PUT /management/clients/{client\_id}



GET /management/clients/{client\_id}

```



\## Deliverables



\* Client Listing

\* Client Creation

\* Client Editing

\* Client Details



\## Validation



\* Client CRUD operational

\* Details page operational



\---



\# Phase 8 — Software Management



\## Endpoints



```http

GET /management/software



POST /management/software



PUT /management/software/{software\_id}

```



\## Deliverables



\* Software Listing

\* Software Creation

\* Software Update



\## Validation



\* Create operational

\* Update operational



\## Exclusions



```text

Delete Not Supported

Disable Not Supported

```



\---



\# Phase 9 — Assignment Management



\## Endpoints



```http

POST /management/assignments/client



DELETE /management/assignments/client



POST /management/assignments/software



DELETE /management/assignments/software

```



\## Deliverables



\### Client Assignment



\* Assign

\* Remove



\### Software Assignment



\* Assign

\* Remove



\## Validation



\* Assignment operational

\* Unassignment operational



\---



\# Phase 10 — Activation Management



\## Endpoints



```http

POST /activation/request



POST /activation/verify

```



\## Deliverables



\* Activation Wizard

\* OTP Verification Flow



\## Validation



\* Request creation works

\* Verification works



\---



\# Phase 11 — Logs Module



\## Endpoints



```http

GET /management/system-logs



GET /management/security-logs



GET /management/runtime-logs

```



\## Deliverables



\### System Logs



\* Listing

\* Search



\### Security Logs



\* Listing

\* Search



\### Runtime Logs



\* Listing

\* Search



\## Validation



\* Polling operational

\* Read-only views operational



\---



\# Phase 12 — Settings



\## Endpoints



```http

GET /management/settings



GET /management/settings/{setting\_key}



PUT /management/settings/{setting\_key}

```



\## Deliverables



\* Settings List

\* Settings Detail

\* Settings Update



\## Validation



\* View operational

\* Update operational



\---



\# Phase 13 — Agent Portal



\## Endpoints



```http

GET /agent/my-clients



GET /agent/my-software

```



\## Deliverables



\### My Clients



\* Assigned client listing



\### My Software



\* Assigned software listing



\## Validation



\* Agent access operational



\---



\# Phase 14 — Error Handling



\## Scope



Global application stability.



\## Deliverables



\### API Errors



\* 400

\* 401

\* 403

\* 404

\* 422

\* 500

\* 503



\### UI States



\* Loading

\* Empty

\* Error



\## Validation



\* Failures handled gracefully



\---



\# Phase 15 — Responsive Validation



\## Devices



\* Desktop

\* Tablet

\* Mobile



\## Validation



\* Navigation usable

\* Tables usable

\* Forms usable



\---



\# Phase 16 — Security Validation



\## Validation Items



Authentication



Authorization



Session Management



Protected Routes



Protected Actions



Token Handling



\## Success Criteria



All protected resources require authenticated access.



\---



\# Phase 17 — Final Integration Validation



\## Authentication



✅ Login



✅ OTP



✅ Logout



\---



\## Session



✅ Validation



✅ Heartbeat



\---



\## Dashboard



✅ Runtime Status



✅ OTP Queue



✅ Activation Queue



✅ Live Activity



✅ Logs



\---



\## Management



✅ Users



✅ Clients



✅ Software



\---



\## Assignments



✅ Client Assignments



✅ Software Assignments



\---



\## Activation



✅ Request



✅ Verification



\---



\## Settings



✅ View



✅ Update



\---



\## Agent Portal



✅ My Clients



✅ My Software



\---



\# Excluded Features



Not Implemented



```http

GET /management/logs/frontend



GET /management/clients/{client\_id}/hwid-history

```



Reason



```text

Not Verified

Out Of Scope

```



\---



\# Completion Criteria



The project is complete when:



\* Every verified endpoint is integrated.

\* Every permission is enforced.

\* Every dashboard widget functions.

\* All polling operates correctly.

\* All protected routes are secured.

\* No excluded endpoints are implemented.



Status



```text

IMPLEMENTATION READY

PRODUCTION READY

```



