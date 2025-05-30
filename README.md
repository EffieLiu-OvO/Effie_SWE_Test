# Simple Card List Application

A full-stack web application that displays a list of products in card format with delete functionality. Built with React, Material UI, Node.js, and Express.js.



## Project Overview

This project demonstrates a simple product management system where users can:

- View product cards with images, names, descriptions, and prices
- Delete products individually with confirmation dialog
- Restore all products when the list is empty
- Responsive design that works on all device sizes



### Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <https://github.com/EffieLiu-OvO/Effie_SWE_Test>
   cd swe-interview-test
   ```

2. **Start the Backend Server**

   ```bash
   cd StarterCode/backend
   npm install
   npm run dev
   ```

   The backend will start on `http://localhost:5000`

3. **Start the Frontend Application** (in a new terminal)

   ```bash
   cd StarterCode/frontend
   npm install
   npm start
   ```

   The frontend will start on `http://localhost:3000`

4. **Open your browser** Navigate to `http://localhost:3000` to view the application



## How to Use

1. **View Products**: The homepage displays all available products in a card layout

2. Delete a Product

   :

   - Click the red delete (🗑️) button on any product card
   - Confirm deletion in the popup dialog
   - The product will be immediately removed

3. Restore Products

   :

   - When all products are deleted, you'll see an empty state message
   - Click "Restore All Products" button to bring back all 6 products
   - Alternatively, restart the backend server to reset the data

