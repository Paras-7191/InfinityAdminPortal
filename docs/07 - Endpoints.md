\# 07 - Endpoints.md



Version: 1.0



Status: Implementation Authority



\## Document Authority



This document is the single source of truth for the Admin Portal implementation.



All frontend implementation, backend integration, routing, permissions, polling, UI behavior, and acceptance validation must reference this document.



Authority Order:



1\. Endpoints.md (this document)

2\. Verified OpenAPI Contract

3\. Admin Backend Contract

4\. Backend Integration Mapping

5\. Admin UI Data Mapping

6\. TRD

7\. PRD



Conflict Resolution Rule:



If any document conflicts with this document, this document takes precedence.



Excluded Endpoints:



\* GET /management/logs/frontend

\* GET /management/clients/{client\_id}/hwid-history



These endpoints are not verified and must not be implemented.



\## Verification Status



\### Verified



Authentication:



\* POST /auth/admin/login

\* POST /auth/agent/login

\* POST /auth/verify-otp



Session:



\* GET /session/validate

\* POST /session/heartbeat

\* POST /session/logout

\* POST /session/force-logout/{user\_id}



Management:



\* GET /management/users



\* POST /management/users



\* PUT /management/users/{user\_id}



\* DELETE /management/users/{user\_id}



\* GET /management/clients



\* POST /management/clients



\* PUT /management/clients/{client\_id}



\* GET /management/clients/{client\_id}



\* GET /management/software



\* POST /management/software



\* PUT /management/software/{software\_id}



Assignments:



\* POST /management/assignments/client

\* DELETE /management/assignments/client

\* POST /management/assignments/software

\* DELETE /management/assignments/software



Dashboard:



\* GET /management/runtime-status

\* GET /management/otp-queue

\* GET /management/activation-queue

\* GET /management/live-activity



Logs:



\* GET /management/system-logs

\* GET /management/security-logs

\* GET /management/runtime-logs



Settings:



\* GET /management/settings

\* GET /management/settings/{setting\_key}

\* PUT /management/settings/{setting\_key}



Activation:



\* POST /activation/request

\* POST /activation/verify



Agent Portal:



\* GET /agent/my-clients

\* GET /agent/my-software



## Permission Catalog



\### Runtime Permissions



| Permission        | Description                  |

| ----------------- | ---------------------------- |

| RUNTIME\_VIEW      | View runtime monitoring data |

| RUNTIME\_LOGS\_VIEW | View runtime logs            |



\### User Permissions



| Permission   | Description          |

| ------------ | -------------------- |

| USER\_VIEW    | View users           |

| USER\_CREATE  | Create users         |

| USER\_UPDATE  | Update users         |

| USER\_DISABLE | Disable/Delete users |



\### Client Permissions



| Permission    | Description    |

| ------------- | -------------- |

| CLIENT\_VIEW   | View clients   |

| CLIENT\_CREATE | Create clients |

| CLIENT\_UPDATE | Update clients |



\### Software Permissions



| Permission      | Description     |

| --------------- | --------------- |

| SOFTWARE\_VIEW   | View software   |

| SOFTWARE\_CREATE | Create software |

| SOFTWARE\_UPDATE | Update software |



\### Assignment Permissions



| Permission      | Description               |

| --------------- | ------------------------- |

| ASSIGN\_CLIENTS  | Assign clients to agents  |

| ASSIGN\_SOFTWARE | Assign software to agents |



\### Log Permissions



| Permission         | Description        |

| ------------------ | ------------------ |

| SYSTEM\_LOGS\_VIEW   | View system logs   |

| SECURITY\_LOGS\_VIEW | View security logs |

| RUNTIME\_LOGS\_VIEW  | View runtime logs  |



\### Settings Permissions



| Permission      | Description     |

| --------------- | --------------- |

| SETTINGS\_VIEW   | View settings   |

| SETTINGS\_UPDATE | Update settings |



\### Activation Permissions



| Permission        | Description                |

| ----------------- | -------------------------- |

| ACTIVATION\_CREATE | Create activation requests |

| ACTIVATION\_VERIFY | Verify activation requests |



\### Role Access



\#### SUPER\_ADMIN



Access:



\* All permissions



\#### ADMIN



Access:



\* Permission-driven

\* Determined by backend session and permission payload



\#### AGENT



Access:



\* Agent Portal endpoints only

\* Assigned client access

\* Assigned software access

\* Activation workflows





\## Authentication Contract



\### POST /auth/admin/login



Purpose:

Initiate Admin authentication.



Authentication:

None



Request Schema



```json

{

\&#x20; "admin\\\_id": "string",

\&#x20; "password": "string"

}

```



Request Fields



| Field    | Type   | Required |

| -------- | ------ | -------- |

| admin\_id | string | Yes      |

| password | string | Yes      |



Success Result



\* OTP generated

\* OTP workflow initiated

\* User proceeds to OTP verification



Frontend Rules



\* Validate required fields

\* Disable submit while request is pending

\* Display backend error messages



\---



\### POST /auth/agent/login



Purpose:

Initiate Agent authentication.



Authentication:

None



Request Schema



```json

{

\&#x20; "mobile\\\_number": "string"

}

```



Request Fields



| Field         | Type   | Required |

| ------------- | ------ | -------- |

| mobile\_number | string | Yes      |



Success Result



\* OTP generated

\* OTP workflow initiated



Frontend Rules



\* Validate mobile number

\* Disable submit while request is pending



\---



\### POST /auth/verify-otp



Purpose:

Complete authentication.



Authentication:

None



Request Schema



```json

{

\&#x20; "user\\\_id": "string",

\&#x20; "otp": "string"

}

```



Request Fields



| Field   | Type   | Required |

| ------- | ------ | -------- |

| user\_id | string | Yes      |

| otp     | string | Yes      |



Success Result



\* Authenticated session created

\* Access token returned

\* Permissions returned

\* User redirected to dashboard



Frontend Rules



\* OTP field required

\* Prevent duplicate submissions

\* Store session token securely

\* Load permission matrix immediately after login





\## Session Contract



\### GET /session/validate



Purpose:

Validate active session.



Authentication:

Bearer Token Required



Headers



```http

Authorization: Bearer <token>

```



Success Result



\* Session valid

\* User information returned

\* Permission information returned



Frontend Usage



\* App bootstrap

\* Route protection

\* Session recovery after refresh



Failure Handling



\* Clear local session

\* Redirect to login



\---



\### POST /session/heartbeat



Purpose:

Keep session active.



Authentication:

Bearer Token Required



Headers



```http

Authorization: Bearer <token>

```



Success Result



\* Session expiry extended



Frontend Usage



\* Background heartbeat



Polling



```text

Every 60 seconds

```



Failure Handling



\* Retry once

\* Logout on repeated failure



\---



\### POST /session/logout



Purpose:

Terminate current session.



Authentication:

Bearer Token Required



Headers



```http

Authorization: Bearer <token>

```



Success Result



\* Session terminated



Frontend Usage



\* Logout button

\* Session expiration flow



Frontend Rules



\* Clear token

\* Clear stores

\* Redirect to login



\---



\### POST /session/force-logout/{user\_id}



Purpose:

Terminate target user's session.



Authentication:

Bearer Token Required



Path Parameters



| Field   | Type   | Required |

| ------- | ------ | -------- |

| user\_id | string | Yes      |



Frontend Usage



\* Admin security controls

\* User management actions



Required Permission



```text

USER\\\_UPDATE

```





\## User Management Contract



Base Endpoint



```http

/management/users

```



Authentication:

Bearer Token Required



\---



\### GET /management/users



Purpose:

Retrieve users.



Required Permission



```text

USER\\\_VIEW

```



Frontend Usage



\* Admin Management

\* Agent Management



Frontend Filtering



Admin Screen



```text

role = ADMIN

role = SUPER\\\_ADMIN

```



Agent Screen



```text

role = AGENT

```



Frontend Features



\* Search

\* Filter

\* Pagination

\* Status display



\---



\### POST /management/users



Purpose:

Create user.



Required Permission



```text

USER\\\_CREATE

```



Request Schema



```json

{

\&#x20; "full\\\_name": "string",

\&#x20; "role": "string",

\&#x20; "admin\\\_id": "string | null",

\&#x20; "mobile\\\_number": "string | null",

\&#x20; "password": "string | null"

}

```



Required Fields



| Field     | Required |

| --------- | -------- |

| full\_name | Yes      |

| role      | Yes      |



Frontend Rules



ADMIN / SUPER\_ADMIN



```text

Require:

\\- admin\\\_id

\\- password

```



AGENT



```text

Require:

\\- mobile\\\_number

```



\---



\### PUT /management/users/{user\_id}



Purpose:

Update user.



Required Permission



```text

USER\\\_UPDATE

```



Path Parameters



| Field   | Type   |

| ------- | ------ |

| user\_id | string |



Request Schema



```json

{

\&#x20; "full\\\_name": "string | null",

\&#x20; "status": "string | null"

}

```



Frontend Editable Fields



\* Full Name

\* Status



\---



\### DELETE /management/users/{user\_id}



Purpose:

Disable/Delete user.



Required Permission



```text

USER\\\_DISABLE

```



Path Parameters



| Field   | Type   |

| ------- | ------ |

| user\_id | string |



Frontend Rules



\* Confirmation required

\* Refresh user list after success



\---



\### Admin Management Screen Mapping



Endpoints



```http

GET    /management/users

POST   /management/users

PUT    /management/users/{user\\\_id}

DELETE /management/users/{user\\\_id}

```



Role Filter



```text

ADMIN

SUPER\\\_ADMIN

```



\---



\### Agent Management Screen Mapping



Endpoints



```http

GET    /management/users

POST   /management/users

PUT    /management/users/{user\\\_id}

DELETE /management/users/{user\\\_id}

```



Role Filter



```text

AGENT

```





\## Client Management Contract



Base Endpoint



```http

/management/clients

```



Authentication:

Bearer Token Required



\---



\### GET /management/clients



Purpose:

Retrieve clients.



Required Permission



```text

CLIENT\_VIEW

```



Frontend Usage



\* Client listing page

\* Client search

\* Client filters

\* Client selection for assignments

\* Client selection for activations



Frontend Features



\* Search

\* Status Filter

\* Pagination

\* Sort



\---



\### POST /management/clients



Purpose:

Create client.



Required Permission



```text

CLIENT\_CREATE

```



Request Schema



```json

{

&#x20; "client\_name": "string",

&#x20; "hwid": "string",

&#x20; "notes": "string | null"

}

```



Required Fields



| Field       | Required |

| ----------- | -------- |

| client\_name | Yes      |

| hwid        | Yes      |



Frontend Rules



\* HWID required

\* HWID must be unique

\* Notes optional



Success Actions



\* Refresh client list

\* Close modal

\* Show success notification



\---



\### PUT /management/clients/{client\_id}



Purpose:

Update client.



Required Permission



```text

CLIENT\_UPDATE

```



Path Parameters



| Field     | Type   |

| --------- | ------ |

| client\_id | string |



Request Schema



```json

{

&#x20; "client\_name": "string | null",

&#x20; "status": "string | null",

&#x20; "notes": "string | null"

}

```



Editable Fields



\* Client Name

\* Status

\* Notes



Frontend Rules



\* Preserve immutable identifiers

\* Refresh details after update



\---



\### GET /management/clients/{client\_id}



Purpose:

Retrieve client details.



Required Permission



```text

CLIENT\_VIEW

```



Path Parameters



| Field     | Type   |

| --------- | ------ |

| client\_id | string |



Frontend Usage



\* Client details page

\* Assignment workflows

\* Activation workflows



\---



\### Client Management Screen Mapping



Endpoints



```http

GET /management/clients

POST /management/clients

PUT /management/clients/{client\_id}

GET /management/clients/{client\_id}

```



Permissions



```text

CLIENT\_VIEW

CLIENT\_CREATE

CLIENT\_UPDATE

```





\## Software Management Contract



Base Endpoint



```http

/management/software

```



Authentication:

Bearer Token Required



\---



\### GET /management/software



Purpose:

Retrieve software inventory.



Required Permission



```text

SOFTWARE\_VIEW

```



Frontend Usage



\* Software listing

\* Assignment workflows

\* Activation workflows



Frontend Features



\* Search

\* Status Filter

\* Pagination



\---



\### POST /management/software



Purpose:

Create software.



Required Permission



```text

SOFTWARE\_CREATE

```



Request Schema



```json

{

&#x20; "software\_name": "string",

&#x20; "status": "ACTIVE"

}

```



Required Fields



| Field         | Required |

| ------------- | -------- |

| software\_name | Yes      |



Frontend Rules



\* Software name required

\* Default status ACTIVE



Success Actions



\* Refresh software list

\* Close modal



\---



\### PUT /management/software/{software\_id}



Purpose:

Update software.



Required Permission



```text

SOFTWARE\_UPDATE

```



Path Parameters



| Field       | Type   |

| ----------- | ------ |

| software\_id | string |



Request Schema



```json

{

&#x20; "status": "string"

}

```



Editable Fields



\* Status



Frontend Rules



\* Software name not editable through verified contract

\* Refresh software list after update



\---



\### Software Management Screen Mapping



Endpoints



```http

GET /management/software

POST /management/software

PUT /management/software/{software\_id}

```



Permissions



```text

SOFTWARE\_VIEW

SOFTWARE\_CREATE

SOFTWARE\_UPDATE

```



Notes



```text

No verified delete endpoint.

No verified disable endpoint.

Must not implement delete actions.

```





\## Assignment Management Contract



Authentication:

Bearer Token Required



\---



\### POST /management/assignments/client



Purpose:

Assign client to agent.



Required Permission



```text

ASSIGN\_CLIENTS

```



Request Schema



```json

{

&#x20; "agent\_id": "string",

&#x20; "target\_id": "string"

}

```



Field Mapping



| Field     | Description                |

| --------- | -------------------------- |

| agent\_id  | Agent receiving assignment |

| target\_id | Client ID                  |



Frontend Usage



\* Client assignment modal

\* Agent details page



Success Actions



\* Refresh assignments

\* Refresh agent details



\---



\### DELETE /management/assignments/client



Purpose:

Remove client assignment.



Required Permission



```text

ASSIGN\_CLIENTS

```



Request Schema



```json

{

&#x20; "agent\_id": "string",

&#x20; "target\_id": "string"

}

```



Frontend Rules



\* Confirmation required

\* Refresh assignment state after success



\---



\### POST /management/assignments/software



Purpose:

Assign software to agent.



Required Permission



```text

ASSIGN\_SOFTWARE

```



Request Schema



```json

{

&#x20; "agent\_id": "string",

&#x20; "target\_id": "string"

}

```



Field Mapping



| Field     | Description                |

| --------- | -------------------------- |

| agent\_id  | Agent receiving assignment |

| target\_id | Software ID                |



Frontend Usage



\* Software assignment modal

\* Agent details page



\---



\### DELETE /management/assignments/software



Purpose:

Remove software assignment.



Required Permission



```text

ASSIGN\_SOFTWARE

```



Request Schema



```json

{

&#x20; "agent\_id": "string",

&#x20; "target\_id": "string"

}

```



Frontend Rules



\* Confirmation required

\* Refresh assignment state after success



\---



\### Assignment Screen Mapping



Endpoints



```http

POST   /management/assignments/client

DELETE /management/assignments/client



POST   /management/assignments/software

DELETE /management/assignments/software

```



Permissions



```text

ASSIGN\_CLIENTS

ASSIGN\_SOFTWARE

```





\## Runtime Monitoring Contract



\### GET /management/runtime-status



Purpose:

Runtime health monitoring.



Authentication:

Bearer Token Required



Required Permission



```text

RUNTIME\_VIEW

```



Polling



```text

15 Seconds

```



Verified Response Structure



```json

\[

&#x20; {

&#x20;   "id": "string",

&#x20;   "runtime\_name": "string",

&#x20;   "status": "ONLINE",

&#x20;   "last\_heartbeat\_at": "datetime",

&#x20;   "cpu\_usage": 0,

&#x20;   "memory\_usage": 0,

&#x20;   "updated\_at": "datetime"

&#x20; }

]

```



Frontend Fields



| Field             | Usage              |

| ----------------- | ------------------ |

| runtime\_name      | Runtime Card Title |

| status            | Status Badge       |

| last\_heartbeat\_at | Last Seen          |

| cpu\_usage         | CPU Widget         |

| memory\_usage      | Memory Widget      |

| updated\_at        | Update Timestamp   |



Dashboard Usage



\* Runtime Overview

\* Health Monitoring

\* Service Status Cards



Status Values



```text

ONLINE

OFFLINE

DEGRADED

UNKNOWN

```





\## OTP Queue Contract



\### GET /management/otp-queue



Purpose:

Display OTP workflow history and active OTP records.



Authentication:

Bearer Token Required



Query Parameters



| Parameter | Type    | Default |

| --------- | ------- | ------- |

| limit     | integer | 100     |



Required Permission



```text

SECURITY\_LOGS\_VIEW

```



Polling



```text

5 Seconds

```



Verified Response Structure



```json

\[

&#x20; {

&#x20;   "id": "string",

&#x20;   "user\_id": "string",

&#x20;   "otp\_type": "LOGIN | ACTIVATION",

&#x20;   "hashed\_otp": "string",

&#x20;   "status": "USED | EXPIRED | INVALIDATED",

&#x20;   "expires\_at": "datetime",

&#x20;   "used\_at": "datetime | null",

&#x20;   "requested\_at": "datetime",

&#x20;   "requested\_ip": "string | null"

&#x20; }

]

```



Frontend Columns



| Column       |

| ------------ |

| OTP Type     |

| User ID      |

| Status       |

| Requested At |

| Expires At   |

| Used At      |

| Requested IP |



Frontend Rules



\* Read Only

\* No edit actions

\* No delete actions



Dashboard Usage



\* OTP Queue Widget

\* Security Monitoring

\* Authentication Monitoring



Status Values



```text

USED

EXPIRED

INVALIDATED

```





\## Activation Queue Contract



\### GET /management/activation-queue



Purpose:

Display activation workflow history and pending activation requests.



Authentication:

Bearer Token Required



Query Parameters



| Parameter | Type    | Default |

| --------- | ------- | ------- |

| limit     | integer | 100     |



Required Permission



```text

ACTIVATION\_CREATE

```



Polling



```text

5 Seconds

```



Frontend Usage



\* Dashboard Activation Queue Widget

\* Activation Monitoring Screen

\* Operational Monitoring



Frontend Columns



| Column       |

| ------------ |

| Request ID   |

| Client       |

| Software     |

| Status       |

| Requested At |

| Completed At |



Frontend Rules



\* Read Only

\* No edit actions

\* No delete actions



Dashboard Usage



\* Queue Monitoring

\* Activation Tracking

\* Pending Request Visibility



Verification Status



```text

Endpoint Verified

Response Structure Available From Backend

Frontend Must Consume Exact Backend Payload

```





\## Live Activity Contract



\### GET /management/live-activity



Purpose:

Display operational activity feed.



Authentication:

Bearer Token Required



Query Parameters



| Parameter | Type    | Default |

| --------- | ------- | ------- |

| limit     | integer | 100     |



Polling



```text

10 Seconds

```



Required Permission



```text

RUNTIME\_VIEW

```



Frontend Usage



\* Dashboard Activity Feed

\* Monitoring Console



Frontend Fields



| Field Usage |

| ----------- |

| Event Type  |

| Timestamp   |

| Actor       |

| Target      |

| Action      |

| Status      |



Frontend Rules



\* Reverse chronological order

\* Newest records first

\* Auto refresh

\* Read only



Dashboard Usage



\* Recent Activity Widget

\* Operational Visibility

\* Security Awareness



Verification Status



```text

Verified Endpoint

Verified Backend Route

Consume Backend Response Directly

```





\## Logs Contract



Authentication:

Bearer Token Required



Common Query Parameters



| Parameter | Type    | Default |

| --------- | ------- | ------- |

| limit     | integer | 100     |



\---



\### GET /management/system-logs



Purpose:

System event review.



Required Permission



```text

SYSTEM\_LOGS\_VIEW

```



Polling



```text

10 Seconds

```



Frontend Usage



\* System Logs Screen

\* Dashboard Monitoring



Columns



| Column    |

| --------- |

| Timestamp |

| Event     |

| Source    |

| Severity  |

| Message   |



Frontend Rules



\* Read Only

\* Export Optional

\* Search Supported



\---



\### GET /management/security-logs



Purpose:

Security event review.



Required Permission



```text

SECURITY\_LOGS\_VIEW

```



Polling



```text

10 Seconds

```



Frontend Usage



\* Security Logs Screen

\* Security Monitoring



Columns



| Column     |

| ---------- |

| Timestamp  |

| User       |

| Event      |

| IP Address |

| Result     |



Frontend Rules



\* Read Only

\* Search Supported

\* Filter Supported



\---



\### GET /management/runtime-logs



Purpose:

Runtime diagnostics review.



Required Permission



```text

RUNTIME\_LOGS\_VIEW

```



Polling



```text

10 Seconds

```



Frontend Usage



\* Runtime Logs Screen

\* Runtime Diagnostics



Columns



| Column    |

| --------- |

| Timestamp |

| Runtime   |

| Status    |

| Event     |

| Message   |



Frontend Rules



\* Read Only

\* Search Supported

\* Filter Supported



\---



\### Logs Module Screen Mapping



Endpoints



```http

GET /management/system-logs

GET /management/security-logs

GET /management/runtime-logs

```



Permissions



```text

SYSTEM\_LOGS\_VIEW

SECURITY\_LOGS\_VIEW

RUNTIME\_LOGS\_VIEW

```



Excluded



```text

GET /management/logs/frontend

NOT VERIFIED

NOT IMPLEMENTED

```





\## Settings Contract



Authentication:

Bearer Token Required



\---



\### GET /management/settings



Purpose:

Retrieve all settings.



Required Permission



```text

SETTINGS\_VIEW

```



Frontend Usage



\* Settings Dashboard

\* Configuration Management



\---



\### GET /management/settings/{setting\_key}



Purpose:

Retrieve single setting.



Required Permission



```text

SETTINGS\_VIEW

```



Path Parameters



| Field       | Type   |

| ----------- | ------ |

| setting\_key | string |



Frontend Usage



\* Setting Details

\* Configuration Editor



\---



\### PUT /management/settings/{setting\_key}



Purpose:

Update setting.



Required Permission



```text

SETTINGS\_UPDATE

```



Path Parameters



| Field       | Type   |

| ----------- | ------ |

| setting\_key | string |



Request Schema



```json

{

&#x20; "setting\_value": "string"

}

```



Frontend Rules



\* Confirmation before save

\* Refresh setting after update

\* Show success/error notification



\---



\### Settings Screen Mapping



Endpoints



```http

GET /management/settings

GET /management/settings/{setting\_key}

PUT /management/settings/{setting\_key}

```





\## Activation Workflow Contract



Authentication:

Bearer Token Required



\---



\### POST /activation/request



Purpose:

Create activation request.



Required Permission



```text

ACTIVATION\_CREATE

```



Request Schema



```json

{

&#x20; "client\_id": "string",

&#x20; "software\_ids": \[

&#x20;   "string"

&#x20; ]

}

```



Frontend Usage



\* Activation Wizard

\* Client Activation Flow



\---



\### POST /activation/verify



Purpose:

Verify activation request.



Required Permission



```text

ACTIVATION\_VERIFY

```



Request Schema



```json

{

&#x20; "request\_id": "string",

&#x20; "otp": "string"

}

```



Frontend Usage



\* OTP Verification Modal

\* Activation Completion



\---



\### Activation Flow



```text

Select Client

→ Select Software

→ Create Activation Request

→ Receive OTP

→ Verify OTP

→ Activation Complete

```





\## Agent Portal Contract



Authentication:

Bearer Token Required



\---



\### GET /agent/my-clients



Purpose:

Retrieve assigned clients.



Frontend Usage



\* Agent Client List

\* Client Selection



Permission



```text

AGENT ACCESS

```



\---



\### GET /agent/my-software



Purpose:

Retrieve assigned software.



Frontend Usage



\* Agent Software List

\* Activation Flow



Permission



```text

AGENT ACCESS

```



\---



\### Agent Portal Screen Mapping



Endpoints



```http

GET /agent/my-clients

GET /agent/my-software

```





\## Dashboard Screen Mapping



\### Dashboard Widgets



Runtime Status



```http

GET /management/runtime-status

```



Polling



```text

15 Seconds

```



\---



OTP Queue



```http

GET /management/otp-queue

```



Polling



```text

5 Seconds

```



\---



Activation Queue



```http

GET /management/activation-queue

```



Polling



```text

5 Seconds

```



\---



Live Activity



```http

GET /management/live-activity

```



Polling



```text

10 Seconds

```



\---



System Logs



```http

GET /management/system-logs

```



Polling



```text

10 Seconds

```



\---



Security Logs



```http

GET /management/security-logs

```



Polling



```text

10 Seconds

```



\---



Runtime Logs



```http

GET /management/runtime-logs

```



Polling



```text

10 Seconds

```





\## Polling Matrix



| Endpoint                     | Interval |

| ---------------------------- | -------- |

| /management/runtime-status   | 15 sec   |

| /management/otp-queue        | 5 sec    |

| /management/activation-queue | 5 sec    |

| /management/live-activity    | 10 sec   |

| /management/system-logs      | 10 sec   |

| /management/security-logs    | 10 sec   |

| /management/runtime-logs     | 10 sec   |

| /session/heartbeat           | 60 sec   |





\## Error Handling Matrix



| Status Code | Action                           |

| ----------- | -------------------------------- |

| 400         | Show validation error            |

| 401         | Logout and redirect              |

| 403         | Permission denied screen         |

| 404         | Resource not found               |

| 422         | Show field validation errors     |

| 500         | Generic error notification       |

| 503         | Service unavailable notification |



Frontend Rules



\* Never expose stack traces

\* Log client errors

\* Preserve unsaved forms where possible





\## Known Unknowns



Excluded Endpoints



```http

GET /management/logs/frontend

GET /management/clients/{client\_id}/hwid-history

```



Status



```text

Not Verified

Not Implemented

Not Included In Scope

```





\## Verification Matrix



| Area                  | Status   |

| --------------------- | -------- |

| Authentication        | Verified |

| Session               | Verified |

| User Management       | Verified |

| Client Management     | Verified |

| Software Management   | Verified |

| Assignment Management | Verified |

| Runtime Monitoring    | Verified |

| OTP Queue             | Verified |

| Activation Queue      | Verified |

| Live Activity         | Verified |

| System Logs           | Verified |

| Security Logs         | Verified |

| Runtime Logs          | Verified |

| Settings              | Verified |

| Activation Workflow   | Verified |

| Agent Portal          | Verified |



Document Status



```text

APPROVED IMPLEMENTATION AUTHORITY

```







