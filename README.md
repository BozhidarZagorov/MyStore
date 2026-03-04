# C4-Task
A task from C4 Nexus

## This project is not deployed. Follow installation instructions to run this project.

## ⚙️ Installation

1. Clone the repository
2. Install dependencies - npm install
3. Start development server - npm run dev


## 🛍️ E-Commerce Store

A modern product listing and shopping experience built with React and Firebase.

Users can:
- Browse products by category
- Filter by color and price range
- Sort products
- Add or remove (single, multiple or all) items to cart

## 📋 Features

- Product category filtering
- Multi-color selection filtering
- Price range slider
- Discount filter
- Sort (A-Z, Z-A, Price)
- Load more pagination
- Custom mobile filter drawer
- Cart system using Context
- Responsive design

# Summary
## What Has Been Implemented

The project is a responsive e-commerce web application built using React. 
It includes the following features:
- Product listing page with category filtering (Watches, Bags, Shoes)
- filter tags for better UX

Dynamic product filtering by:
- Color (interactive swatches)
- Price range (dual range slider)
- Discounted items checkbox

Sorting functionality (Alphabetical, Price low–high, high–low, featured)

Responsive design for desktop and mobile
Mobile slide-in navigation drawer with swipe-to-close gesture

Shopping cart functionality:
Add to cart
Remove item completely
Increase/decrease quantity individually
Dynamic cart item count
Custom toast notification system (replacing browser alert)
Load more pagination behavior
Clean UI/UX with modern styling and interactive components

as well as everything that was in (Required Sections and Functionalities) such as:

The application supports both desktop and mobile layouts with specific UI adaptations for smaller screens.

2️⃣ Technologies Used
Core Technologies

React
React Router
Vite

React Hooks
Context
CSS

3️⃣ How the Solution Was Achieved
Architecture

The application follows a modular structure:

Pages (e.g., Home / Product Listing)
Reusable Components (ProductCard, Header, Footer, etc.)
Context (CartContext for global cart state)
Utility logic (sorting, filtering functions)

Product Filtering

Filtering was implemented using useMemo to optimize performance.
Products are filtered based on:
Selected colors
Selected price range (min–max slider)
Discounted checkbox logic

The price slider ensures:

The minimum price cannot exceed the maximum
The maximum cannot go below the minimum

This was achieved by clamping values inside the onChange handlers.

Sorting

Sorting is handled via a dedicated utility function that clones and sorts the array based on the selected sort option.
Cart Logic
Cart functionality was implemented using React Context API to maintain global state.

Features include:

Adding items
Removing items completely
Removing items one by one (decreasing quantity)
Automatically removing item when quantity reaches zero
State updates use immutable operations (map, filter) to ensure React state integrity.
Mobile Navigation & UX

A mobile drawer menu was implemented with:

CSS transform animations
Touch event listeners (onTouchStart, onTouchMove, onTouchEnd)
Swipe-to-close behavior that follows the user's finger
Smooth transition snapping

This enhances the mobile user experience and mimics native app behavior.

Custom Toast Notification

Instead of using alert(), a custom Toast Context was created:

Global toast provider
Auto-dismiss behavior
Animated appearance
Reusable across the app

This improves UI quality and user experience.

4️⃣ Challenges Encountered
1. Dual Price Slider Logic

Ensuring the maximum slider could not move below the minimum required careful value clamping logic. Without constraints, sliders could overlap and break filtering logic.

Solution:
Mathematical checks using Math.min and Math.max inside event handlers.

2. Responsive Layout Issues

Some desktop styling (fixed widths) caused misalignment on mobile. Components such as product cards and swatches required specific mobile overrides using media queries.

Solution:
Override widths and alignment using CSS Grid and centered layouts under certain breakpoints.

3. Swipe Gesture Implementation

Implementing a drawer that follows the finger required handling raw touch events and calculating movement deltas.

Challenges included:

Preventing unwanted direction swipes
Smooth snapping behavior
Managing transition timing

Solution:
Using useRef to track touch positions and dynamically updating CSS transform values.

4. State Management Cleanliness

Cart operations needed to be immutable and safe, especially when decreasing quantities.

Solution:
Used controlled updates via map() and filter() inside functional state updates.

Conclusion

The project demonstrates:

Strong understanding of React fundamentals
Effective state management with Context API
Performance optimization using useMemo
Responsive UI design
Mobile-first interaction improvements
Clean and scalable component architecture

The final result is a fully functional, responsive e-commerce interface with modern UX patterns.