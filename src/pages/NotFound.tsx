import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center space-y-6">
          <div className="space-y-4">
            <div className="text-6xl font-bold text-primary">404</div>
            <h1 className="text-2xl font-semibold">Page Not Found</h1>
            <p className="text-muted-foreground">
              Sorry, we couldn't find the page you're looking for. The page might have been moved or doesn't exist.
            </p>
          </div>
          
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Go to Home
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/shop">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Browse Products
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
