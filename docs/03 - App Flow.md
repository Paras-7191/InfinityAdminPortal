\# Application Flow Document



Version: 1.0



Status: Approved



Authority:

07 - Endpoints.md



\---



\# 1. Authentication Flow



\## Admin Login Flow



```text

Admin Login Page

&#x20;       │

&#x20;       ▼

Enter Admin ID

Enter Password

&#x20;       │

&#x20;       ▼

POST /auth/admin/login

&#x20;       │

&#x20;       ▼

OTP Generated

&#x20;       │

&#x20;       ▼

Redirect OTP Verification

```



\---



\## Agent Login Flow



```text

Agent Login Page

&#x20;       │

&#x20;       ▼

Enter Mobile Number

&#x20;       │

&#x20;       ▼

POST /auth/agent/login

&#x20;       │

&#x20;       ▼

OTP Generated

&#x20;       │

&#x20;       ▼

Redirect OTP Verification

```



\---



\# 2. OTP Verification Flow



```text

OTP Verification Screen

&#x20;       │

&#x20;       ▼

Enter OTP

&#x20;       │

&#x20;       ▼

POST /auth/verify-otp

&#x20;       │

&#x20;       ▼

Session Created

&#x20;       │

&#x20;       ▼

Permissions Loaded

&#x20;       │

&#x20;       ▼

Dashboard Access Granted

```



Failure



```text

Invalid OTP

Expired OTP

Verification Failure

```



Action



```text

Show Error

Remain On OTP Screen

```



\---



\# 3. Session Flow



\## Session Restore



```text

Application Start

&#x20;       │

&#x20;       ▼

GET /session/validate

&#x20;       │

&#x20;       ├── Valid

&#x20;       │       │

&#x20;       │       ▼

&#x20;       │   Load User

&#x20;       │   Load Permissions

&#x20;       │   Open Dashboard

&#x20;       │

&#x20;       └── Invalid

&#x20;               │

&#x20;               ▼

&#x20;            Login Page

```



\---



\## Session Heartbeat



```text

Authenticated Session

&#x20;       │

&#x20;       ▼

POST /session/heartbeat

Every 60 Seconds

&#x20;       │

&#x20;       ▼

Session Extended

```



\---



\## Logout Flow



```text

Logout Button

&#x20;       │

&#x20;       ▼

POST /session/logout

&#x20;       │

&#x20;       ▼

Clear Session

&#x20;       │

&#x20;       ▼

Redirect Login

```



\---



\## Force Logout Flow



```text

Admin User List

&#x20;       │

&#x20;       ▼

Select User

&#x20;       │

&#x20;       ▼

POST /session/force-logout/{user\_id}

&#x20;       │

&#x20;       ▼

Target Session Terminated

```



\---



\# 4. Dashboard Flow



```text

Dashboard Load

&#x20;       │

&#x20;       ▼

Load Runtime Status

Load OTP Queue

Load Activation Queue

Load Live Activity

Load Logs

```



\---



\## Runtime Widget



```text

GET /management/runtime-status

```



Refresh



```text

15 Seconds

```



\---



\## OTP Queue Widget



```text

GET /management/otp-queue

```



Refresh



```text

5 Seconds

```



\---



\## Activation Queue Widget



```text

GET /management/activation-queue

```



Refresh



```text

5 Seconds

```



\---



\## Live Activity Widget



```text

GET /management/live-activity

```



Refresh



```text

10 Seconds

```



\---



\## Logs Widgets



```text

GET /management/system-logs

GET /management/security-logs

GET /management/runtime-logs

```



Refresh



```text

10 Seconds

```



\---



\# 5. Admin Management Flow



```text

Admin Management Page

&#x20;       │

&#x20;       ▼

GET /management/users

&#x20;       │

&#x20;       ▼

Filter:

ADMIN

SUPER\_ADMIN

```



\---



\## Create Admin



```text

Open Create Modal

&#x20;       │

&#x20;       ▼

Enter Details

&#x20;       │

&#x20;       ▼

POST /management/users

&#x20;       │

&#x20;       ▼

Refresh List

```



\---



\## Update Admin



```text

Open Edit Modal

&#x20;       │

&#x20;       ▼

PUT /management/users/{user\_id}

&#x20;       │

&#x20;       ▼

Refresh List

```



\---



\## Delete Admin



```text

Confirmation

&#x20;       │

&#x20;       ▼

DELETE /management/users/{user\_id}

&#x20;       │

&#x20;       ▼

Refresh List

```



\---



\# 6. Agent Management Flow



```text

Agent Management Page

&#x20;       │

&#x20;       ▼

GET /management/users

&#x20;       │

&#x20;       ▼

Filter:

AGENT

```



\---



\## Create Agent



```text

POST /management/users

```



\---



\## Update Agent



```text

PUT /management/users/{user\_id}

```



\---



\## Delete Agent



```text

DELETE /management/users/{user\_id}

```



\---



\# 7. Client Management Flow



```text

Clients Page

&#x20;       │

&#x20;       ▼

GET /management/clients

```



\---



\## Create Client



```text

POST /management/clients

```



Required



```text

Client Name

HWID

```



\---



\## Edit Client



```text

PUT /management/clients/{client\_id}

```



\---



\## View Client



```text

GET /management/clients/{client\_id}

```



\---



\# 8. Software Management Flow



```text

Software Page

&#x20;       │

&#x20;       ▼

GET /management/software

```



\---



\## Create Software



```text

POST /management/software

```



\---



\## Update Software



```text

PUT /management/software/{software\_id}

```



\---



\# 9. Assignment Flow



\## Client Assignment



```text

Select Agent

&#x20;       │

&#x20;       ▼

Select Client

&#x20;       │

&#x20;       ▼

POST /management/assignments/client

```



\---



\## Client Unassignment



```text

DELETE /management/assignments/client

```



\---



\## Software Assignment



```text

Select Agent

&#x20;       │

&#x20;       ▼

Select Software

&#x20;       │

&#x20;       ▼

POST /management/assignments/software

```



\---



\## Software Unassignment



```text

DELETE /management/assignments/software

```



\---



\# 10. Activation Flow



\## Create Activation



```text

Select Client

&#x20;       │

&#x20;       ▼

Select Software

&#x20;       │

&#x20;       ▼

POST /activation/request

```



\---



\## Verify Activation



```text

Enter OTP

&#x20;       │

&#x20;       ▼

POST /activation/verify

```



\---



\## Success



```text

Activation Completed

```



\---



\# 11. Logs Flow



\## System Logs



```text

GET /management/system-logs

```



\---



\## Security Logs



```text

GET /management/security-logs

```



\---



\## Runtime Logs



```text

GET /management/runtime-logs

```



All Log Screens



```text

Read Only

Auto Refresh

```



\---



\# 12. Settings Flow



\## Load Settings



```text

GET /management/settings

```



\---



\## View Setting



```text

GET /management/settings/{setting\_key}

```



\---



\## Update Setting



```text

PUT /management/settings/{setting\_key}

```



\---



\# 13. Failure Flows



\## Authentication Failure



```text

Invalid Credentials

&#x20;       │

&#x20;       ▼

Show Error

Remain On Login

```



\---



\## OTP Failure



```text

Invalid OTP

Expired OTP

&#x20;       │

&#x20;       ▼

Show Error

Remain On Verification

```



\---



\## Session Failure



```text

Session Invalid

Session Expired

&#x20;       │

&#x20;       ▼

Clear Session

Redirect Login

```



\---



\## Permission Failure



```text

403 Response

&#x20;       │

&#x20;       ▼

Permission Denied

```



\---



\## Backend Failure



```text

500

503

&#x20;       │

&#x20;       ▼

Show Error State

Retry Available

```



\---



\# 14. Polling Summary



| Endpoint          | Interval |

| ----------------- | -------- |

| Runtime Status    | 15 sec   |

| OTP Queue         | 5 sec    |

| Activation Queue  | 5 sec    |

| Live Activity     | 10 sec   |

| System Logs       | 10 sec   |

| Security Logs     | 10 sec   |

| Runtime Logs      | 10 sec   |

| Session Heartbeat | 60 sec   |



\---



\# 15. Flow Acceptance Criteria



Authentication operational.



Session lifecycle operational.



Management workflows operational.



Assignment workflows operational.



Activation workflows operational.



Dashboard monitoring operational.



Logs monitoring operational.



Settings management operational.



Status



```text

IMPLEMENTATION READY

```



