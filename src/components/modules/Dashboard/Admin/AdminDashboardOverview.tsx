import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck, ThumbsUp, ThumbsDown, Star } from "lucide-react";

// Dummy data (replace with actual API fetched data)
const dashboardStats = {
  totalPosts: 150,
  pendingPosts: 35,
  approvedPosts: 100,
  rejectedPosts: 15,
  premiumPosts: 45,
  totalUsers: 200,
  activeSubscriptions: 50,
  expiredSubscriptions: 20,
  totalPayments: 30000,
  upvotes: 420,
  downvotes: 120,
  reviews: 320,
};

const AdminDashboardOverview = () => {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold">Total Posts</h2>
          <p className="text-2xl font-bold text-blue-600">
            {dashboardStats.totalPosts}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold">Pending Posts</h2>
          <p className="text-2xl font-bold text-yellow-500">
            {dashboardStats.pendingPosts}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold">Approved Posts</h2>
          <p className="text-2xl font-bold text-green-600">
            {dashboardStats.approvedPosts}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold">Rejected Posts</h2>
          <p className="text-2xl font-bold text-red-500">
            {dashboardStats.rejectedPosts}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold">Premium Posts</h2>
          <p className="text-2xl font-bold text-purple-500">
            {dashboardStats.premiumPosts}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-2xl font-bold text-gray-800">
            {dashboardStats.totalUsers}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold">Active Subscriptions</h2>
          <p className="text-2xl font-bold text-green-700">
            {dashboardStats.activeSubscriptions}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold">Expired Subscriptions</h2>
          <p className="text-2xl font-bold text-gray-500">
            {dashboardStats.expiredSubscriptions}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold">Total Payments</h2>
          <p className="text-2xl font-bold text-teal-600">
            ৳{dashboardStats.totalPayments}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-center gap-4">
          <ThumbsUp className="text-green-600" />
          <div>
            <h2 className="text-lg font-semibold">Upvotes</h2>
            <p className="text-xl font-bold">{dashboardStats.upvotes}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-center gap-4">
          <ThumbsDown className="text-red-600" />
          <div>
            <h2 className="text-lg font-semibold">Downvotes</h2>
            <p className="text-xl font-bold">{dashboardStats.downvotes}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-center gap-4">
          <Star className="text-yellow-400" />
          <div>
            <h2 className="text-lg font-semibold">Reviews</h2>
            <p className="text-xl font-bold">{dashboardStats.reviews}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboardOverview;
