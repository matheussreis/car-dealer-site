# Car Dealer Website

This project is a simple website for small car dealerships. The goal is to offer a clean design with minimal functionality, allowing anyone looking for a car to view pictures and contact the dealer if they're interested.

## Table of Contents

- [Project Overview](#project-overview)
- [Getting Started](#getting-started)
  - [Adding Data](#adding-data)
  - [Adding Images](#adding-images)
  - [Running the Project](#running-the-project)

## Project Overview

As the main focus is simplicity, no database is used. Instead, all the data is stored in a JSON file located at `/data.json`. Similarly, all the images are located in `/public/images`. When setting up the project, new images should be downloaded, and the paths in the JSON file should be updated accordingly. The website supports multiple languages, currently Portuguese and English, with the ability to easily add more.

The website is built using Next.js 14 and incorporates the next-intl library for localization. The layout and design are primarily created with Vercel's v0, a generative user interface system powered by AI, which generates React code based on shadcn/ui and Tailwind CSS.

## Getting Started

### Adding Data

Whenever the application fetches the vehicles, it checks whether the `/data.json` file exists, and it creates a new file when no file is found (the new file contains an empty array). To add data to the website, you will need to populate the `/data.json` file. Each vehicle in the array should follow a similar structure to the one below:

```json
{
  "id": "d2f7e9c4-8e47-45bc-8354-d7c2f4b9a9a5",
  "dateEntered": "2024-08-15",
  "name": "BMW 3 Series",
  "description": "Sporty and luxurious sedan",
  "cover": "/images/bmw_3_series.jpg",
  "specs": {
    "horsePower": 184,
    "mileage": 65000,
    "price": 25000,
    "fuelType": "gasoline",
    "bodyType": "sedan",
    "engine": "2.0",
    "gearbox": "manual",
    "seats": 5,
    "doors": 4,
    "brand": "bmw",
    "origin": "imported",
    "drivetrain": "rwd",
    "year": 2018,
    "color": "blue",
    "wheelSize": 18,
    "previousOwners": 1,
    "co2Emissions": 145,
    "warranty": 1
  },
  "images": [
    "/images/bmw_3_series_1.jpg",
    "/images/bmw_3_series_2.jpg",
    "/images/bmw_3_series_3.jpg",
    "/images/bmw_3_series_4.jpg"
  ]
}
```

**_NOTE:_** Some of the string values in the `specs` field correspond to predefined dropdown options. It's important to use the correct keys to ensure the data displays correctly. You can find the full list of valid dropdown options in the `getDropdownOptions` function located in the [filters.ts](./src/lib/filters.ts) file.

After adding the necessary vehicle data, don't forget to also set up the images as described in the next section.

### Adding Images

In `/data.json`, there are two properties with image paths: `cover` and `images`. The `cover` is the image used for the list items on the vehicles page, while the `images` array contains the images for the carousel on the vehicle details page.

To update the image paths:

1. Create an `images` folder in the `public` directory.
2. Add new images to this folder.
3. Once you have all the necessary images, update the `/data.json` file by replacing the values of `cover` and `images` with the paths to your images.

**_NOTE:_** The project can be started without images, as there is a custom image component that displays a fallback image if the ones set in a vehicle record are missing or invalid.

### Running the Project

To start the project, first install all the dependencies with the following command:

```bash
npm i
```

Then, run the following command to start the development server:

```bash
npm run dev
```

Once the server is running, open your browser and go to [http://localhost:3000](http://localhost:3000) to view the website.
