import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, Route, BrowserRouter as Router, Routes } from 'react-router';
import { Toaster } from 'sonner';
import SignIn from './components/SignIn/SignIn';
import { AuthProvider } from './contexts/AuthContext';
import { UserSessionProvider } from './contexts/UserContext';
import AuthenticatedRoutes from './guard/AuthenticatedRoutes';
import NetworkStatusGuard from './guard/NetworkStatusGuard';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Sidebar from './pages/Sidebar';
import SignUp from './pages/SignUp';
import UserPage from './pages/User';
// import ProductPage from './pages/Products';
import CalendarMain from './calendar/components/calendar-main';
import CalendarMainMain from './components/Classroom/calendar/components/calendar-main';
import { ScrollToTop } from './components/helpers/ScrollToTop';
import { CurrentSchoolProvider } from './contexts/CurrentSchoolContext';
import ClassroomPage from './pages/Classroom';
import TeacherTable from './pages/TeacherTable';
import { ThemeProvider } from './utils/theme-provider';
// import Product2Page from './pages/Products2';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      // staleTime: 0,
      // gcTime: 0,
    },
  },
});

function App() {
  const dir: 'rtl' | 'ltr' = 'ltr';

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div dir={dir}>
        <Toaster />
        <QueryClientProvider client={queryClient}>
          <NetworkStatusGuard>
            <Router>
              <ScrollToTop />
              <AuthProvider>
                <Routes>
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />

                  <Route element={<AuthenticatedRoutes />}>

                    <Route element={<UserSessionProvider />}>
                      <Route element={<Sidebar dir={dir} />}>
                        <Route path="/" element={<Home />} />
                        <Route index path="/profile" element={<Profile />} />
                        <Route path="users/" element={<UserPage />} />

                        {/* <Route path="products/" element={<ProductPage />} /> */}
                        {/* <Route path="products2/" element={<Product2Page />} /> */}
                        {/* <Route path="notification/" element={<NotificationPage />} /> */}
                        <Route element={<CurrentSchoolProvider />}>
                          <Route path="teachers/" element={<TeacherTable />} />
                          <Route path="classrooms/" element={<Outlet />} >
                            <Route index element={<ClassroomPage />} />
                            <Route path=":classroomId/calendar" element={<Outlet />} >
                              <Route index element={<CalendarMainMain view='agenda' />} />
                              <Route path="day/" element={<CalendarMainMain view='day' />} />
                              <Route path="month/" element={<CalendarMainMain view='month' />} />
                              <Route path="week/" element={<CalendarMainMain view='week' />} />
                              <Route path="year/" element={<CalendarMainMain view='year' />} />
                            </Route>

                          </Route>
                          <Route path="calendar/"  >
                            <Route index element={<CalendarMain view='agenda' />} />
                            <Route path="day/" element={<CalendarMain view='day' />} />
                            <Route path="month/" element={<CalendarMain view='month' />} />
                            <Route path="week/" element={<CalendarMain view='week' />} />
                            <Route path="year/" element={<CalendarMain view='year' />} />

                          </Route>

                        </Route>
                      </Route>
                    </Route>
                  </Route>

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AuthProvider>
            </Router>
          </NetworkStatusGuard>
        </QueryClientProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
