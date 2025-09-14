import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Shield, Package, ShoppingCart, Users, Eye, Edit, CheckCircle, Clock, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "@/hooks/useTranslation.tsx";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/components/ui/use-toast";
import { NavLink } from "react-router-dom";

interface Order {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  totalAmount: number;
  delivery_fee: number;
  final_total: number;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  status: string;
  created_at: string;
  updated_at?: string;
}

interface AdminStats {
  total_orders: number;
  status_breakdown: Array<{
    _id: string;
    count: number;
    total_amount: number;
  }>;
  recent_orders: Order[];
}

const AdminPage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders'>('dashboard');

  // Admin access check
  const adminEmails = [
    'phirosmanashvilinika2005@gmail.com',
    'alexxanderson28@gmail.com'
  ];

  const isAdmin = user?.email && adminEmails.includes(user.email.toLowerCase());

  useEffect(() => {
    if (isAdmin) {
      fetchAdminData();
    }
  }, [isAdmin]);

  const fetchAdminData = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8001';
      
      if (!user?.email) {
        toast({
          title: "Authentication Required",
          description: "Please log in to access admin panel",
          variant: "destructive",
        });
        return;
      }

      // First verify admin access
      const authResponse = await fetch(`${backendUrl}/api/admin/authenticate?email=${encodeURIComponent(user.email)}`);
      
      if (!authResponse.ok) {
        if (authResponse.status === 403) {
          toast({
            title: "Access Denied",
            description: "You don't have permission to access the admin panel",
            variant: "destructive",
          });
          return;
        }
        throw new Error('Admin authentication failed');
      }

      // Fetch orders
      const ordersResponse = await fetch(`${backendUrl}/api/admin/orders?admin_email=${encodeURIComponent(user.email)}`);
      
      if (!ordersResponse.ok) {
        throw new Error('Failed to fetch orders');
      }
      
      const ordersData = await ordersResponse.json();
      setOrders(ordersData);

      // Fetch stats
      const statsResponse = await fetch(`${backendUrl}/api/admin/stats?admin_email=${encodeURIComponent(user.email)}`);
      
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData);
      }

    } catch (error) {
      console.error('Error fetching admin data:', error);
      toast({
        title: "Error",
        description: "Failed to load admin data. Please make sure you're logged in with an admin account.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8001';
      
      const session = await import('@/integrations/supabase/client').then(module => 
        module.supabase.auth.getSession()
      );

      const response = await fetch(`${backendUrl}/api/admin/orders/${orderId}?status=${newStatus}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${session.data.session?.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      // Update local state
      setOrders(prev => prev.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus, updated_at: new Date().toISOString() }
          : order
      ));

      toast({
        title: "Success",
        description: `Order ${orderId} status updated to ${newStatus}`,
      });

    } catch (error) {
      console.error('Error updating order status:', error);
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      });
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'processing': return 'default';
      case 'shipped': return 'secondary';
      case 'cancelled': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'processing': return <Clock className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  // Access denied for non-admin users
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="p-8 text-center">
          <Shield className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
          <p className="text-muted-foreground mb-4">Please log in to access this page</p>
          <NavLink to="/auth">
            <Button>Login</Button>
          </NavLink>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <>
        <Helmet>
          <title>Access Denied - GeSnus</title>
        </Helmet>
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <Card className="p-8 text-center">
            <Shield className="h-16 w-16 mx-auto mb-4 text-destructive" />
            <h2 className="text-xl font-semibold mb-2">{t("admin.access_denied")}</h2>
            <p className="text-muted-foreground mb-4">{t("admin.access_denied.message")}</p>
            <NavLink to="/">
              <Button variant="outline">Back to Home</Button>
            </NavLink>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t("admin.title")} - GeSnus</title>
        <meta name="description" content="Admin panel for managing orders and products" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Shield className="h-8 w-8" />
              {t("admin.title")}
            </h1>
            <p className="text-muted-foreground">Welcome, {user.email}</p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={activeTab === 'dashboard' ? 'default' : 'outline'}
              onClick={() => setActiveTab('dashboard')}
            >
              {t("admin.dashboard")}
            </Button>
            <Button
              variant={activeTab === 'orders' ? 'default' : 'outline'}
              onClick={() => setActiveTab('orders')}
            >
              {t("admin.orders")}
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading admin data...</p>
          </div>
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{t("admin.orders.total")}</p>
                        <p className="text-2xl font-bold">{stats?.total_orders || 0}</p>
                      </div>
                      <ShoppingCart className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </Card>
                  
                  {stats?.status_breakdown?.map((status) => (
                    <Card key={status._id} className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground capitalize">
                            {status._id || 'Pending'}
                          </p>
                          <p className="text-2xl font-bold">{status.count}</p>
                        </div>
                        {getStatusIcon(status._id || 'pending')}
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Recent Orders */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
                  <div className="space-y-3">
                    {stats?.recent_orders?.slice(0, 5).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium">{order.fullName}</p>
                          <p className="text-sm text-muted-foreground">{order.email}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₾{order.final_total?.toFixed(2) || order.totalAmount.toFixed(2)}</p>
                          <Badge variant={getStatusBadgeVariant(order.status)}>
                            {order.status || 'pending'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">{t("admin.orders.title")}</h3>
                  
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Card key={order.id} className="p-4">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                          {/* Customer Info */}
                          <div>
                            <h4 className="font-semibold mb-2">Customer Details</h4>
                            <div className="space-y-1 text-sm">
                              <p><strong>Name:</strong> {order.fullName}</p>
                              <p><strong>Email:</strong> {order.email}</p>
                              <p><strong>Phone:</strong> {order.phone}</p>
                              <p><strong>Address:</strong> {order.address}</p>
                              <p><strong>Date:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
                            </div>
                          </div>

                          {/* Order Details */}
                          <div>
                            <h4 className="font-semibold mb-2">Order Details</h4>
                            <div className="space-y-1 text-sm">
                              <p><strong>Order ID:</strong> {order.id}</p>
                              <p><strong>Items:</strong> {order.items?.length || 0}</p>
                              <div className="space-y-1">
                                {order.items?.map((item, index) => (
                                  <p key={index} className="ml-2">
                                    • {item.name} x{item.quantity} - ₾{(item.price * item.quantity).toFixed(2)}
                                  </p>
                                ))}
                              </div>
                              <p><strong>Subtotal:</strong> ₾{order.totalAmount.toFixed(2)}</p>
                              <p><strong>Delivery Fee:</strong> ₾{(order.delivery_fee || 5).toFixed(2)}</p>
                              <p><strong>Total:</strong> ₾{(order.final_total || order.totalAmount + 5).toFixed(2)}</p>
                            </div>
                          </div>

                          {/* Actions */}
                          <div>
                            <h4 className="font-semibold mb-2">Actions</h4>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Badge variant={getStatusBadgeVariant(order.status)}>
                                  {order.status || 'pending'}
                                </Badge>
                              </div>
                              
                              <Select 
                                value={order.status || 'pending'}
                                onValueChange={(value) => updateOrderStatus(order.id, value)}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Update Status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="processing">Processing</SelectItem>
                                  <SelectItem value="shipped">Shipped</SelectItem>
                                  <SelectItem value="delivered">Delivered</SelectItem>
                                  <SelectItem value="completed">Completed</SelectItem>
                                  <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                              </Select>

                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateOrderStatus(order.id, 'processing')}
                                >
                                  <Clock className="h-4 w-4 mr-1" />
                                  Processing
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => updateOrderStatus(order.id, 'completed')}
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Complete
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {orders.length === 0 && (
                    <div className="text-center py-8">
                      <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                      <p className="text-muted-foreground">No orders found</p>
                    </div>
                  )}
                </Card>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default AdminPage;