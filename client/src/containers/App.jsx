import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout, AdminLayout, AuthLayout } from '../Layouts';
import { AdminApps, AdminHome,AdminUser,Authentication,Detail,Home, UserProfile } from '../pages';
//import { auth } from '../config/firebase.config';
import {QueryClient, QueryClientProvider} from "react-query"
import {ReactQueryDevtools} from "react-query/devtools"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
const App = () => {

  
  
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:appid" element={<Detail />} />
          <Route path="/profile" element={<UserProfile />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route path='/admin' element= {<AdminLayout />}>
          <Route path='home' element={<AdminHome />} />
          <Route path='apps' element={<AdminApps />} />
          <Route path='users' element={<AdminUser />} />
        </Route>

        {/* Auth Layout*/}
        <Route path='/auth/*' >
          <Route index element={<Authentication />} />
        </Route>

      </Routes>
    </Suspense>

    {/*enable the dev tools to handle the state library */}
    <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
    <ToastContainer position='top-right' theme='dark' ></ToastContainer>
    </QueryClientProvider>
  );
};

export default App;
