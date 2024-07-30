# GreenNest Nursery - React + TypeScript + Vite + Redux + Ant Design + Tailwind

Welcome to the GreenNest Nursery project! This repository contains the frontend code for our nursery's online platform, built using React, TypeScript, and Vite. The application provides a seamless experience for managing and purchasing nursery products, viewing product details, and handling cart and checkout functionalities.

## 🚀 Getting Started

To get started with the project, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) package manager

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/GreenNest_Nursery_Client.git
    cd GreenNest_Nursery_Client
    ```

2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3. Start the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

4. Open your browser and navigate to `http://localhost:5173` to see the application in action.

## 📂 Project Structure

The project is structured as follows:

- `src/`: Contains all the source code for the application.
  - `components/`: Reusable React components.
  - `pages/`: Page components for different routes.
  - `redux/`: Redux store and slices for state management.
  - `types/`: TypeScript interfaces and types.
  - `utils/`: Utility functions and helpers.
- `public/`: Static assets like images and fonts.
- `vite.config.ts`: Configuration file for Vite.

## 🌟 Features

- **Product Management**: Add, edit, and delete nursery products.
- **Category Management**: Manage product categories for better organization.
- **Product Details**: View detailed information about each product.
- **Cart Management**: Add products to the cart, update quantities, and view the total price.
- **Checkout Process**: Complete purchases with a streamlined checkout process.

## 🔧 Configuration

### Vite Configuration

Vite is used for development and build processes. The default configuration is set up in `vite.config.ts`. For more details, refer to the [Vite documentation](https://vitejs.dev/).

### ESLint Configuration

To ensure code quality and consistency, ESLint is configured with TypeScript support. To expand and customize the ESLint configuration, follow these steps:

1. Configure the top-level `parserOptions` in `.eslintrc.js`:
    ```js
    export default {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir: __dirname,
      },
      // other rules...
    }
    ```

2. Update ESLint rules:
    - Replace `plugin:@typescript-eslint/recommended` with `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`.
    - Optionally, add `plugin:@typescript-eslint/stylistic-type-checked`.

3. Install `eslint-plugin-react` and add the following to the `extends` list:
    ```json
    "extends": [
      "plugin:react/recommended",
      "plugin:react/jsx-runtime"
    ]
    ```

## 🌐 Deployment

To deploy the application, use Vercel. Ensure that the `vercel.json` file is correctly configured for your deployment. For more details, refer to the [Vercel documentation](https://vercel.com/docs).