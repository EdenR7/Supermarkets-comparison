import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Libraries, useJsApiLoader } from "@react-google-maps/api";
import { ExternalLink } from "lucide-react";
// import { Button } from "../ui/button";

interface CartItem {
  productName: string;
  quantity: number;
  productPrices: Array<{
    brandName: string;
    price: number;
  }>;
}

interface Supermarket {
  supermarketImage: string;
  name: string;
  totalPrice: number;
  nearestLocation: string;
  onlineLink: string;
}

interface SupermarketCardProps {
  supermarket: Supermarket;
  cartItems: CartItem[];
  getCheapestPrice: (itemName: string) => number;
  onViewLocations: (locations: google.maps.LatLng[]) => void;
}

const libraries: Libraries = ["places"];
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const SupermarketCard: React.FC<SupermarketCardProps> = ({
  supermarket,
  cartItems,
  getCheapestPrice,
  onViewLocations,
}) => {
  const [nearestLocation, setNearestLocation] = useState<string | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey as string,
    libraries,
  });

  const fetchLocations = () => {
    if (navigator.geolocation && isLoaded) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const service = new google.maps.places.PlacesService(
            document.createElement("div")
          );
          const request = {
            location: new google.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            ),
            radius: 10000,
            keyword: supermarket.name,
          };

          service.nearbySearch(request, (results, status) => {
            if (
              status === google.maps.places.PlacesServiceStatus.OK &&
              results &&
              results?.length! > 0
            ) {
              setNearestLocation(results[0].vicinity || "No vicinity avaiable");
              const locations = results.map(
                (result) => result.geometry?.location!
              );
              onViewLocations(locations); // Pass the locations to the parent component
            } else {
              setNearestLocation("No nearby locations found");
              onViewLocations([]); // No locations found
            }
          });
        },
        (error) => {
          console.error("Error fetching user location:", error);
          setNearestLocation("Unable to fetch location");
          onViewLocations([]); // Error fetching locations
        }
      );
    }
  };

  return (
    <Card className="w-full p-6 rounded-lg shadow-lg text-center">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold mb-4 flex items-center justify-between gap-2">
          <div>{supermarket.name}</div>
          <img
            src={supermarket.supermarketImage}
            alt={`${supermarket.name} logo`}
            className="h-14 w-14 object-contain"
          />
        </CardTitle>
      </CardHeader>
      <CardContent
        className="max-h-64 overflow-y-auto"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#888 #f1f1f1",
        }}
      >
        <style>
          {`
            .max-h-64::-webkit-scrollbar {
              width: 6px;
            }
            .max-h-64::-webkit-scrollbar-track {
              background: #f1f1f1;
              border-radius: 10px;
            }
            .max-h-64::-webkit-scrollbar-thumb {
              background-color: #007bff;
              border-radius: 10px;
            }
            .max-h-64::-webkit-scrollbar-thumb:hover {
              background-color: #0056b3;
            }
          `}
        </style>
        <ul className="text-left mb-4 space-y-2">
          {cartItems.map((item, idx) => {
            const priceObject = item.productPrices.find(
              (price) => price.brandName === supermarket.name
            );
            const itemPrice = priceObject ? priceObject.price : 0;
            const isCheapest = itemPrice === getCheapestPrice(item.productName);

            return (
              <React.Fragment key={idx}>
                <li
                  className={`py-2 flex justify-between items-center ${
                    isCheapest ? "text-green-500 " : "text-gray-500-500"
                  }`}
                >
                  <div>
                    {item.productName}: ₪{itemPrice.toFixed(2)}
                  </div>
                  <div>x{item.quantity}</div>
                </li>
                {idx < cartItems.length - 1 && <Separator />}
              </React.Fragment>
            );
          })}
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-2">
        <p className="text-lg font-bold py-2">
          Total: ₪{supermarket.totalPrice.toFixed(2)}
        </p>
        <Button asChild>
          <a
            href={supermarket.onlineLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-between items-start gap-2 mb-4"
          >
            <span>Go Online</span> <span>{<ExternalLink />}</span>
          </a>
        </Button>
        <p>
          Nearest Location:{" "}
          {nearestLocation ? nearestLocation : supermarket.nearestLocation}
        </p>
        <p>
          Or view more supermarket{" "}
          <span
            onClick={fetchLocations} // Fetch the locations when clicked
            className="text-blue-600 underline cursor-pointer"
          >
            locations
          </span>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SupermarketCard;
