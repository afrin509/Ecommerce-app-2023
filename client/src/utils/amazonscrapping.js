// import axios from "axios";
// import cheerio from "cheerio";
// export async function scrapeAndStoreProduct(url) {
//    return ;
// }
// export async function scrapeAndStoreProduct(url) {
//   if (!url) return;

//   // BrightData proxy configuration
//   const username = String(process.env.BRIGHT_DATA_USERNAME);
//   const password = String(process.env.BRIGHT_DATA_PASSWORD);
//   const port = 22225;
//   const session_id = (1000000 * Math.random()) | 0;

//   const options = {
//     auth: {
//       username: `${username}-session-${session_id}`,
//       password,
//     },
//     host: "brd.superproxy.io",
//     port,
//     rejectUnauthorized: false,
//   };

//   try {
//     // Fetch the product page
//     const response = await axios.get(url, options);
//     const $ = cheerio.load(response.data);

//     // Extract the product title
//     const title = $("#productTitle").text().trim();
//     // const currentPrice = extractPrice(
//     //   $(".priceToPay span.a-price-whole"),
//     //   $(".a.size.base.a-color-price"),
//     //   $(".a-button-selected .a-color-base")
//     // );

//     // const originalPrice = extractPrice(
//     //   $("#priceblock_ourprice"),
//     //   $(".a-price.a-text-price span.a-offscreen"),
//     //   $("#listPrice"),
//     //   $("#priceblock_dealprice"),
//     //   $(".a-size-base.a-color-price")
//     // );

//     const outOfStock =
//       $("#availability span").text().trim().toLowerCase() ===
//       "currently unavailable";

//     const images =
//       $("#imgBlkFront").attr("data-a-dynamic-image") ||
//       $("#landingImage").attr("data-a-dynamic-image") ||
//       "{}";

//     const imageUrls = Object.keys(JSON.parse(images));

//     // const currency = extractCurrency($(".a-price-symbol"));
//     // const discountRate = $(".savingsPercentage").text().replace(/[-%]/g, "");

//     // const description = extractDescription($);

//     // Construct data object with scraped information
//     const data = {
//       url,
//     //   currency: currency || "$",
//       image: imageUrls[0],
//       title,
//     //   currentPrice: Number(currentPrice) || Number(originalPrice),
//     //   originalPrice: Number(originalPrice) || Number(currentPrice),
//       priceHistory: [],
//     //   discountRate: Number(discountRate),
//       category: "category",
//       reviewsCount: 100,
//       stars: 4.5,
//     //   isOutOfStock: outOfStock,
//     //   description,
//     //   lowestPrice: Number(currentPrice) || Number(originalPrice),
//     //   highestPrice: Number(originalPrice) || Number(currentPrice),
//     //   averagePrice: Number(currentPrice) || Number(originalPrice),
//     };
//     console.log("data in scrapeAmazonProduct controller", data);

//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// // export function extractPrice(...elements: any) {
// //   for (const element of elements) {
// //     const priceText = element.text().trim();

// //     if(priceText) {
// //       const cleanPrice = priceText.replace(/[^\d.]/g, '');

// //       let firstPrice; 

// //       if (cleanPrice) {
// //         firstPrice = cleanPrice.match(/\d+\.\d{2}/)?.[0];
// //       } 

// //       return firstPrice || cleanPrice;
// //     }
// //   }

// //   return '';
// // }

// // Extracts and returns the currency symbol from an element.
// // export function extractCurrency(element: any) {
// //   const currencyText = element.text().trim().slice(0, 1);
// //   return currencyText ? currencyText : "";
// // }

// // Extracts description from two possible elements from amazon
// // export function extractDescription($: any) {
// //   // these are possible elements holding description of the product
// //   const selectors = [
// //     ".a-unordered-list .a-list-item",
// //     ".a-expander-content p",
// //     // Add more selectors here if needed
// //   ];

// //   for (const selector of selectors) {
// //     const elements = $(selector);
// //     if (elements.length > 0) {
// //       const textContent = elements
// //         .map((_: any, element: any) => $(element).text().trim())
// //         .get()
// //         .join("\n");
// //       return textContent;
// //     }
// //   }

// //   // If no matching elements were found, return an empty string
// //   return "";
// // }

// // export function getHighestPrice(priceList: PriceHistoryItem[]) {
// //   let highestPrice = priceList[0];

// //   for (let i = 0; i < priceList.length; i++) {
// //     if (priceList[i].price > highestPrice.price) {
// //       highestPrice = priceList[i];
// //     }
// //   }

// //   return highestPrice.price;
// // }

// // export function getLowestPrice(priceList: PriceHistoryItem[]) {
// //   let lowestPrice = priceList[0];

// //   for (let i = 0; i < priceList.length; i++) {
// //     if (priceList[i].price < lowestPrice.price) {
// //       lowestPrice = priceList[i];
// //     }
// //   }

// //   return lowestPrice.price;
// // }

// // export function getAveragePrice(priceList) {
// //   const sumOfPrices = priceList.reduce((acc, curr) => acc + curr.price, 0);
// //   const averagePrice = sumOfPrices / priceList.length || 0;

// //   return averagePrice;
// // }

// // export const getEmailNotifType = (
// //   scrapedProduct: Product,
// //   currentProduct: Product
// // ) => {
// //   const lowestPrice = getLowestPrice(currentProduct.priceHistory);

// //   if (scrapedProduct.currentPrice < lowestPrice) {
// //     return Notification.LOWEST_PRICE as keyof typeof Notification;
// //   }
// //   if (!scrapedProduct.isOutOfStock && currentProduct.isOutOfStock) {
// //     return Notification.CHANGE_OF_STOCK as keyof typeof Notification;
// //   }
// //   if (scrapedProduct.discountRate >= THRESHOLD_PERCENTAGE) {
// //     return Notification.THRESHOLD_MET as keyof typeof Notification;
// //   }

// //   return null;
// // };

// export const formatNumber = (num = 0) => {
//   return num.toLocaleString(undefined, {
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 0,
//   });
// };
