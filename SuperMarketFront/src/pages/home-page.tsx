import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  ArrowUpRight,
  Candy,
  GlassWater,
  Ham,
  Milk,
  Salad,
  Snowflake,
} from "lucide-react";
import { useAuth } from "@/providers/auth-provider";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const categories = [
  {
    Icon: (
      <span>
        <Milk size={40} color="#16b0fe" strokeWidth={2} />
      </span>
    ),
    text: "Milk and Eggs",
    description:
      "The best dairy products, only from free, happy and healthy cows. Our eggs come from kosher chickens who put tfilin every morning.",
  },
  {
    Icon: (
      <span>
        <Salad size={40} color="#16b0fe" strokeWidth={2} />
      </span>
    ),
    text: "Fruits and Vegetables",
    description:
      "The fruits and vegetables we display are of the highest quality, after they have been carefully examined",
  },
  {
    Icon: (
      <span>
        <Candy size={40} color="#16b0fe" strokeWidth={2} />
      </span>
    ),
    text: "Sweets",
    description:
      "The candies we Display are the best candies you can't get. Once you try them you may never go back to your boring life",
  },
  {
    Icon: (
      <span>
        <GlassWater size={40} color="#16b0fe" strokeWidth={2} />
      </span>
    ),
    text: "Drinks",
    description:
      "Our drinks quench your thirst so well, legends say when the Israelites walked through the desert for 40 years, they only needed 2 water bottles for the entire tribe!",
  },
  {
    Icon: (
      <span>
        <Ham size={40} color="#16b0fe" strokeWidth={2} />
      </span>
    ),
    text: "Meat and Fish",
    description:
      "Our meat and fish are so full of nutrients you will be shocked when you read the macros! No longer do you need to watch your calories",
  },
  {
    Icon: (
      <span>
        <Snowflake size={40} color="#16b0fe" strokeWidth={2} />
      </span>
    ),
    text: "Frozens",
    description:
      "Our frozen items are so cold elza freezes next to them. Once you try them you will never want the winter to come back, and you will never let it go",
  },
];

function HomePage() {
  const { loggedInUser } = useAuth();

  return (
    <main className="pt-8 px-6 relative">
      <div className="relative w-full h-screen overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
          autoPlay
          muted
          loop
        >
          <source src="https://res.cloudinary.com/dtbeyzqcb/video/upload/v1723427587/4122971-uhd_3840_2160_25fps_icwemh.mp4" />
          Your browser does not support this video
        </video>

        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 -z-5"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
          <div className="flex flex-col">
            <span className="text-sm pb-3 uppercase text-muted-foreground text-left">
              Premium Open Market
            </span>
            <h1 className="mx-auto text-5xl font-bold mb-6">
              Buy{" "}
              <span className="text-transparent bg-clip-text bg-gradient-secondary">
                Better,
              </span>{" "}
              Buy{" "}
              <span className="text-transparent bg-clip-text bg-gradient-secondary">
                Cheaper.
              </span>
            </h1>
          </div>
          <p className="text-lg leading-relaxed mb-8 max-w-2xl">
            SmartCart is the first true{" "}
            <span className="text-transparent bg-clip-text bg-gradient-secondary">
              Premium Open Market
            </span>
            , with products from multiple supermarkets, all you have to do is
            build your cart and compare the prices.
          </p>
          <div>
            {loggedInUser ? (
              <Button className="text-white" variant={"homePage"} asChild>
                <Link to={"/products"}>
                  Browse products
                  <ArrowUpRight size={20} color="#fcfcfc" strokeWidth={1} />
                </Link>
              </Button>
            ) : (
              <div className="flex gap-5">
                <Button
                  className="transition-colors"
                  variant={"homePage"}
                  asChild
                >
                  <Link to="/auth/register">
                    Join Now{" "}
                    <ArrowRight
                      size={20}
                      strokeWidth={1}
                      className="ml-2 inline-block"
                    />
                  </Link>
                </Button>
                <Button className="text-white" variant={"homePage"} asChild>
                  <Link to={"/products"}>
                    Browse products
                    <ArrowUpRight size={20} color="#fcfcfc" strokeWidth={1} />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Other Sections */}
      <div className="text-center mt-14 flex flex-col gap-16">
        <div>
          <span className="text-transparent text-sm bg-clip-text bg-gradient-secondary uppercase text-center font-bold">
            Find what you're looking for
          </span>
          <h2 className="text-3xl font-bold mb-8">Browse Popular Categories</h2>
          <div className="flex justify-center">
            <Carousel className="w-full max-w-xs">
              <CarouselContent>
                {categories.map((item, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Link to={`/products?category=${item.text}`}>
                        <Card>
                          <CardContent className="flex items-center hover:bg-foreground/10 transition-all hover:rounded-md flex-col gap-6 p-6">
                            <div className="flex flex-col items-center">
                              <span>{item.Icon}</span>
                              <span className="text-xl text-transparent bg-clip-text bg-gradient-secondary font-bold">
                                {item.text}
                              </span>
                            </div>
                            <span>{item.description}</span>
                          </CardContent>
                        </Card>
                      </Link>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
        <Separator />
        <div>
          <span className="text-transparent text-sm bg-clip-text bg-gradient-secondary uppercase text-center font-bold">
            Stay updated anywhere, any time
          </span>
          <h2 className="text-3xl font-bold mb-4">
            Go live and track your progress in real time.
          </h2>
          <div className="clear-start flex flex-col items-center mb-14">
            <p className="max-w-3xl text-center">
              Ever wanted to get real-time requests to your cart while you are
              in the supermarket and your spouse is at home? Wait no more!
              Simply go to your cart, press the{" "}
              <span className="text-transparent text-sm bg-clip-text bg-gradient-secondary font-bold">
                Go Live
              </span>{" "}
              Button, invite your collaborators, and start shopping worry-free,
              as they will be able to edit your cart in real-time!
            </p>
          </div>
        </div>
        <Separator />

        <div>
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          <Accordion
            type="single"
            collapsible
            className="w-full max-w-3xl mx-auto"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>What is SmartCart?</AccordionTrigger>
              <AccordionContent>
                SmartCart is a web application that allows you to compare prices
                across various supermarkets, helping you find the best deals and
                save money on your grocery shopping.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How do I use SmartCart?</AccordionTrigger>
              <AccordionContent>
                Simply add items to your cart, and SmartCart will show you the
                best prices available at nearby supermarkets. You can also save
                your favorite carts and use them for future shopping trips.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is SmartCart free to use?</AccordionTrigger>
              <AccordionContent>
                Yes, SmartCart is completely free to use. We aim to help you
                save money without any additional cost.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                Can I access SmartCart on my mobile device?
              </AccordionTrigger>
              <AccordionContent>
                Absolutely! SmartCart is designed to be fully responsive, so you
                can access it on your smartphone, tablet, or computer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
