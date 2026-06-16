\# Product Requirements Document (PRD)



Version: 1.0



Status: Approved



Source of Truth:

07 - Endpoints.md



\---



\# 1. Product Overview



The Admin Portal is the centralized management system for the WinLicense Registration Platform.



The portal provides:



\* Authentication management

\* User management

\* Client management

\* Software management

\* Assignment management

\* Runtime monitoring

\* Activation monitoring

\* Operational logging

\* System configuration



The portal operates entirely against verified backend contracts.



\---



\# 2. Product Goals



\## Primary Goals



\* Secure administrator access

\* Centralized operational visibility

\* Controlled user administration

\* Controlled client administration

\* Controlled software administration

\* Assignment management

\* Runtime health monitoring

\* Activation workflow monitoring

\* Configuration management



\## Secondary Goals



\* Real-time operational visibility

\* Permission-based access control

\* Audit visibility

\* Security monitoring



\---



\# 3. User Roles



\## SUPER\_ADMIN



Capabilities



\* Full platform access

\* Full management access

\* Full monitoring access

\* Full configuration access



\---



\## ADMIN



Capabilities



\* Permission-driven access

\* Module access controlled by backend permissions



\---



\## AGENT



Capabilities



\* Assigned client access

\* Assigned software access

\* Activation workflows



Endpoints



```http

GET /agent/my-clients

GET /agent/my-software

```



\---



\# 4. Module Inventory



\## Authentication



Functions



\* Admin Login

\* Agent Login

\* OTP Verification

\* Session Validation

\* Session Heartbeat

\* Logout



\---



\## Dashboard



Functions



\* Runtime Status

\* OTP Queue

\* Activation Queue

\* Live Activity

\* System Logs

\* Security Logs

\* Runtime Logs



\---



\## Admin Management



Functions



\* List Admins

\* Create Admin

\* Update Admin

\* Disable/Delete Admin



Backend Source



```http

/management/users

```



Role Filter



```text

ADMIN

SUPER\_ADMIN

```



\---



\## Agent Management



Functions



\* List Agents

\* Create Agent

\* Update Agent

\* Disable/Delete Agent



Backend Source



```http

/management/users

```



Role Filter



```text

AGENT

```



\---



\## Client Management



Functions



\* List Clients

\* Create Client

\* Update Client

\* View Client Details



Backend Source



```http

/management/clients

```



\---



\## Software Management



Functions



\* List Software

\* Create Software

\* Update Software



Backend Source



```http

/management/software

```



\---



\## Assignment Management



Functions



\* Assign Client

\* Remove Client Assignment

\* Assign Software

\* Remove Software Assignment



\---



\## Activation Management



Functions



\* Create Activation Request

\* Verify Activation



\---



\## Logs Management



Functions



\* System Logs

\* Security Logs

\* Runtime Logs



\---



\## Settings Management



Functions



\* View Settings

\* Update Settings



\---



\# 5. Business Requirements



\## BR-01 Authentication



System shall support:



\* Admin login

\* Agent login

\* OTP verification



\---



\## BR-02 Session Management



System shall support:



\* Session validation

\* Session heartbeat

\* Logout

\* Force logout



\---



\## BR-03 User Administration



System shall support:



\* User creation

\* User update

\* User disable/delete



Supported Roles



\* SUPER\_ADMIN

\* ADMIN

\* AGENT



\---



\## BR-04 Client Administration



System shall support:



\* Client creation

\* Client update

\* Client detail retrieval



HWID required.



\---



\## BR-05 Software Administration



System shall support:



\* Software creation

\* Software update

\* Software listing



Delete functionality is not part of verified scope.



\---



\## BR-06 Assignment Management



System shall support:



\* Agent → Client assignment

\* Agent → Software assignment



\---



\## BR-07 Runtime Monitoring



System shall provide:



\* Runtime status visibility

\* Runtime logs visibility



\---



\## BR-08 Queue Monitoring



System shall provide:



\* OTP Queue visibility

\* Activation Queue visibility



\---



\## BR-09 Activity Monitoring



System shall provide:



\* Live activity visibility



\---



\## BR-10 Logs Monitoring



System shall provide:



\* System Logs

\* Security Logs

\* Runtime Logs



\---



\## BR-11 Settings Management



System shall support:



\* Settings retrieval

\* Settings updates



\---



\# 6. Permission Requirements



\## Runtime



```text

RUNTIME\_VIEW

RUNTIME\_LOGS\_VIEW

```



\## Users



```text

USER\_VIEW

USER\_CREATE

USER\_UPDATE

USER\_DISABLE

```



\## Clients



```text

CLIENT\_VIEW

CLIENT\_CREATE

CLIENT\_UPDATE

```



\## Software



```text

SOFTWARE\_VIEW

SOFTWARE\_CREATE

SOFTWARE\_UPDATE

```



\## Assignments



```text

ASSIGN\_CLIENTS

ASSIGN\_SOFTWARE

```



\## Logs



```text

SYSTEM\_LOGS\_VIEW

SECURITY\_LOGS\_VIEW

RUNTIME\_LOGS\_VIEW

```



\## Settings



```text

SETTINGS\_VIEW

SETTINGS\_UPDATE

```



\## Activation



```text

ACTIVATION\_CREATE

ACTIVATION\_VERIFY

```



\---



\# 7. Non-Functional Requirements



\## Performance



Dashboard polling must operate without blocking UI.



\## Security



All protected routes require authenticated session.



\## Reliability



Failed polling requests must not crash application.



\## Scalability



Lists must support backend limits and pagination.



\---



\# 8. Out Of Scope



Excluded Features



```text

Frontend Logs

HWID History

```



Endpoints Not Verified



```http

GET /management/logs/frontend

GET /management/clients/{client\_id}/hwid-history

```



\---



\# 9. Acceptance Criteria



Authentication



\* Admin login successful

\* Agent login successful

\* OTP verification successful



Session



\* Session validation operational

\* Heartbeat operational

\* Logout operational



Management



\* User CRUD operational

\* Client CRUD operational

\* Software management operational



Assignments



\* Client assignments operational

\* Software assignments operational



Dashboard



\* Runtime monitoring operational

\* OTP Queue operational

\* Activation Queue operational

\* Live Activity operational



Logs



\* System Logs operational

\* Security Logs operational

\* Runtime Logs operational



Settings



\* Settings retrieval operational

\* Settings updates operational



Permissions



\* Unauthorized actions blocked

\* Authorized actions available



Status



```text

IMPLEMENTATION READY

```



