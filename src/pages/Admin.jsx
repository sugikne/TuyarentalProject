import { useState } from 'react';
import { LayoutDashboard, Package, Calendar, Settings, LogOut, Users, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-border hidden lg:flex flex-col">
        <div className="p-6 border-b border-border">
          <span className="text-xl font-display font-bold text-brand-blue tracking-tighter">
            NUSA<span className="text-brand-orange">ADMIN</span>
          </span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { id: 'bookings', icon: Calendar, label: 'Bookings' },
            { id: 'packages', icon: Package, label: 'Packages' },
            { id: 'users', icon: Users, label: 'Users' },
            { id: 'settings', icon: Settings, label: 'Settings' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === item.id ? 'bg-brand-blue text-white' : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-destructive hover:bg-destructive/5 rounded-xl transition-colors">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 pt-24 lg:pt-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold font-display">Dashboard Overview</h1>
          <Button className="bg-brand-blue">Add New Package</Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Bookings', value: '1,284', trend: '+12.5%', icon: Calendar },
            { label: 'Revenue', value: 'IDR 45.2M', trend: '+8.2%', icon: TrendingUp },
            { label: 'Active Tours', value: '24', trend: 'Stable', icon: Package },
            { label: 'New Inquiries', value: '18', trend: '+3', icon: Users },
          ].map((stat, i) => (
            <Card key={i} className="rounded-2xl border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-muted rounded-xl">
                    <stat.icon className="text-brand-blue" size={20} />
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trend.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-muted text-muted-foreground'}`}>
                    {stat.trend}
                  </span>
                </div>
                <h3 className="text-muted-foreground text-sm font-medium">{stat.label}</h3>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Bookings Table Mockup */}
        <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden">
          <CardHeader className="bg-white border-b border-border p-6">
            <CardTitle className="text-lg">Recent Bookings</CardTitle>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-muted/50 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Package</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { name: 'John Doe', pkg: 'West Nusa Penida', date: 'Oct 24, 2023', status: 'Confirmed', amount: 'IDR 350K' },
                  { name: 'Sarah Miller', pkg: 'Full Island Trip', date: 'Oct 25, 2023', status: 'Pending', amount: 'IDR 850K' },
                  { name: 'Mike Ross', pkg: 'Motor Rental', date: 'Oct 26, 2023', status: 'Confirmed', amount: 'IDR 150K' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-muted/30 transition-colors text-sm">
                    <td className="px-6 py-4 font-medium">{row.name}</td>
                    <td className="px-6 py-4">{row.pkg}</td>
                    <td className="px-6 py-4 text-muted-foreground">{row.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${row.status === 'Confirmed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold">{row.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
}
