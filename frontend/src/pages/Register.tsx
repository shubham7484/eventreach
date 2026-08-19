import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { User, Mail, Lock, EyeOff, Eye, Loader2, Sun, Moon, Briefcase } from 'lucide-react';
import { useTheme } from '../store/themeStore';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['Admin', 'User']),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: 'User' },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setApiError(null);
      setSuccessMsg(null);
      const response = await api.post('/auth/register', data);
      setSuccessMsg(response.data.message);
      setTimeout(() => navigate('/login'), 3000);
    } catch (error: any) {
      setApiError(
        error.response?.data?.error || 'Something went wrong. Please try again.'
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-fade-in relative overflow-hidden">
      
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-3 glass-panel rounded-full hover:scale-105 transition-all duration-300 z-10 text-foreground/70 hover:text-foreground"
        title="Toggle Theme"
      >
        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      <div className="w-full max-w-md animate-spring-up stagger-1 relative z-10">
        <div className="glass-panel rounded-3xl overflow-hidden relative p-8 shadow-[0_20px_100px_rgba(0,0,0,0.4)] dark:shadow-[0_30px_150px_rgba(0,0,0,1)] hover:shadow-[0_40px_120px_rgba(0,0,0,0.5)] dark:hover:shadow-[0_50px_200px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all duration-500 ease-out">
          
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-2xl overflow-hidden flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.8)] animate-breathe-deep">
              <img 
                src="/logo.png" 
                alt="EventReach Logo" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
          
          <h2 className="text-3xl font-display font-bold text-center text-foreground uppercase tracking-wider mb-2">
            Create Account
          </h2>
          <p className="text-center text-foreground/60 mb-6 font-medium">
            Register to join EventReach
          </p>

          {apiError && (
            <div className="bg-destructive/20 backdrop-blur-md border border-destructive/30 text-destructive p-4 rounded-xl mb-6 text-sm text-center animate-spring-up">
              {apiError}
            </div>
          )}

          {successMsg && (
            <div className="bg-accent/20 backdrop-blur-md border border-accent/30 text-accent p-4 rounded-xl mb-6 text-sm text-center animate-spring-up">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-display font-bold text-foreground/70 mb-1 uppercase tracking-widest pl-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-foreground/40" />
                </div>
                <input
                  type="text"
                  {...register('name')}
                  className={`block w-full pl-11 pr-4 py-3 bg-white/5 dark:bg-black/10 backdrop-blur-sm border ${
                    errors.name ? 'border-destructive/50 ring-1 ring-destructive/20' : 'border-white/10 dark:border-white/5'
                  } rounded-xl text-foreground focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all duration-300`}
                  placeholder="John Doe"
                />
              </div>
              {errors.name && <p className="mt-1 text-xs text-destructive pl-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-display font-bold text-foreground/70 mb-1 uppercase tracking-widest pl-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-foreground/40" />
                </div>
                <input
                  type="email"
                  {...register('email')}
                  className={`block w-full pl-11 pr-4 py-3 bg-white/5 dark:bg-black/10 backdrop-blur-sm border ${
                    errors.email ? 'border-destructive/50 ring-1 ring-destructive/20' : 'border-white/10 dark:border-white/5'
                  } rounded-xl text-foreground focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all duration-300`}
                  placeholder="admin@eventreach.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-destructive pl-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-display font-bold text-foreground/70 mb-1 uppercase tracking-widest pl-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-foreground/40" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  className={`block w-full pl-11 pr-11 py-3 bg-white/5 dark:bg-black/10 backdrop-blur-sm border ${
                    errors.password ? 'border-destructive/50 ring-1 ring-destructive/20' : 'border-white/10 dark:border-white/5'
                  } rounded-xl text-foreground focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all duration-300`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-foreground/40 hover:text-foreground transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-foreground/40 hover:text-foreground transition-colors" />
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-destructive pl-1">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-display font-bold text-foreground/70 mb-1 uppercase tracking-widest pl-1">
                Role
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Briefcase className="h-5 w-5 text-foreground/40" />
                </div>
                <select
                  {...register('role')}
                  className="block w-full pl-11 pr-4 py-3 bg-white/5 dark:bg-black/10 backdrop-blur-sm border border-white/10 dark:border-white/5 rounded-xl text-foreground focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all duration-300 appearance-none"
                >
                  <option value="User" className="bg-background">User</option>
                  <option value="Admin" className="bg-background">Admin</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="glass-button w-full flex justify-center py-3.5 px-4 rounded-xl shadow-[0_4px_20px_rgba(34,197,94,0.3)] text-sm font-display font-bold text-white bg-accent hover:bg-accent/90 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all tracking-widest uppercase mt-4"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Register'
              )}
            </button>

            <div className="text-center mt-4">
              <Link to="/login" className="text-sm font-medium text-accent hover:underline">
                Already have an account? Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
