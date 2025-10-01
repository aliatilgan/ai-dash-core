# AI Dashboard Core - Technical Documentation

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Component Structure](#component-structure)
3. [Authentication System](#authentication-system)
4. [State Management](#state-management)
5. [Routing & Navigation](#routing--navigation)
6. [UI Components](#ui-components)
7. [Theme System](#theme-system)
8. [Data Flow](#data-flow)
9. [API Integration](#api-integration)
10. [Performance Optimization](#performance-optimization)
11. [Testing Strategy](#testing-strategy)
12. [Deployment Guide](#deployment-guide)
13. [Development Workflow](#development-workflow)
14. [Troubleshooting](#troubleshooting)

## Architecture Overview

### System Architecture

The AI Dashboard Core follows a modern React architecture with TypeScript, emphasizing:

- **Component-based Architecture**: Modular, reusable components
- **Type Safety**: Full TypeScript integration
- **Performance**: Code splitting and lazy loading
- **Accessibility**: WCAG 2.1 AA compliance
- **Responsive Design**: Mobile-first approach

### Technology Stack

```typescript
// Core Technologies
React: "^18.2.0"
TypeScript: "^5.0.0"
Vite: "^4.4.5"

// UI Framework
Tailwind CSS: "^3.3.0"
Radix UI: "^1.0.0"
shadcn/ui: "latest"

// State Management
React Context API
React Query: "^4.0.0"

// Routing
React Router DOM: "^6.15.0"

// Charts & Visualization
Recharts: "^2.8.0"

// Icons & Assets
Lucide React: "^0.263.1"
```

## Component Structure

### Directory Organization

```
src/components/
├── ui/                     # Base UI components (shadcn/ui)
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── toast.tsx
│   └── ...
├── Layout/                 # Layout components
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── MobileMenu.tsx
│   └── Layout.tsx
├── Dashboard/              # Dashboard-specific components
│   ├── StatsCards.tsx
│   ├── RevenueChart.tsx
│   ├── ActivityFeed.tsx
│   └── QuickActions.tsx
├── Analytics/              # Analytics components
│   ├── AnalyticsChart.tsx
│   ├── MetricsGrid.tsx
│   ├── ExportButton.tsx
│   └── DateRangePicker.tsx
├── CRM/                   # CRM system components
│   ├── CustomerList.tsx
│   ├── CustomerCard.tsx
│   ├── AddCustomerForm.tsx
│   └── CustomerDetails.tsx
├── Auth/                  # Authentication components
│   ├── LoginForm.tsx
│   ├── SignupForm.tsx
│   ├── ProtectedRoute.tsx
│   └── AuthGuard.tsx
└── Settings/              # Settings components
    ├── ThemeSelector.tsx
    ├── ProfileSettings.tsx
    ├── NotificationSettings.tsx
    └── SecuritySettings.tsx
```

### Component Patterns

#### 1. Compound Components

```typescript
// Example: Card component with compound pattern
export const Card = {
  Root: CardRoot,
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter
}

// Usage
<Card.Root>
  <Card.Header>
    <h3>Analytics Overview</h3>
  </Card.Header>
  <Card.Content>
    <AnalyticsChart />
  </Card.Content>
</Card.Root>
```

#### 2. Render Props Pattern

```typescript
// Example: Data fetching component
interface DataFetcherProps<T> {
  url: string;
  children: (data: T | null, loading: boolean, error: Error | null) => React.ReactNode;
}

export function DataFetcher<T>({ url, children }: DataFetcherProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch logic...

  return children(data, loading, error);
}
```

#### 3. Custom Hooks Pattern

```typescript
// Example: useAuth hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

// Example: useToast hook
export function useToast() {
  return {
    toast: (message: string, type: 'success' | 'error' | 'info') => {
      // Toast implementation
    }
  };
}
```

## Authentication System

### Authentication Flow

```typescript
// AuthContext.tsx
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
```

### User Roles & Permissions

```typescript
// types/auth.ts
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  avatar?: string;
  createdAt: string;
  lastLogin: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
```

### Protected Routes Implementation

```typescript
// components/Auth/ProtectedRoute.tsx
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'user';
  redirectTo?: string;
}

export function ProtectedRoute({ 
  children, 
  requiredRole, 
  redirectTo = '/login' 
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
```

### Authentication Storage

```typescript
// lib/auth.ts
export class AuthStorage {
  private static readonly TOKEN_KEY = 'auth_token';
  private static readonly USER_KEY = 'auth_user';

  static setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static setUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  static getUser(): User | null {
    const userData = localStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  static clear(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }
}
```

## State Management

### Context API Structure

```typescript
// contexts/AppContext.tsx
interface AppContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
```

### State Patterns

#### 1. Reducer Pattern for Complex State

```typescript
// hooks/useAppReducer.ts
interface AppState {
  theme: Theme;
  sidebarOpen: boolean;
  notifications: Notification[];
  loading: boolean;
}

type AppAction = 
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean };

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };
    // ... other cases
    default:
      return state;
  }
}
```

#### 2. Local Storage Persistence

```typescript
// hooks/useLocalStorage.ts
export function useLocalStorage<T>(
  key: string, 
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
```

## Routing & Navigation

### Route Configuration

```typescript
// App.tsx
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected Routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="crm" element={<CRM />} />
              <Route path="ai-insights" element={<AIInsights />} />
              <Route path="settings" element={<Settings />} />
              
              {/* Admin Only Routes */}
              <Route path="users" element={
                <ProtectedRoute requiredRole="admin">
                  <UserManagement />
                </ProtectedRoute>
              } />
            </Route>
            
            {/* Error Routes */}
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
```

### Navigation Components

```typescript
// components/Layout/Navigation.tsx
interface NavigationItem {
  label: string;
  href: string;
  icon: React.ComponentType;
  badge?: string;
  requiredRole?: 'admin' | 'user';
}

const navigationItems: NavigationItem[] = [
  { label: 'Dashboard', href: '/', icon: Home },
  { label: 'Analytics', href: '/analytics', icon: BarChart3 },
  { label: 'CRM', href: '/crm', icon: Users },
  { label: 'AI Insights', href: '/ai-insights', icon: Brain },
  { label: 'Settings', href: '/settings', icon: Settings },
  { label: 'User Management', href: '/users', icon: UserCog, requiredRole: 'admin' }
];
```

## UI Components

### Design System

#### Color Palette

```typescript
// tailwind.config.ts
const colors = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    900: '#1e3a8a'
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    500: '#6b7280',
    900: '#111827'
  }
};
```

#### Typography Scale

```css
/* src/index.css */
.text-xs { font-size: 0.75rem; line-height: 1rem; }
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.text-base { font-size: 1rem; line-height: 1.5rem; }
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }
.text-2xl { font-size: 1.5rem; line-height: 2rem; }
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
```

#### Spacing System

```css
/* Spacing scale (rem units) */
.space-1 { margin: 0.25rem; }
.space-2 { margin: 0.5rem; }
.space-4 { margin: 1rem; }
.space-6 { margin: 1.5rem; }
.space-8 { margin: 2rem; }
.space-12 { margin: 3rem; }
.space-16 { margin: 4rem; }
```

### Component Library

#### Button Component

```typescript
// components/ui/button.tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', loading, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
```

#### Card Component

```typescript
// components/ui/card.tsx
export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
));

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
```

## Theme System

### Theme Configuration

```typescript
// contexts/ThemeContext.tsx
interface ThemeContextType {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  resolvedTheme: 'light' | 'dark';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark' | 'system'>('theme', 'system');
  
  const resolvedTheme = useMemo(() => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme;
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolvedTheme);
  }, [resolvedTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

### CSS Variables

```css
/* src/index.css */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 84% 4.9%;
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96%;
  --accent-foreground: 222.2 84% 4.9%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 84% 4.9%;
  --radius: 0.5rem;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;
  --popover: 222.2 84% 4.9%;
  --popover-foreground: 210 40% 98%;
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 11.2%;
  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;
  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;
  --accent: 217.2 32.6% 17.5%;
  --accent-foreground: 210 40% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 210 40% 98%;
  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --ring: 212.7 26.8% 83.9%;
}
```

## Data Flow

### Data Fetching Patterns

#### 1. Custom Hook for API Calls

```typescript
// hooks/useApi.ts
interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useApi<T>(url: string): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
```

#### 2. Data Transformation

```typescript
// utils/dataTransform.ts
export interface RawAnalyticsData {
  date: string;
  revenue: number;
  users: number;
  conversions: number;
}

export interface ChartData {
  name: string;
  value: number;
  change: number;
}

export function transformAnalyticsData(raw: RawAnalyticsData[]): ChartData[] {
  return raw.map((item, index) => {
    const previousItem = raw[index - 1];
    const change = previousItem 
      ? ((item.revenue - previousItem.revenue) / previousItem.revenue) * 100 
      : 0;

    return {
      name: new Date(item.date).toLocaleDateString(),
      value: item.revenue,
      change: Math.round(change * 100) / 100
    };
  });
}
```

### State Synchronization

```typescript
// hooks/useSync.ts
export function useSync<T>(
  key: string,
  initialValue: T,
  syncToServer?: (value: T) => Promise<void>
) {
  const [value, setValue] = useLocalStorage(key, initialValue);
  const [syncing, setSyncing] = useState(false);

  const updateValue = useCallback(async (newValue: T) => {
    setValue(newValue);
    
    if (syncToServer) {
      try {
        setSyncing(true);
        await syncToServer(newValue);
      } catch (error) {
        console.error('Sync failed:', error);
        // Optionally revert the value or show error
      } finally {
        setSyncing(false);
      }
    }
  }, [setValue, syncToServer]);

  return { value, updateValue, syncing };
}
```

## API Integration

### API Client Setup

```typescript
// lib/apiClient.ts
class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const token = AuthStorage.getToken();

    const config: RequestInit = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient(process.env.VITE_API_URL || 'http://localhost:3001/api');
```

### API Service Layer

```typescript
// services/analyticsService.ts
export class AnalyticsService {
  static async getAnalyticsData(dateRange: DateRange): Promise<AnalyticsData> {
    return apiClient.get<AnalyticsData>(
      `/analytics?start=${dateRange.start}&end=${dateRange.end}`
    );
  }

  static async exportAnalytics(format: 'pdf' | 'csv'): Promise<Blob> {
    const response = await fetch(`/api/analytics/export?format=${format}`, {
      headers: {
        Authorization: `Bearer ${AuthStorage.getToken()}`,
      },
    });
    return response.blob();
  }
}

// services/crmService.ts
export class CRMService {
  static async getCustomers(): Promise<Customer[]> {
    return apiClient.get<Customer[]>('/customers');
  }

  static async createCustomer(customer: CreateCustomerData): Promise<Customer> {
    return apiClient.post<Customer>('/customers', customer);
  }

  static async updateCustomer(id: string, customer: UpdateCustomerData): Promise<Customer> {
    return apiClient.put<Customer>(`/customers/${id}`, customer);
  }

  static async deleteCustomer(id: string): Promise<void> {
    return apiClient.delete<void>(`/customers/${id}`);
  }
}
```

## Performance Optimization

### Code Splitting

```typescript
// Lazy loading components
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Analytics = lazy(() => import('./pages/Analytics'));
const CRM = lazy(() => import('./pages/CRM'));
const AIInsights = lazy(() => import('./pages/AIInsights'));

// Route-based code splitting
function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/crm" element={<CRM />} />
        <Route path="/ai-insights" element={<AIInsights />} />
      </Routes>
    </Suspense>
  );
}
```

### Memoization Strategies

```typescript
// Component memoization
const ExpensiveComponent = React.memo(({ data, onUpdate }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      calculated: expensiveCalculation(item)
    }));
  }, [data]);

  const handleUpdate = useCallback((id: string, value: any) => {
    onUpdate(id, value);
  }, [onUpdate]);

  return (
    <div>
      {processedData.map(item => (
        <Item key={item.id} data={item} onUpdate={handleUpdate} />
      ))}
    </div>
  );
});

// Custom hook memoization
function useExpensiveCalculation(input: any[]) {
  return useMemo(() => {
    return input.reduce((acc, item) => {
      // Expensive calculation
      return acc + complexOperation(item);
    }, 0);
  }, [input]);
}
```

### Bundle Optimization

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['recharts'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'recharts'],
  },
});
```

## Testing Strategy

### Unit Testing

```typescript
// __tests__/components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../components/ui/button';

describe('Button Component', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });
});
```

### Integration Testing

```typescript
// __tests__/integration/Auth.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { Login } from '../pages/Login';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Authentication Flow', () => {
  it('allows user to login', async () => {
    renderWithProviders(<Login />);
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    });
  });
});
```

### E2E Testing

```typescript
// e2e/dashboard.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('[data-testid="email"]', 'admin@example.com');
    await page.fill('[data-testid="password"]', 'password123');
    await page.click('[data-testid="login-button"]');
    await page.waitForURL('/');
  });

  test('displays analytics data', async ({ page }) => {
    await expect(page.locator('[data-testid="revenue-chart"]')).toBeVisible();
    await expect(page.locator('[data-testid="stats-cards"]')).toBeVisible();
  });

  test('allows navigation between pages', async ({ page }) => {
    await page.click('[data-testid="analytics-nav"]');
    await page.waitForURL('/analytics');
    await expect(page.locator('h1')).toContainText('Analytics');
  });
});
```

## Deployment Guide

### Environment Configuration

```bash
# .env.production
VITE_API_URL=https://api.yourdomain.com
VITE_APP_NAME=AI Dashboard Core
VITE_APP_VERSION=1.0.0
VITE_SENTRY_DSN=your_sentry_dsn
VITE_ANALYTICS_ID=your_analytics_id
```

### Build Process

```json
// package.json
{
  "scripts": {
    "build": "tsc && vite build",
    "build:analyze": "npm run build && npx vite-bundle-analyzer dist/stats.html",
    "preview": "vite preview",
    "deploy": "npm run build && npm run deploy:vercel"
  }
}
```

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```nginx
# nginx.conf
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Vercel Deployment

```json
// vercel.json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "https://your-api-domain.com/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

## Development Workflow

### Git Workflow

```bash
# Feature development
git checkout -b feature/new-feature
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature

# Create pull request
# After review and approval
git checkout main
git pull origin main
git merge feature/new-feature
git push origin main
```

### Code Quality

```json
// .eslintrc.json
{
  "extends": [
    "@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off"
  }
}
```

```json
// prettier.config.js
module.exports = {
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false
};
```

### Pre-commit Hooks

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "git add"
    ]
  }
}
```

## Troubleshooting

### Common Issues

#### 1. Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npx tsc --noEmit

# Analyze bundle
npm run build:analyze
```

#### 2. Runtime Errors

```typescript
// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}
```

#### 3. Performance Issues

```typescript
// Performance monitoring
function usePerformanceMonitor(componentName: string) {
  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      console.log(`${componentName} render time: ${endTime - startTime}ms`);
    };
  });
}
```

### Debug Tools

```typescript
// Development helpers
if (process.env.NODE_ENV === 'development') {
  // React DevTools
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = window.__REACT_DEVTOOLS_GLOBAL_HOOK__ || {};
  
  // Performance monitoring
  window.performance.mark('app-start');
  
  // Debug utilities
  window.debugApp = {
    auth: () => console.log(AuthStorage.getUser()),
    theme: () => console.log(document.documentElement.classList),
    storage: () => console.log(localStorage)
  };
}
```

---

This documentation provides a comprehensive guide to understanding, developing, and maintaining the AI Dashboard Core application. For additional support or questions, please refer to the project's GitHub repository or contact the development team.