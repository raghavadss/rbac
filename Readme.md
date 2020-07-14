# RBAC

This is a basic CLI tool for  Role-Based Access Control using in-memory objects as the datastore.


## Requirements



1. To create a command-line tool for Role-based access control which lives and dies within a node.js session.
2. Users of the RBAC system should be able to -
    1. Define various types of actions that users can perform.
    2. Define the resources on which access can be managed.
    3. Add users who access resources in the system.
    4. Define various roles played by the users in the system.
    5. Add multiple roles to the user and thereby providing accesses pertaining to different roles
    6. Ability to grant/ revoke access to any user/ role for any resource or a specific action on a resource at any point of time.
    7. Ability to check what accesses a user/ role has and to check if a user/ role has access to a specific action on a specific resource.


## Assumptions & Workarounds



1. Global Access cannot be provided to any user/ role. Each permission (Action on a Resource) has to be explicitly set.
2. There’s no expiry for an permission assigned to a role/ for a role assigned to a user.
3. No authentication flows have been built to keep the focus on authorisation alone.
4. Bulk changes cannot be done at the current stage. Design is open for extensions.
5. Basic CRUD actions will be pre-loaded into the system for ease of operations.


## Concepts



1. ActionType - Describes the actions that are being authorised using RBAC
2. Resource - Describes the entities on which access is being controlled
3. Permission - Describes the action types that are allowed to be performed on a given resource
4. Role - A group of permissions with an easily identifiable name
5. RolePermission - A mapping model between Role and Permission. It maintains the many-many relationship that these entities share.
6. User - An individual whose access to resources can be controlled with this RBAC
7. UserRole - The roles assigned to a user.


## ER Diagram
![ER Diagram](/images/image1.png)

## How to Run

To run the application - 



1. Clone the repository to a machine
2. Run npm install
3. A CLI will start and you can now interact with the application


## Contracts

The CLI accepts the commands in the format _&lt;command> -arg1 val1 -arg2 val2 … &lt;argn>_

If any value is supposed to have space in between, they should be wrapped in double-quotes.
