# Experiment 10
## Use Experiment 8 for pwa project and use a deploy link.(netlify drop is used to deploy)
https://golden-fudge-017a6e.netlify.app/
## Aim
To deploy a Mini E-Commerce Progressive Web Application (PWA) on an SSL-enabled static hosting platform and make it accessible over the internet.

---

## Software Required
- GitHub / Netlify / Firebase account  
- Google Chrome Browser  
- VS Code / Android Studio  
- Git and Node.js (optional for CLI deployment)  
- HTML, CSS, JavaScript (PWA project)  

---

## Theory
Deployment is the process of making a web application available on the internet. Static hosting platforms like GitHub Pages, Netlify, and Firebase Hosting allow developers to host web applications using only HTML, CSS, and JavaScript files.

For Progressive Web Applications (PWAs), deployment must be done over HTTPS (SSL) because features like Service Workers, offline caching, and installation only work in secure environments.

These platforms automatically provide free SSL certificates, making the application secure and accessible through a public URL. Once deployed, the PWA can:
- Be accessed online  
- Be installed on devices  
- Work offline using cached resources  

---

## Questions & Answers

### Q1. What is deployment in web applications?
Deployment is the process of uploading and hosting a web application on a server so that it can be accessed by users over the internet using a URL.

---

### Q2. What is static hosting?
Static hosting is a type of web hosting where only static files like HTML, CSS, and JavaScript are stored and served to users without any server-side processing.

---

### Q3. Why is HTTPS required for PWAs?
HTTPS is required for PWAs because:
- It provides secure communication  
- Service Workers work only on HTTPS  
- Enables offline caching and installation features  

---

### Q4. Name any three platforms used for deploying PWAs.
- GitHub Pages  
- Netlify  
- Firebase Hosting  

---

### Q5. What is the role of Service Worker after deployment?
Service Worker:
- Caches important files  
- Enables offline functionality  
- Improves performance by loading cached data  
- Handles background tasks  

---

### Q6. What are the advantages of deploying a PWA online?
- Accessible from anywhere  
- Installable like a mobile app  
- Works offline  
- Faster loading using caching  
- No need to install from app store  

---

## Practical Task

### Q7. To deploy a Mini E-Commerce PWA and observe its behavior.

### Steps Performed:
1. Prepared the complete PWA project folder including:
   - index.html  
   - style.css  
   - app.js  
   - manifest.json  
   - service-worker.js  

2. Selected hosting platform: GitHub Pages / Netlify / Firebase

3. Uploaded project files to the platform.

4. Generated HTTPS URL after deployment.

5. Verified application behavior:
   - Application loaded successfully online  
   - HTTPS secure padlock was visible in browser  
   - "Install App" option was available  
   - Application worked offline after first load  

6. Performed Lighthouse analysis in Google Chrome.

7. Verified:
   - Manifest file detected  
   - Service Worker registered successfully  

---

## Observations
- The PWA was successfully deployed using HTTPS.  
- Offline functionality worked due to Service Worker caching.  
- The app showed install prompt on supported devices.  
- Lighthouse score indicated good performance and PWA compliance.  

---

## Result
The Mini E-Commerce PWA was successfully deployed on an SSL-enabled static hosting platform and tested for online access, installation, and offline functionality.

---

## Screenshots (SS)
- SS1: Deployment process  
- SS2: HTTPS URL with secure padlock  
- SS3: Install prompt  
- SS4: Offline working  
- SS5: Lighthouse report  

---

## Live URL
(Add your deployed project link here)
