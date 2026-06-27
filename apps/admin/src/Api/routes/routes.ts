import ENV from '@/config/env.variables';

// type ApiRoutes = {
//   [x: string]: (() => string) | ((id: string) => string) | ApiRoutes;
// };

const apiRoutes = {
  baseUrl: () => ENV.BASE_URL,
  health: () => '/health' as const, // ! make this api
  auth: {
    me: () => '/auth/me' as const,
    signIn: () => '/auth/login' as const,
    refresh: () => '/auth/refresh' as const,
    signUp: () => '/auth/register' as const,
    oAuthSignIn: () => '/auth/oauth/login' as const,
  },
  users: {
    getUsers: () => '/users' as const,
    createUserProfile: () => '/users/' as const,
    updateUserProfile: (id: string) => `/users/${id}` as const,
    deleteUserProfile: (id: string) => `/users/${id}` as const,
    disableUser: (id: string) => `/users/${id}/disable/` as const,
    enableUser: (id: string) => `/users/${id}/enable/` as const,
  },
  products: {
    getProducts: () => '/products' as const,
    createProduct: () => '/products/' as const,
    updateProduct: (id: string) => `/products/${id}` as const,
    deleteProduct: (id: string) => `/products/${id}` as const,
  },

  notification: {
    getPage: () => '/notification' as const,
    createNotification: () => '/notification/' as const,
  },

  services: {
    emailContactUs: () => '/services/email/contact-us' as const,
    emailProperty: () => '/services/email/property' as const,
  },

  media: {
    presignedUrl: () => '/media/presigned-url' as const,
  },

  classroom: {
    create: (schoolId: string) => `/schools/${schoolId}/classrooms` as const,
    update: (schoolId: string, id: string) => `/schools/${schoolId}/classrooms/${id}` as const,
    getPage: (schoolId: string) => `/schools/${schoolId}/classrooms` as const,
    getById: (schoolId: string, id: string) => `/schools/${schoolId}/classrooms/${id}` as const,
    delete: (schoolId: string, id: string) => `/schools/${schoolId}/classrooms/${id}` as const,
    exams: (schoolId: string, id: string) => `/schools/${schoolId}/classrooms/${id}/exams` as const,
  },

  teachers: {
    create: (schoolId: string) => `/schools/${schoolId}/teachers` as const,
    update: (schoolId: string, id: string) => `/schools/${schoolId}/teachers/${id}` as const,
    getPage: (schoolId: string) => `/schools/${schoolId}/teachers` as const,
    getById: (schoolId: string, id: string) => `/schools/${schoolId}/teachers/${id}` as const,
    delete: (schoolId: string, id: string) => `/schools/${schoolId}/teachers/${id}` as const,
  },

  images: () => ENV.BASE_URL + '/images/',
};

export default apiRoutes;
