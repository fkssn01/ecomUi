# The Luxe Closet 🛍️

**A high-end, lightweight e-commerce PWA built for small business owners.**

---

## 🌟 Project Overview
The Luxe Closet is a modern digital storefront designed to bridge the gap between technical web solutions and non-technical business management. By leveraging **Google Sheets as a headless CMS**, it allows owners to manage their entire inventory from a mobile spreadsheet without ever touching the source code.

## 🛠️ Key Features
* **Google Sheets Integration**: Uses the "CSV Hack" with **PapaParse** for a completely free, real-time database.
* **PWA (Progressive Web App)**: Installable on Android/iOS with offline support via Service Workers and a Manifest file.
* **"Luxe" UI/UX**: Built with a mobile-first approach, featuring smooth loading animations powered by **Anime.js**.
* **Dynamic Inventory**: Automatically renders product cards, pricing, and availability based on spreadsheet data.

## 🚀 Technical Stack
* **Frontend**: HTML5, CSS3 (Modern Flex/Grid), JavaScript (ES6+)
* **Data Parsing**: [PapaParse](https://www.papaparse.com/)
* **Animation**: [Anime.js](https://animejs.com/)
* **Deployment**: [Vercel](https://vercel.com/)



## 📂 How it Works
1.  **Inventory Management**: The owner adds or deletes items in a Google Sheet.
2.  **Data Fetching**: The app fetches the "Published to Web" CSV link from Google.
3.  **Parsing**: PapaParse converts the CSV text into a JSON object array.
4.  **Rendering**: JavaScript maps through the array to generate high-end product cards dynamically.

## 🔧 Installation & Setup
1.  **Clone the repository**:
    ```bash
    git clone [https://github.com/fkssn01/luxe-closet.git](https://github.com/fkssn01/luxe-closet.git)
    ```
2.  **Open locally**: Simply open `index.html` in your browser.
3.  **Customization**: To use your own data, replace the `CSV_URL` in `js/product.js` with your own Google Sheet CSV link.

---

### Why this belongs in my Portfolio
This project demonstrates my ability to solve real-world problems (high database costs) with creative technical solutions (CSV parsing). It showcases full-stack thinking—handling data management, performance optimization, and professional deployment.

---
Created by Temilade Oshinfisan- Aspiring Web Developer & Data Enthusiast.
