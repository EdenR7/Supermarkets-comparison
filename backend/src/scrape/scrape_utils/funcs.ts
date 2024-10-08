import { ElementHandle } from "puppeteer";
import {
  CategoryProductI,
  ScrapedProductCategoriesOptions,
  SuperMarketImgsI,
  SuperMarketPricesI,
} from "../scrape_types/scraping.types";
import { ramiLevyScrape } from "../rami_levi/rami_levyScraping";
import { shufersalScrape } from "../shufersal/shufersalScraping";
import { yohananofScrape } from "../yohannanof/yohananofScraping";
import { ProductsCategoriesOptions } from "../../types/products.types";

export function reverseString(str: string) {
  return str.split("").reverse().join("");
}

interface ScrapedProductPriceElementI {
  brandName: string;
  price: number | null | string;
}
interface ScrapedProductI {
  name: string;
  category: ProductsCategoriesOptions;
  img: string;
  prices: ScrapedProductPriceElementI[];
}

export function defineCategory(category: ScrapedProductCategoriesOptions) {
  switch (category) {
    case "MILK_AND_EGGS_CATEGORY":
      return "Milk and Eggs";
    case "FRUITS_AND_VEGETABLES_CATEGORY":
      return "Fruits and Vegetables";
    case "SWEETS_CATEGORY":
      return "Sweets";
    case "DRINKS_CATEGORY":
      return "Drinks";
    case "MEAST_AND_FISH_CATEGORY":
      return "Meat and Fish";
    case "FROZENS_CATEGORY":
      return "Frozens";
    default:
      throw new Error("Category not found");
  }
}

export async function getScrapedProductNameAndPrice(
  itemHandle: ElementHandle<Element>
) {
  const name = await itemHandle.$eval(
    ".text-wrap",
    (el) => el.textContent?.trim() || ""
  );

  const price = await itemHandle.$eval(
    ".sr-only span:first-child",
    (el) => el.textContent?.trim() || "N/A"
  );

  return { name, price };
}

export async function addScrapedProductToCurrentCategory(
  itemHandle: ElementHandle<Element>,
  scrapedProducts: CategoryProductI[],
  nameSelector: string,
  priceSelector: string,
  scrapedImgs?: string[],
  imageSelector?: string
) {
  const name = await itemHandle.$eval(
    nameSelector,
    (el) => el.textContent?.trim() || ""
  );
  const price = await itemHandle.$eval(
    priceSelector,
    (el) => el.textContent?.trim() || "N/A"
  );
  if (imageSelector && scrapedImgs) {
    const imgUrl = await itemHandle.$eval(
      imageSelector,
      (el) => el.getAttribute("src") || "N/A"
    );
    console.log(imgUrl);
    scrapedImgs.push(imgUrl);
  }
  console.log(name + " : " + price);

  if (name && price) {
    scrapedProducts.push({ name, price });
  } else if (name && !price) {
    scrapedProducts.push({ name, price: null });
  }
}

export function adjustDataByIndex(
  data1: SuperMarketPricesI,
  data2: SuperMarketPricesI,
  data3: SuperMarketPricesI,
  imgs: SuperMarketImgsI
) {
  const adjustedData: ScrapedProductI[] = [];
  for (const key in data1) {
    const categoryKey = key as ScrapedProductCategoriesOptions;
    for (let i = 0; i < data1[categoryKey].length; i++) {
      const adjustedProduct: ScrapedProductI = {
        name: data1[categoryKey][i].name,
        img: imgs[categoryKey][i],
        category: defineCategory(categoryKey),
        prices: [
          {
            brandName: "Shufersal",
            price: data1[categoryKey][i]?.price || -1,
          },
          {
            brandName: "Yohananof",
            price: data2[categoryKey][i]?.price || -1,
          },
          {
            brandName: "Rami Levy",
            price: data3[categoryKey][i]?.price || -1,
          },
        ],
      };
      adjustedData.push(adjustedProduct);
    }
  }
  return adjustedData;
}
export async function writeOrderReq() {
  try {
    const yohananofData = await yohananofScrape();
    const { shufersalPrices: shufersalData, shufersalImgs } =
      await shufersalScrape();
    const ramiLevyData = await ramiLevyScrape();
    console.log(
      "Please translate all the hebrew to english and convert all the sub prices to numbers (omit symbols or chars if needed, if null then insert -1). Also I want you to add one line description key for each "
    );
    console.dir(
      adjustDataByIndex(
        shufersalData,
        yohananofData,
        ramiLevyData,
        shufersalImgs
      ),
      {
        depth: null,
      }
    );
  } catch (error) {
    console.log(error);
  }
}
