## Getting Started

### Clone the Repository

```bash
git clone https://github.com/rustoma/pokemon-manager.git
cd pokemon-manager
```

### Environment Variables

Create a `.env` file in the root directory and copy variables from `env.example`:

```bash
cp env.example .env
```

Edit the `.env` file with your configuration values.

### Database Setup

You can use Docker for fast database setup:

```bash
yarn setup_docker_dev
```

This will start a PostgreSQL database container on port `6566`.

Alternatively, you can set up your own PostgreSQL database and configure the `DATABASE_URL` environment variable.

### Install Dependencies and Run Migrations

```bash
# Install dependencies
yarn install

# Apply database migrations and generate Prisma client
yarn migrations:apply
```

Or run them separately:

```bash
# Apply migrations
npx prisma migrate deploy

# Generate Prisma client
yarn prisma:generate
```

### Start Development Server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
