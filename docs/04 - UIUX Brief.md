\# UIUX Brief



Version: 1.0



Status: Approved



Authority:

07 - Endpoints.md



\---



\# 1. Design Goals



The Admin Portal must provide:



\* Fast operational visibility

\* Efficient administrative workflows

\* Clear permission-driven navigation

\* Real-time monitoring experience

\* Minimal interaction friction



Primary focus:



```text

Speed

Clarity

Consistency

Scalability

```



\---



\# 2. Theme System



\## Supported Themes



```text

Light Theme

Dark Theme

```



Theme switching must be global.



User preference persists for current session.



\---



\# 3. Design Language



Style



```text

Modern Administrative Dashboard

```



Characteristics



```text

Clean

Structured

Dense Information Layout

Low Visual Noise

```



\---



\# 4. Layout System



\## Application Shell



```text

┌───────────────────────────────┐

│ Topbar                        │

├───────┬───────────────────────┤

│       │                       │

│       │                       │

│Side   │ Main Content Area     │

│Bar    │                       │

│       │                       │

│       │                       │

├───────┴───────────────────────┤

│ Footer (Optional)             │

└───────────────────────────────┘

```



\---



\## Desktop Layout



```text

Sidebar Fixed

Topbar Fixed

Content Scrollable

```



\---



\## Tablet Layout



```text

Collapsible Sidebar

Fixed Topbar

```



\---



\## Mobile Layout



```text

Drawer Navigation

Responsive Tables

Stacked Cards

```



\---



\# 5. Sidebar



\## Primary Navigation



```text

Dashboard



Admins

Agents



Clients

Software



Assignments



Logs

&#x20;├─ System Logs

&#x20;├─ Security Logs

&#x20;└─ Runtime Logs



Settings

```



\---



\## Sidebar Rules



Navigation visibility must be permission driven.



Unauthorized modules must not appear.



Current route must be highlighted.



\---



\# 6. Topbar



\## Components



```text

Breadcrumbs



Search (Optional)



Refresh Button



Theme Toggle



User Menu

```



\---



\## User Menu



Options



```text

Profile



Logout

```



\---



\# 7. Dashboard Layout



\## Dashboard Sections



\### Runtime Status



Source



```http

GET /management/runtime-status

```



Display



```text

Status Cards

```



\---



\### OTP Queue



Source



```http

GET /management/otp-queue

```



Display



```text

Table Widget

```



\---



\### Activation Queue



Source



```http

GET /management/activation-queue

```



Display



```text

Table Widget

```



\---



\### Live Activity



Source



```http

GET /management/live-activity

```



Display



```text

Activity Feed

```



\---



\### Logs Overview



Sources



```http

GET /management/system-logs

GET /management/security-logs

GET /management/runtime-logs

```



Display



```text

Recent Events Panels

```



\---



\# 8. Dashboard Grid Rules



Desktop



```text

12 Column Grid

```



Suggested Layout



```text

Runtime Status       12



OTP Queue             6

Activation Queue      6



Live Activity         6

Recent Logs           6

```



\---



\# 9. Table Rules



All Management Tables



```text

Search

Pagination

Sorting

Loading State

Empty State

Error State

```



\---



\## Standard Table Actions



```text

View



Edit



Delete

```



Only display actions allowed by permissions.



\---



\## Table Row Selection



Allowed For



```text

Assignments

Bulk Operations

```



\---



\# 10. Form Rules



All Forms Must Include



```text

Validation



Loading State



Success State



Error State

```



\---



\## Validation Source



```text

Backend Contract

Zod Schema

```



\---



\## Submit Behavior



```text

Disable Submit During Request

Prevent Double Submission

```



\---



\# 11. Modal Rules



Used For



```text

Create

Edit

Delete Confirmation

Assignment Operations

Activation Verification

```



\---



\## Modal Structure



```text

Header



Content



Actions

```



Actions



```text

Cancel

Confirm

```



\---



\# 12. CRUD Screen Standards



\## List Page



Contains



```text

Page Header



Filters



Search



Data Table



Pagination

```



\---



\## Create Flow



```text

Button

→ Modal

→ Form

→ Save

→ Refresh

```



\---



\## Edit Flow



```text

Edit Action

→ Modal

→ Update

→ Refresh

```



\---



\## Delete Flow



```text

Delete Action

→ Confirmation

→ Delete

→ Refresh

```



\---



\# 13. Runtime Monitoring UI



Status Badge Values



```text

ONLINE

OFFLINE

DEGRADED

UNKNOWN

```



Display



```text

Badge

Last Heartbeat

CPU Usage

Memory Usage

```



\---



\# 14. Queue UI Rules



OTP Queue



Columns



```text

OTP Type

User ID

Status

Requested At

Expires At

Used At

Requested IP

```



\---



Activation Queue



Columns



```text

Request ID

Client

Software

Status

Requested At

Completed At

```



\---



\# 15. Logs UI Rules



System Logs



```text

Timestamp

Event

Severity

Message

```



\---



Security Logs



```text

Timestamp

User

IP

Event

Result

```



\---



Runtime Logs



```text

Timestamp

Runtime

Status

Event

Message

```



\---



\## Log Rules



```text

Read Only

Auto Refresh

Newest First

```



\---



\# 16. Design Tokens



\## Radius



```text

Small

Medium

Large

```



Use consistent radius across all components.



\---



\## Spacing



```text

4

8

12

16

24

32

```



\---



\## Elevation



```text

Level 1

Level 2

Level 3

```



\---



\# 17. Loading States



Required For



```text

Dashboard Widgets



Tables



Forms



Settings

```



Display



```text

Skeleton Loaders

```



\---



\# 18. Empty States



Required For



```text

Users



Clients



Software



Queues



Logs

```



Display



```text

No Records Found

```



\---



\# 19. Error States



Display



```text

Friendly Error Message



Retry Action

```



Never display:



```text

Stack Trace

Raw Backend Error

```



\---



\# 20. Accessibility



Requirements



```text

Keyboard Navigation



Visible Focus States



Semantic HTML



ARIA Labels



Accessible Forms



Accessible Tables

```



\---



\## Color Contrast



Must meet:



```text

WCAG AA

```



\---



\# 21. Responsive Rules



Desktop



```text

Primary Target

```



Tablet



```text

Fully Supported

```



Mobile



```text

Operational Support

```



\---



\# 22. Excluded Features



Not In Scope



```text

Frontend Logs Screen



HWID History Screen

```



Excluded Endpoints



```http

GET /management/logs/frontend



GET /management/clients/{client\_id}/hwid-history

```



\---



\# 23. UI Acceptance Criteria



Navigation permission aware.



Dashboard fully operational.



CRUD screens consistent.



Tables standardized.



Forms standardized.



Responsive behavior operational.



Accessibility requirements satisfied.



Status



```text

IMPLEMENTATION READY

```



