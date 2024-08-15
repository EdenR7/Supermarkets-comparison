import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Page Not Found
        </h2>
        <p className="text-lg text-muted-foreground mb-6">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Button variant="default">
          <Link to="/" className="text-white">
            Go Back Home
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default NotFoundPage;
