import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../store/authStore';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  Megaphone, 
  LogOut, 
  Menu, 
  X,
  MessageSquare,
  Settings,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from '../store/themeStore';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
    { name: 'Events', to: '/events', icon: CalendarDays },
    { name: 'Contacts', to: '/contacts', icon: Users },
    { name: 'Campaigns', to: '/campaigns', icon: Megaphone },
    { name: 'Settings', to: '/settings', icon: Settings },
  ];

  if (user?.role === 'SuperAdmin') {
    navItems.push({ name: 'User Approvals', to: '/admin/approvals', icon: Users });
  }

  return (
    <div className="min-h-screen flex text-foreground">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/40 backdrop-blur-md lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 glass-panel !border-y-0 !border-l-0 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-16 flex items-center px-6 border-b border-white/10 dark:border-white/5">
          <MessageSquare className="w-8 h-8 text-accent mr-3 animate-spring-up" />
          <span className="text-xl font-display font-bold tracking-tight uppercase animate-slide-in">EventReach</span>
          <button 
            className="ml-auto lg:hidden text-foreground/50 hover:text-foreground"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item, index) => (
            <NavLink
              key={item.name}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `
                flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 animate-spring-up stagger-${index + 1}
                ${isActive 
                  ? 'bg-accent/10 text-accent glass-panel !border-accent/20' 
                  : 'text-foreground/70 hover:bg-white/10 hover:text-foreground'
                }
              `}
            >
              {({ isActive }) => (
                <>
                  <item.icon className={`w-5 h-5 mr-3 flex-shrink-0 ${isActive ? 'text-accent' : ''}`} />
                  {item.name}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 dark:border-white/5">
          <div className="flex items-center animate-spring-up stagger-5">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {user?.email}
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className="ml-2 p-2 text-foreground/50 hover:text-accent hover:bg-white/10 rounded-lg transition-colors"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={logout}
              className="ml-4 p-2 text-foreground/50 hover:text-destructive hover:bg-white/10 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <header className="glass-panel !border-x-0 !border-t-0 lg:hidden sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 h-16">
            <div className="flex items-center">
              <MessageSquare className="w-6 h-6 text-accent mr-2" />
              <span className="text-lg font-display font-bold text-foreground uppercase">EventReach</span>
            </div>
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-foreground/50 hover:text-foreground hover:bg-white/10 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto no-scrollbar">
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
