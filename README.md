Simple web app for managing employees.

## Setup

### 1. Database Setup

Create `employee_db` database and fill the table:

```sql
CREATE TABLE employee (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  job_title VARCHAR(100) NOT NULL,
  salary INT NOT NULL CHECK (salary >= 0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  KEY idx_name (name)
);
```

### 2. Install Dependencies

```bash
pnpm install
```

on both `frontend` and `backend`

### 3. Environment Setup

Copy `.env.example` on backend and rename it to `.env`. Then, modify it appropriately

### 4. Development

```bash
pnpm run start # on backend
pnpm run dev # on frontend
```

Server runs at `http://localhost:3000`
