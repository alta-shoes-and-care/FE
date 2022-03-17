<div id="top"></div>

# SHOES SERVICE STATION - FE3

<!-- PROJECT LOGO -->

<div align="center">
<img src="assets/logo/logo.png" alt="Logo" width="500" height="auto">

## About the Project
Nowadays, some people are very busy and don't even have time to clean their shoes. Therefore we need a platform that is able to connect customers with shoes washing service provider.

  <p align="center">
    PROTOTYPE FIGMA
    <br />
    <div id = "other-software-design"></div>
    -
    <a href="https://www.figma.com/proto/bSG0AWlCKrcXoG98z7lTyN/Shoes-Service-Station?node-id=435%3A385&starting-point-node-id=435%3A385&scaling=scale-down">User</a>
    <br />
    -
    <a href="https://www.figma.com/proto/bSG0AWlCKrcXoG98z7lTyN/Shoes-Service-Station?node-id=435%3A4747&starting-point-node-id=444%3A7083&scaling=scale-down">Admin</a>
  </p>
</div>
<br />

<!-- TABLE OF CONTENTS -->
## Table of Contents
1. [About the Project](#about-the-project)
2. [Table of Contents](#table-of-contents)
3. [Tech Stack](#tech-stack)
    - [Framework](#framework)
    - [Code Standart](#code-standart)
    - [Packages](#packages)
    - [Deployment](#deployment)
    - [Collaboration](#collaboration)
4. [Folder Structure](#code-structure)
5. [Contact](#contact)

<p align="right">(<a href="#top">back to top</a>)</p>


## Tech Stack
### Framework
- [NextJS (ReactJS Framework)](https://nextjs.org/)
- [Tailwind (CSS Framework)](https://tailwindcss.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

### Code Standart
- [Airbnb](https://airbnb.io/javascript/react/)

<p align="right">(<a href="#top">back to top</a>)</p>

### Packages
- [axios](https://www.npmjs.com/package/axios)
- [filepond](https://www.npmjs.com/package/axios)
- [filepond-plugin-file-validate-size](https://www.npmjs.com/package/filepond-plugin-file-validate-size)
- [filepond-plugin-file-validate-type](https://www.npmjs.com/package/filepond-plugin-file-validate-type)
- [filepond-plugin-image-exif-orientation](https://www.npmjs.com/package/filepond-plugin-image-exif-orientation)
- [filepond-plugin-image-preview](https://www.npmjs.com/package/filepond-plugin-image-preview)
- [framer-motion](https://www.npmjs.com/package/framer-motion)
- [moment](https://www.npmjs.com/package/moment)
- [next](https://www.npmjs.com/package/next)
- [react](https://www.npmjs.com/package/react)
- [react-dom](https://www.npmjs.com/package/react-dom)
- [react-filepond](https://www.npmjs.com/package/react-filepond)
- [react-icons](https://www.npmjs.com/package/react-icons)
- [react-iframe](https://www.npmjs.com/package/react-iframe)
- [react-loading](https://www.npmjs.com/package/react-loading)
- [react-number-format](https://www.npmjs.com/package/react-number-format)
- [react-rating-stars-component](https://www.npmjs.com/package/react-react-rating-stars-component)
- [react-redux](https://www.npmjs.com/package/react-redux)
- [react-simple-image-viewer](https://www.npmjs.com/package/react-simple-image-viewer)
- [redux](https://www.npmjs.com/package/redux)
- [redux-thunk](https://www.npmjs.com/package/redux-thunk)
- [sweetalert2](https://www.npmjs.com/package/sweetalert2)
- [swiper](https://www.npmjs.com/package/swiper)

<p align="right">(<a href="#top">back to top</a>)</p>

### Deployment
- [Netlify](https://shoes-service-station.netlify.app/)

<p align="right">(<a href="#top">back to top</a>)</p>

### Collaboration 
- [Trello (Work Management Tool)](https://trello.com/)
- [GitHub (Version Control System Platform)](https://github.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

## Folder Structure

```sh
final-project-shoes-group-2
├─ assets
│  ├─ carousel
│  │  ├─ s6.png
│  │  ├─ s7.png
│  │  └─ s8.png
│  ├─ logo
│  │  ├─ logo.png
│  │  ├─ new icon 1logo.png
│  │  └─ new icon 1logo2x.png
│  ├─ team
│  │  ├─ BE_frans.png
│  │  ├─ BE_yusuf.png
│  │  ├─ FE_adit.png
│  │  ├─ FE_diyah.png
│  │  ├─ FE_yusuf.png
│  │  ├─ QE_adhit.png
│  │  ├─ QE_rendy.png
│  │  └─ QE_zahra.png
│  ├─ admin-bg1.png
│  ├─ admin-bg2.png
│  ├─ endpoint.png
│  ├─ fav.ico
│  ├─ fav.png
│  ├─ form.png
│  ├─ history-bg.png
│  ├─ invoice.png
│  ├─ nav-icon.png
│  ├─ profile.png
│  ├─ shoes.png
│  └─ vvm.png
├─ components
│  ├─ Carousel.jsx
│  ├─ footer.jsx
│  ├─ Gallery.jsx
│  ├─ HeadApp.jsx
│  ├─ layout.jsx
│  ├─ Loading.jsx
│  ├─ navbar.jsx
│  └─ Service.jsx
├─ pages
│  ├─ admin
│  │  ├─ [id].jsx
│  │  ├─ index.jsx
│  │  └─ new-item.jsx
│  ├─ api
│  │  └─ hello.js
│  ├─ endpoint
│  │  └─ [id].jsx
│  ├─ invoice
│  │  └─ [id].jsx
│  ├─ payment
│  │  └─ [id].jsx
│  ├─ review
│  │  └─ [id].jsx
│  ├─ services
│  │  └─ [id].jsx
│  ├─ _app.js
│  ├─ 404.jsx
│  ├─ about-us.jsx
│  ├─ endpoint.jsx
│  ├─ find-us.jsx
│  ├─ form-payment.jsx
│  ├─ history-order.jsx
│  ├─ index.jsx
│  ├─ list-order.jsx
│  ├─ login.jsx
│  └─ signup.jsx
├─ public
│  ├─ favicon.ico
│  └─ vercel.svg
├─ stores
│  ├─ actions
│  │  ├─ getAllService.jsx
│  │  └─ index.jsx
│  └─ reducers
│     ├─ getServiceReducer.jsx
│     └─ index.jsx
├─ styles
│  ├─ about.module.css
│  ├─ admin.module.css
│  ├─ formpayment.module.css
│  ├─ globals.css
│  ├─ History.module.css
│  ├─ Home.module.css
│  ├─ ListOrder.module.css
│  └─ navbar.module.css
├─ .eslintrc.json
├─ .gitignore
├─ next.config.js
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ README.md
└─ tailwind.config.js

```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->
## Contact
* Muhammad Yusuf Untung Wahyudi 
  - [Github](https://github.com/myusufuntung) 
  - [Linked in](https://www.linkedin.com/in/myusufuntung)
* Aditya Fabio Hariawan 
  - [Github](https://github.com/fabioaditya) 
  - [Linked in](https://www.linkedin.com/in/)
* Chalimatus Sa'diyah 
  - [Github](https://github.com/diydiyydiyyy) 
  - [Linked in](https://www.linkedin.com/in/chalimatussadiyah)

<p align="right">(<a href="#top">back to top</a>)</p>
