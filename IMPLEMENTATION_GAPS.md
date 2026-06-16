# IMPLEMENTATION_GAPS.md

## Missing Backend Contract Details

1.  **Agent Assignment Retrieval**: There is no verified endpoint to retrieve current assignments for a specific agent (e.g., `GET /management/assignments/agent/{agent_id}`). Current implementation allows triggering assign/unassign actions but cannot display current status per agent.
2.  **Dashboard Data Schemas**:
    *   `GET /management/runtime-status`: Explicit sub-fields for CPU and Memory usage were assumed for the UI implementation.
    *   `GET /management/live-activity`: The exact payload for activity feed items was assumed.
3.  **Search/Pagination Parameters**: While the TRD requires large tables to support search/filter/pagination, the `Endpoints.md` does not specify query parameters (e.g., `?page=1&limit=10&search=...`) for the management endpoints. Frontend-side filtering/pagination is implemented as a fallback.

## Missing Response Schemas

1.  **Settings Schema**: The structure of individual setting objects (e.g., `description`, `type`) beyond `key` and `value` was assumed based on UI requirements.
2.  **Log Schemas**: The exact field names for System, Security, and Runtime logs were interpreted from the UIUX Brief as the `Endpoints.md` only listed the paths.

## Verified Exclusions (By Design)

*   `GET /management/logs/frontend` (Excluded per 07 - Endpoints.md)
*   `GET /management/clients/{client_id}/hwid-history` (Excluded per 07 - Endpoints.md)
*   Software Delete/Disable (No verified endpoints)
