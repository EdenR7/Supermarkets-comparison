import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";

function AboutPage() {
  return (
    <main className="bg-background py-8 px-6">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-secondary">
          About Our Product
        </h1>
        <p className="text-lg leading-relaxed mb-8 ">
          Welcome to our supermarket shopping comparison app! Our product is
          designed to make your grocery shopping experience more efficient and
          budget-friendly by allowing you to compare prices across multiple
          supermarkets. Add products to your cart, view the best prices, and
          even find the nearest locations or shop online. Our app helps you save
          time and money while ensuring you get the best deals.
        </p>
        <p className="text-lg leading-relaxed mb-8 ">
          Our mission is to empower shoppers with the information they need to
          make smarter purchasing decisions. Whether you're shopping for weekly
          groceries or looking for the best prices on specific items, our app
          has you covered. Join us in transforming the way you shop!
        </p>

        <div className="flex gap-4 my-8">
          <Button asChild>
            <Link to="team">Our Team</Link>
          </Button>
          <Button asChild>
            <Link to="vision">Our Vision</Link>
          </Button>
        </div>
      </div>
      <Outlet />
    </main>
  );
}

export default AboutPage;
