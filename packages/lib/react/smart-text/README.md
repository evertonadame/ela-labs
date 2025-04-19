<h1 align="center">✨ ELA LABS - SMART TEXT ✨</h1>

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

### 🥡 `SmartText`

The `SmartText` is a smart text component that adapts to the real DOM structure and content overflow.

It’s designed to balance **performance**, **reusability**, and **compatibility**, using:

- It’s designed to balance performance, reusability, and compatibility, using:

- `ResizeObserver` for detecting content size changes

- `scrollHeight` vs clientHeight to detect overflow

- `Efficient` line clamping with -webkit-line-clamp

- `Expandable` behavior via expandable, readMoreLabel, and readLessLabel props

- `Conditional` rendering of the expand/collapse button

- `Customizable` button placement (outside-top, outside-bottom)

- Full control with custom expandableButton (supports render prop pattern)

- Clean and customizable with className and childrenClassName props

---

## 📚 Documentation

📘 Check out the full docs at: [https://ela-labs-react.vercel.app/react/smart-text](https://ela-labs-react.vercel.app/react/smart-text)

---

## 📦 Installation

Each component in the ELA LABS collection is published independently, allowing you to install only what you need.

To install a specific component, refer to its individual installation guide in the documentation.

📘 Full docs available at: [https://ela-labs-react.vercel.app/react/smart-text](https://ela-labs-react.vercel.app/react/smart-text)

For example, to install **SmartText**:

```bash
pnpm install @ela-labs/smart-text

npm install @ela-labs/smart-text
# or
yarn add @ela-labs/smart-text
```
