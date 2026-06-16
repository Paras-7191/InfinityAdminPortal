\# Backend Integration Mapping



Version: 1.0



Status: Approved



Authority:

07 - Endpoints.md



\---



\# Dashboard



| Page      | Endpoint                     | Method | Permission         | Polling | Response Usage          | Frontend Rules |

| --------- | ---------------------------- | ------ | ------------------ | ------- | ----------------------- | -------------- |

| Dashboard | /management/runtime-status   | GET    | RUNTIME\_VIEW       | 15 sec  | Runtime cards           | Read only      |

| Dashboard | /management/otp-queue        | GET    | SECURITY\_LOGS\_VIEW | 5 sec   | OTP table widget        | Read only      |

| Dashboard | /management/activation-queue | GET    | ACTIVATION\_CREATE  | 5 sec   | Activation queue widget | Read only      |

| Dashboard | /management/live-activity    | GET    | RUNTIME\_VIEW       | 10 sec  | Activity feed           | Read only      |

| Dashboard | /management/system-logs      | GET    | SYSTEM\_LOGS\_VIEW   | 10 sec  | Recent system logs      | Read only      |

| Dashboard | /management/security-logs    | GET    | SECURITY\_LOGS\_VIEW | 10 sec  | Recent security logs    | Read only      |

| Dashboard | /management/runtime-logs     | GET    | RUNTIME\_LOGS\_VIEW  | 10 sec  | Recent runtime logs     | Read only      |



\---



\# Authentication



| Page             | Endpoint          | Method | Permission | Polling | Response Usage | Frontend Rules |

| ---------------- | ----------------- | ------ | ---------- | ------- | -------------- | -------------- |

| Login            | /auth/admin/login | POST   | None       | No      | Start OTP flow | Validate form  |

| Login            | /auth/agent/login | POST   | None       | No      | Start OTP flow | Validate form  |

| OTP Verification | /auth/verify-otp  | POST   | None       | No      | Create session | Store token    |



\---



\# Session



| Page            | Endpoint                        | Method | Permission    | Polling | Response Usage      | Frontend Rules            |

| --------------- | ------------------------------- | ------ | ------------- | ------- | ------------------- | ------------------------- |

| App Bootstrap   | /session/validate               | GET    | Authenticated | No      | Session restore     | Route protection          |

| Global Session  | /session/heartbeat              | POST   | Authenticated | 60 sec  | Session extension   | Silent background request |

| Logout          | /session/logout                 | POST   | Authenticated | No      | Session termination | Clear stores              |

| User Management | /session/force-logout/{user\_id} | POST   | USER\_UPDATE   | No      | Force logout        | Confirmation required     |



\---



\# Admin Management



| Page   | Endpoint                    | Method | Permission   | Polling | Response Usage       | Frontend Rules           |

| ------ | --------------------------- | ------ | ------------ | ------- | -------------------- | ------------------------ |

| Admins | /management/users           | GET    | USER\_VIEW    | No      | Admin listing        | Filter ADMIN/SUPER\_ADMIN |

| Admins | /management/users           | POST   | USER\_CREATE  | No      | Create admin         | Refresh table            |

| Admins | /management/users/{user\_id} | PUT    | USER\_UPDATE  | No      | Update admin         | Refresh table            |

| Admins | /management/users/{user\_id} | DELETE | USER\_DISABLE | No      | Disable/Delete admin | Confirmation required    |



\---



\# Agent Management



| Page   | Endpoint                    | Method | Permission   | Polling | Response Usage       | Frontend Rules        |

| ------ | --------------------------- | ------ | ------------ | ------- | -------------------- | --------------------- |

| Agents | /management/users           | GET    | USER\_VIEW    | No      | Agent listing        | Filter AGENT          |

| Agents | /management/users           | POST   | USER\_CREATE  | No      | Create agent         | Refresh table         |

| Agents | /management/users/{user\_id} | PUT    | USER\_UPDATE  | No      | Update agent         | Refresh table         |

| Agents | /management/users/{user\_id} | DELETE | USER\_DISABLE | No      | Disable/Delete agent | Confirmation required |



\---



\# Client Management



| Page           | Endpoint                        | Method | Permission    | Polling | Response Usage | Frontend Rules           |

| -------------- | ------------------------------- | ------ | ------------- | ------- | -------------- | ------------------------ |

| Clients        | /management/clients             | GET    | CLIENT\_VIEW   | No      | Client list    | Search, filter, paginate |

| Clients        | /management/clients             | POST   | CLIENT\_CREATE | No      | Create client  | Refresh table            |

| Clients        | /management/clients/{client\_id} | PUT    | CLIENT\_UPDATE | No      | Update client  | Refresh table            |

| Client Details | /management/clients/{client\_id} | GET    | CLIENT\_VIEW   | No      | Client details | Read/detail view         |



\---



\# Software Management



| Page     | Endpoint                           | Method | Permission      | Polling | Response Usage  | Frontend Rules           |

| -------- | ---------------------------------- | ------ | --------------- | ------- | --------------- | ------------------------ |

| Software | /management/software               | GET    | SOFTWARE\_VIEW   | No      | Software list   | Search, filter, paginate |

| Software | /management/software               | POST   | SOFTWARE\_CREATE | No      | Create software | Refresh table            |

| Software | /management/software/{software\_id} | PUT    | SOFTWARE\_UPDATE | No      | Update software | Refresh table            |



Rules



```text

No Delete

No Disable

No Unverified Actions

```



\---



\# Assignment Management



| Page                       | Endpoint                         | Method | Permission      | Polling | Response Usage    | Frontend Rules           |

| -------------------------- | -------------------------------- | ------ | --------------- | ------- | ----------------- | ------------------------ |

| Assign Clients             | /management/assignments/client   | POST   | ASSIGN\_CLIENTS  | No      | Create assignment | Refresh assignment state |

| Remove Client Assignment   | /management/assignments/client   | DELETE | ASSIGN\_CLIENTS  | No      | Remove assignment | Confirmation required    |

| Assign Software            | /management/assignments/software | POST   | ASSIGN\_SOFTWARE | No      | Create assignment | Refresh assignment state |

| Remove Software Assignment | /management/assignments/software | DELETE | ASSIGN\_SOFTWARE | No      | Remove assignment | Confirmation required    |



\---



\# Activation Management



| Page                    | Endpoint            | Method | Permission        | Polling | Response Usage      | Frontend Rules           |

| ----------------------- | ------------------- | ------ | ----------------- | ------- | ------------------- | ------------------------ |

| Activation Wizard       | /activation/request | POST   | ACTIVATION\_CREATE | No      | Create request      | Move to OTP verification |

| Activation Verification | /activation/verify  | POST   | ACTIVATION\_VERIFY | No      | Complete activation | Success state            |



\---



\# Logs



\## System Logs



| Page        | Endpoint                | Method | Permission       | Polling | Response Usage | Frontend Rules |

| ----------- | ----------------------- | ------ | ---------------- | ------- | -------------- | -------------- |

| System Logs | /management/system-logs | GET    | SYSTEM\_LOGS\_VIEW | 10 sec  | Log table      | Read only      |



\## Security Logs



| Page          | Endpoint                  | Method | Permission         | Polling | Response Usage | Frontend Rules |

| ------------- | ------------------------- | ------ | ------------------ | ------- | -------------- | -------------- |

| Security Logs | /management/security-logs | GET    | SECURITY\_LOGS\_VIEW | 10 sec  | Log table      | Read only      |



\## Runtime Logs



| Page         | Endpoint                 | Method | Permission        | Polling | Response Usage | Frontend Rules |

| ------------ | ------------------------ | ------ | ----------------- | ------- | -------------- | -------------- |

| Runtime Logs | /management/runtime-logs | GET    | RUNTIME\_LOGS\_VIEW | 10 sec  | Log table      | Read only      |



\---



\# Settings



| Page     | Endpoint                           | Method | Permission      | Polling | Response Usage  | Frontend Rules           |

| -------- | ---------------------------------- | ------ | --------------- | ------- | --------------- | ------------------------ |

| Settings | /management/settings               | GET    | SETTINGS\_VIEW   | No      | Settings list   | Read only                |

| Settings | /management/settings/{setting\_key} | GET    | SETTINGS\_VIEW   | No      | Setting details | Read only                |

| Settings | /management/settings/{setting\_key} | PUT    | SETTINGS\_UPDATE | No      | Update setting  | Confirmation before save |



\---



\# Agent Portal



| Page        | Endpoint           | Method | Permission   | Polling | Response Usage    | Frontend Rules |

| ----------- | ------------------ | ------ | ------------ | ------- | ----------------- | -------------- |

| My Clients  | /agent/my-clients  | GET    | AGENT ACCESS | No      | Assigned clients  | Read only      |

| My Software | /agent/my-software | GET    | AGENT ACCESS | No      | Assigned software | Read only      |



\---



\# Integration Rules



1\. All protected requests require:



```http

Authorization: Bearer <token>

```



2\. All polling must stop on logout.



3\. All polling must stop on permission loss.



4\. All 401 responses:



```text

Clear Session

Redirect Login

```



5\. Only verified endpoints may be integrated.



\---



\# Excluded Integrations



Not Verified



```http

GET /management/logs/frontend



GET /management/clients/{client\_id}/hwid-history

```



Status



```text

DO NOT IMPLEMENT

DO NOT MAP

```



\---



\# Mapping Status



```text

IMPLEMENTATION READY

```



