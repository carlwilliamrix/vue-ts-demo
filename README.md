# Vue TypeScript Event Demo

A Vue 3 application built with TypeScript and Vite, demonstrating event management functionality.

## Project Overview

This project is a modern Vue.js application that showcases:
- Vue 3 Composition API with TypeScript
- Component-based architecture
- Event management system
- Type-safe development

## Project Structure

```
src/
├── components/
│   ├── EventForm.vue    # Form for creating/editing events
│   ├── EventList.vue    # Display list of events
│   └── FilterButton.vue # Event filtering functionality
├── App.vue             # Root component
├── main.ts            # Application entry point
├── style.css         # Global styles
└── types.ts          # TypeScript type definitions
```

## Technology Stack

- Vue 3
- TypeScript
- Vite
- Vue SFC (Single File Components) with `<script setup>`

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Development

This project uses Vue 3 `<script setup>` SFCs. Check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

For TypeScript configuration and best practices, refer to the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

## Features

- Event creation and management
- Event filtering functionality
- Type-safe component props and events
- Responsive design

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT license.
