\# Technical Requirements Document (TRD)



Version: 1.0



Status: Approved



Authority:

07 - Endpoints.md



\---



\# 1. Technical Overview



The Admin Portal is a React-based web application that integrates directly with the verified WinLicense Backend API.



The frontend operates as a permission-driven administrative system.



All business functionality must be implemented exclusively through verified backend contracts.



No frontend-generated business logic is permitted.



\---



\# 2. Architecture



\## Architecture Style



```text

Client Application

&#x20;       │

&#x20;       ▼

React Application

&#x20;       │

&#x20;       ▼

API Layer

&#x20;       │

&#x20;       ▼

WinLicense Backend

```



\---



\## Architectural Principles



\* Backend-driven authority

\* Stateless frontend

\* Token-based authentication

\* Permission-driven rendering

\* Route protection

\* Polling-based monitoring



\---



\# 3. Frontend Stack



\## Core



```text

React

TypeScript

Vite

```



\---



\## Routing



```text

React Router

```



\---



\## State Management



```text

Zustand

```



\---



\## API Layer



```text

Axios

```



\---



\## Forms



```text

React Hook Form

Zod

```



\---



\## Styling



```text

TailwindCSS

```



\---



\## Tables



```text

TanStack Table

```



\---



\# 4. Folder Structure



```text

src/



├── app/

│

├── routes/

│

├── pages/

│   ├── auth/

│   ├── dashboard/

│   ├── admins/

│   ├── agents/

│   ├── clients/

│   ├── software/

│   ├── assignments/

│   ├── logs/

│   └── settings/

│

├── components/

│

├── layouts/

│

├── services/

│

├── stores/

│

├── hooks/

│

├── types/

│

├── constants/

│

├── utils/

│

└── theme/

```



\---



\# 5. Routing Structure



\## Public Routes



```text

/login

/verify-otp

```



\---



\## Protected Routes



```text

/dashboard



/admins

/agents



/clients

/clients/:clientId



/software



/assignments



/logs/system

/logs/security

/logs/runtime



/settings

```



\---



\# 6. Route Protection



\## Authentication Check



Required:



```http

GET /session/validate

```



Validation occurs:



\* Initial load

\* Refresh

\* Route restoration



\---



\## Unauthorized Handling



If validation fails:



```text

Clear Session

Redirect Login

```



\---



\# 7. State Management



\## Auth Store



Responsibilities



\* Token

\* User

\* Permissions

\* Session State



\---



\## Dashboard Store



Responsibilities



\* Runtime Status

\* OTP Queue

\* Activation Queue

\* Live Activity



\---



\## User Store



Responsibilities



\* Admin Data

\* Agent Data



\---



\## Client Store



Responsibilities



\* Client Data



\---



\## Software Store



Responsibilities



\* Software Data



\---



\## Assignment Store



Responsibilities



\* Assignment Operations



\---



\## Logs Store



Responsibilities



\* System Logs

\* Security Logs

\* Runtime Logs



\---



\## Settings Store



Responsibilities



\* Settings Data



\---



\# 8. API Layer



\## API Client



Single Axios instance.



Responsibilities



\* Authorization header

\* Request interception

\* Response interception

\* Error normalization



\---



\## Authorization Header



```http

Authorization: Bearer <token>

```



Required for all protected endpoints.



\---



\# 9. Session Handling



\## Validation



Endpoint



```http

GET /session/validate

```



Purpose



\* Restore session

\* Protect routes



\---



\## Heartbeat



Endpoint



```http

POST /session/heartbeat

```



Interval



```text

60 seconds

```



Purpose



\* Keep session active



\---



\## Logout



Endpoint



```http

POST /session/logout

```



Purpose



\* Terminate session



\---



\## Force Logout



Endpoint



```http

POST /session/force-logout/{user\_id}

```



Purpose



\* Administrative session termination



\---



\# 10. Permission System



Backend is authority.



Frontend only consumes permissions.



\---



\## Permission Usage



Controls:



\* Navigation visibility

\* Route access

\* Action buttons

\* Form submission

\* Administrative actions



\---



\## Route Security



Routes must never rely solely on UI hiding.



All permission checks must occur before route rendering.



\---



\# 11. Polling Architecture



\## Runtime Status



Endpoint



```http

GET /management/runtime-status

```



Interval



```text

15 seconds

```



\---



\## OTP Queue



Endpoint



```http

GET /management/otp-queue

```



Interval



```text

5 seconds

```



\---



\## Activation Queue



Endpoint



```http

GET /management/activation-queue

```



Interval



```text

5 seconds

```



\---



\## Live Activity



Endpoint



```http

GET /management/live-activity

```



Interval



```text

10 seconds

```



\---



\## System Logs



Endpoint



```http

GET /management/system-logs

```



Interval



```text

10 seconds

```



\---



\## Security Logs



Endpoint



```http

GET /management/security-logs

```



Interval



```text

10 seconds

```



\---



\## Runtime Logs



Endpoint



```http

GET /management/runtime-logs

```



Interval



```text

10 seconds

```



\---



\# 12. Error Handling



\## 400



Show validation error.



\---



\## 401



Clear session.



Redirect login.



\---



\## 403



Permission denied state.



\---



\## 404



Resource not found state.



\---



\## 422



Display field validation errors.



\---



\## 500



Display generic server error.



\---



\## 503



Display service unavailable notification.



\---



\# 13. Loading States



Required For



\* Tables

\* Forms

\* Dashboard Widgets

\* Polling Components



\---



\# 14. Empty States



Required For



\* User Lists

\* Client Lists

\* Software Lists

\* Queues

\* Logs



\---



\# 15. Security Requirements



\## Authentication



Bearer token required.



\---



\## Storage



No sensitive business data persisted outside approved stores.



\---



\## Session Protection



Protected routes require validation.



\---



\## Permission Enforcement



UI and route-level enforcement required.



\---



\## API Security



All protected requests include:



```http

Authorization: Bearer <token>

```



\---



\# 16. Performance Requirements



Dashboard polling must not block UI.



Large tables must support:



\* Search

\* Filtering

\* Pagination



\---



\# 17. Logging Requirements



Frontend must log:



\* API failures

\* Route failures

\* Unexpected exceptions



No frontend log viewer is currently in scope.



\---



\# 18. Out Of Scope



Excluded



```http

GET /management/logs/frontend



GET /management/clients/{client\_id}/hwid-history

```



Status



```text

NOT VERIFIED

NOT IMPLEMENTED

```



\---



\# 19. Technical Acceptance Criteria



Authentication operational.



Session management operational.



Permission enforcement operational.



All verified endpoints integrated.



Polling operational.



Protected routing operational.



Error handling operational.



Status



```text

IMPLEMENTATION READY

```



