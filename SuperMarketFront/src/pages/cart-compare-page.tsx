import React, { useState, useEffect } from "react";
import SupermarketCard from "../components/general/supermarket-card";
import { useAuth } from "@/providers/auth-provider";
import SaveCartDialog from "../components/general/compare-alert-dialog";
import yohananofImage from "../images/yohananof.png";
import shufersalImage from "../images/shufersal.png";
import ramiLevyImage from "../images/ramiLevy.png";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import useGeoLocation from "@/hooks/useGeoLocation";

interface CartItem {
  productName: string;
  quantity: number;
  productPrices: Array<{
    brandName: string;
    price: number;
  }>;
}

interface Supermarket {
  name: string;
  totalPrice: number;
  nearestLocation: string;
  onlineLink: string;
  supermarketImage: string;
}

const CartPage: React.FC = () => {
  // const { loaded, position, error } = useGeoLocation();

  const [showComparison, setShowComparison] = useState(false);
  const [supermarketLocations, setSupermarketLocations] = useState<
    google.maps.LatLng[]
  >([]);
  const [selectedLocation, setSelectedLocation] =
    useState<google.maps.LatLng | null>(null);
  const { loggedInUser } = useAuth();
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error("Error fetching user location:", error),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  // Map the user's current cart items
  const cartItems: CartItem[] =
    loggedInUser?.currentCart.map((item: any) => ({
      productName: item.productName,
      quantity: item.quantity,
      productPrices: item.productPrices || [],
    })) || [];

  const supermarkets: Supermarket[] = [
    {
      name: "Rami Levy",
      totalPrice: 0,
      nearestLocation: "",
      onlineLink: "https://www.rami-levy.co.il/he/online/market",
      supermarketImage: ramiLevyImage,
    },
    {
      name: "Yohananof",
      totalPrice: 0,
      nearestLocation: "",
      onlineLink: "https://yochananof.co.il/",
      supermarketImage: yohananofImage,
    },
    {
      name: "Shufersal",
      totalPrice: 0,
      nearestLocation: "",
      onlineLink: "https://www.shufersal.co.il/online/he/S",
      supermarketImage: shufersalImage,
    },
  ];

  // Calculate total price for each supermarket
  supermarkets.forEach((supermarket) => {
    supermarket.totalPrice = cartItems.reduce((total, item) => {
      const priceObject = item.productPrices.find(
        (price) => price.brandName === supermarket.name
      );
      const itemPrice = priceObject ? priceObject.price : 0;

      return total + itemPrice * item.quantity;
    }, 0);
  });

  const getCheapestPrice = (itemName: string): number => {
    const prices = cartItems
      .filter((item) => item.productName === itemName)
      .flatMap((item) => item.productPrices.map((price) => price.price));
    return Math.min(...prices);
  };

  const triggerComparison = () => {
    setShowComparison(true);
  };

  const handleViewLocations = (locations: google.maps.LatLng[]) => {
    console.log(locations);

    setSupermarketLocations(locations);
  };

  return (
    <div className="flex flex-col items-center text-center p-8">
      <h1 className="text-4xl font-bold mb-6">My Cart</h1>
      <div className="w-full max-w-5xl">
        <ul className="mb-8">
          {cartItems.map((item, index) => (
            <li
              key={index}
              className="flex justify-between py-4 border-b border-gray-200"
            >
              <div>{item.productName}</div>
              <div>x {item.quantity}</div>
            </li>
          ))}
        </ul>
        <div className="flex justify-center gap-4">
          <SaveCartDialog
            cartItems={loggedInUser?.currentCart!}
            triggerComparison={triggerComparison}
          />
        </div>
        {showComparison && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {supermarkets.map((supermarket, index) => (
              <SupermarketCard
                key={index}
                supermarket={supermarket}
                cartItems={cartItems}
                getCheapestPrice={getCheapestPrice}
                onViewLocations={handleViewLocations}
              />
            ))}
          </div>
        )}

        {supermarketLocations.length > 0 && userLocation && (
          <>
            {loaded && <div>Loading...</div>}
            <div className="mt-12">
              <GoogleMap
                center={userLocation}
                zoom={12}
                mapContainerStyle={{ width: "100%", height: "500px" }}
              >
                <Marker position={userLocation} label="You are here" />
                {supermarketLocations.map((location, index) => (
                  <Marker
                    key={index}
                    position={{ lat: location.lat(), lng: location.lng() }}
                    onClick={() => setSelectedLocation(location)}
                  />
                ))}

                {selectedLocation && (
                  <InfoWindow
                    position={{
                      lat: selectedLocation.lat(),
                      lng: selectedLocation.lng(),
                    }}
                    onCloseClick={() => setSelectedLocation(null)}
                  >
                    <div>
                      <h2>Supermarket Details</h2>
                      <p>More details about this location...</p>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
