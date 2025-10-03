# Cards Online - Multiplayer Blackjack

A real-time multiplayer blackjack game built with TypeScript, featuring a React frontend and Express server with Socket.IO for real-time communication.

## 🎮 Features

- **Real-time multiplayer gameplay** with Socket.IO
- **Modern React frontend** with Vite and TypeScript
- **Express server** with TypeScript for game logic
- **In-memory game state** (Redis integration planned)
- **Docker support** for easy deployment
- **Storybook** for component development and documentation

## 🏗️ Architecture

- **Client**: React + Vite + TypeScript + Material-UI
- **Server**: Express + Socket.IO + TypeScript
- **Real-time**: Socket.IO for client-server communication
- **State Management**: In-memory store (TODO: migrate to Redis for scaling)
- **Development**: Storybook for component development

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- pnpm package manager
- Docker & Docker Compose (optional)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cards-online
   ```

2. **Install dependencies**
   ```bash
   # Install client dependencies
   cd client
   pnpm install

   # Install server dependencies
   cd ../server
   pnpm install
   ```

3. **Start the development servers**
   
   **Terminal 1 - Client:**
   ```bash
   cd client
   pnpm dev
   ```
   
   **Terminal 2 - Server:**
   ```bash
   cd server
   pnpm build
   pnpm start
   ```

4. **Access the application**
   - Client: http://localhost:5173
   - Server: http://localhost:56789

### Docker Development

For a containerized setup:

```bash
# Build and start both services
docker-compose up --build

```

This will start:
- Client on http://localhost:5173
- Server on http://localhost:56789

## 📁 Project Structure

```
cards-online/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── routes/         # Application routes
│   │   ├── socketLib/      # Socket.IO client setup
│   │   └── utils/          # Utility functions
│   └── Dockerfile
├── server/                 # Express backend
│   ├── src/
│   │   ├── api/           # REST API routes
│   │   ├── sockets/       # Socket.IO handlers
│   │   └── services/      # Game logic services
│   └── Dockerfile
└── docker-compose.yaml    # Multi-service setup
```

## 🛠️ Development

### Available Scripts

**Client:**
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm storybook` - Start Storybook
- `pnpm lint` - Run ESLint

**Server:**
- `pnpm dev` - Start with nodemon (auto-restart)
- `pnpm build` - Compile TypeScript
- `pnpm start` - Start production server

### Component Development

This project uses Storybook for component development:

```bash
cd client
pnpm storybook
```

Access Storybook at http://localhost:6006

## 🔮 Upcoming Features (TODO)

- **Redis Integration**: Migrate from in-memory store to Redis for better scaling
- **Enhanced Error Handling**: Improve error handling in socket connections
- **Room Management**: Implement proper room division and management
- **Player Banks**: Move bank management to player attributes
- **Game State Defaults**: Implement default state handling for games
- **Code Cleanup**: Remove duplicate card utilities (implemented on server)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with both client and server
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.
