<h1 align="center">✨ ELA LABS - SMART SKELETON✨</h1>

<p align="center">
  A collection of smart, reusable components focused on real-world performance and UX.
</p>

<p align="center">
  <a href="#📦-installation">Installation</a> •
  <a href="#🚀-usage">Usage</a> •
  <a href="#🛠️-how-it-works">How it Works</a> •
  <a href="#🧩-examples">Examples</a> •
  <a href="#📚-documentation">Documentation</a> •
  <a href="#🤝-contributing">Contributing</a> •
  <a href="#🪪-license">License</a>
</p>

---

## 🧪 About

**ELA LABS** is an open source initiative to create lightweight and intelligent UI components.

We aim to bridge real-world DOM behavior with developer ergonomics — making things that _just work_ across devices and layouts.

### 🚧 Work in Progress

This is just the beginning. More components are coming soon!

## 💡 Components

### 🦴 `SmartSkeleton`

The `SmartSkeleton` is a smart skeleton loading component that adapts to the real DOM structure and styles.

It’s designed to balance **performance**, **reusability**, and **compatibility**, using:

- `getComputedStyle` for style extraction
- `getBoundingClientRect` for size measurement
- A style cache (via `WeakMap`) for performance
- Dynamic event listeners (`resize`, `scroll`, `mutation`) when in `responsive` mode
- Simple shimmer via `skeleton-shimmer` class

---

## 📚 Documentation

📘 Check out the full docs at: [https://smart-skeleton.dev](https://smart-skeleton.dev)

---

## 📦 Installation

Each component in the ELA LABS collection is published independently, allowing you to install only what you need.

To install a specific component, refer to its individual installation guide in the documentation.

📘 Full docs available at: [https://smart-skeleton.dev](https://smart-skeleton.dev)

For example, to install **SmartSkeleton**:

```bash
pnpm install @ela-labs/smart-skeleton

npm install @ela-labs/smart-skeleton
# or
yarn add @ela-labs/smart-skeleton
```
