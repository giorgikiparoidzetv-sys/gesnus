import { Shield, Award, Users, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import factoryImage from "@/assets/factory.jpg";

const AboutPage = () => {
  const values = [
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "We guarantee authentic, premium snus products from trusted Swedish manufacturers with rigorous quality control."
    },
    {
      icon: Award,
      title: "Expert Curation",
      description: "Our team of snus experts carefully selects only the finest products to ensure the best experience for our customers."
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Over 50,000 satisfied customers worldwide trust us for their snus needs. Your satisfaction is our priority."
    },
    {
      icon: Globe,
      title: "Global Shipping",
      description: "Fast, reliable worldwide shipping with discrete packaging and tracking for all orders."
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="text-center py-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            About <span className="text-primary">GeSnus</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Since 2015, we've been the world's leading online retailer of premium Swedish snus, 
            committed to bringing you authentic, high-quality tobacco products with exceptional service.
          </p>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in Stockholm by Swedish snus enthusiasts, GeSnus began as a passion project 
                  to share the authentic Swedish snus experience with the world. What started as a small 
                  operation has grown into the most trusted online snus retailer globally.
                </p>
                <p>
                  We work directly with manufacturers like Swedish Match, Fiedler & Lundgren, and other 
                  renowned Swedish tobacco companies to ensure every product meets the highest standards 
                  of quality and authenticity.
                </p>
                <p>
                  Today, we ship to over 40 countries and serve a community of more than 50,000 satisfied 
                  customers who rely on us for their favorite snus brands and discovering new ones.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                <img
                  src={factoryImage}
                  alt="Swedish snus factory"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our commitment to quality, authenticity, and customer satisfaction sets us apart
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-8 pb-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 hero-gradient text-primary-foreground rounded-3xl">
          <div className="container mx-auto px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
              <p className="text-primary-foreground/90 text-lg">
                Trusted by snus enthusiasts worldwide
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-secondary mb-2">50K+</div>
                <div className="text-primary-foreground/80">Happy Customers</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-secondary mb-2">40+</div>
                <div className="text-primary-foreground/80">Countries Served</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-secondary mb-2">200+</div>
                <div className="text-primary-foreground/80">Products Available</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-secondary mb-2">99%</div>
                <div className="text-primary-foreground/80">Customer Satisfaction</div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To be the world's most trusted source for authentic Swedish snus, providing our customers 
                with premium products, exceptional service, and the knowledge to make informed choices. 
                We're committed to preserving the Swedish snus tradition while making it accessible to 
                enthusiasts around the globe.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;