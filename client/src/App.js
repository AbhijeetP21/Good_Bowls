/**
 * App Component
 * Main application component with routing
 * 
 * Migration Note: This file uses the legacy routing approach.
 * For the new router-based approach, see src/app/router.js
 * Migrate incrementally by importing from new structure.
 */
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { verifyToken } from './features/auth/authSlice';
import { setUserData } from './actions/userAction.js';
import PageTransition from './Components/PageTransition';
import './index.css';

// Screen imports
import Addbases from './Screens/Addbases.js';
import AddBowl from './Screens/AddBowl.js';
import Addtopping from './Screens/Addtopping.js';
import AdminScreen from './Screens/AdminScreen/AdminScreen';
import Baseslist from './Screens/Baseslist.js';
import CartScreen from './Screens/CartScreen/CartScreen';
import Editbase from './Screens/Editbase.js';
import EditBowl from './Screens/EditBowl';
import Edittopping from './Screens/Edittopping.js';
import EmailVerify from './Screens/EmailVerify';
import ForgotPassword from './Screens/ForgotPassword';
import Home from './Screens/Home';
import Login from './Screens/Login';
import BuildBowlScreen from './Screens/BuildBowl/BuildBowlScreen';
import OrderScreen from './Screens/OrderScreen/OrderScreen';
import Orderslist from './Screens/Orderslist.js';
import PasswordReset from './Screens/PasswordReset';
import BowlList from './Screens/BowlList.js';
import Signup from './Screens/Signup';
import Toppingslist from './Screens/Toppingslist.js';
import Userslist from './Screens/Userslist.js';
import AccountScreen from './Screens/AccountScreen/AccountScreen';

function App() {
	const [isAdmin, setIsAdmin] = useState(false);

	// Support both new auth state and legacy state
	const authState = useSelector((state) => state.auth);
	const userstate = useSelector((state) => state.setUserData);

	// Prefer new auth state, fallback to legacy
	const user = authState?.user || userstate?.userData;

	const dispatch = useDispatch();

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			// Use new RTK auth action
			dispatch(verifyToken())
				.unwrap()
				.then((result) => {
					if (result?.user?.role === 'admin') {
						setIsAdmin(true);
					}
					// Also dispatch to legacy reducer for backward compatibility
					if (result?.user) {
						dispatch(setUserData(result.user));
					}
				})
				.catch((err) => {
					console.log('Token verification failed:', err);
				});
		}
	}, [dispatch]);

	// Update isAdmin when user changes
	useEffect(() => {
		if (user?.role === 'admin') {
			setIsAdmin(true);
		}
	}, [user]);

	const token = localStorage.getItem('token');
	const location = useLocation();

	// Show nothing (or a loader) while we verify the token
	// If token exists but we haven't confirmed the user role yet, wait.
	if (token && !user?.role) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
				<div className="spinner-border text-success" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
				<p style={{ marginTop: '1rem', color: '#22c55e', fontWeight: 'bold' }}>Loading Good Bowl...</p>
			</div>
		);
	}

	return (
		<AnimatePresence exitBeforeEnter>
			<Routes location={location} key={location.pathname}>
				<Route path='/signup' element={<PageTransition>{user?.role ? <Navigate to="/home" /> : <Signup />}</PageTransition>} />
				<Route path='/login' element={<PageTransition>{user?.role ? <Navigate to="/home" /> : <Login />}</PageTransition>} />
				<Route path='/users/:id/verify/:token' element={<PageTransition><EmailVerify /></PageTransition>} />
				<Route path='/forgot-password' element={<PageTransition><ForgotPassword /></PageTransition>} />
				<Route
					path='/password-reset/:id/:token'
					element={<PageTransition><PasswordReset /></PageTransition>}
				/>

				{user?.role && (
					<>
						<Route path='/home' element={<PageTransition><Home /></PageTransition>} />
						<Route path='/cart' element={<PageTransition><CartScreen /></PageTransition>} />
						<Route path='/build-bowl' element={<PageTransition><BuildBowlScreen /></PageTransition>} />
						<Route path='/myorders' element={<PageTransition><OrderScreen /></PageTransition>} />
						<Route path='/account' element={<PageTransition><AccountScreen /></PageTransition>} />
					</>
				)}

				{isAdmin && (
					<>
						<Route path='/admin' element={<PageTransition><AdminScreen /></PageTransition>} />
						<Route path='/admin/addbowl' element={<PageTransition><AddBowl /></PageTransition>} />
						<Route path='/admin/userslist' element={<PageTransition><Userslist /></PageTransition>} />
						<Route path='/admin/orderslist' element={<PageTransition><Orderslist /></PageTransition>} />
						<Route path='/admin/bowlslist' element={<PageTransition><BowlList /></PageTransition>} />
						<Route
							path='/admin/editbowl/:bowlid'
							element={<PageTransition><EditBowl /></PageTransition>}
						/>
						<Route path='/admin/baseslist' element={<PageTransition><Baseslist /></PageTransition>} />
						<Route path='/admin/addbases' element={<PageTransition><Addbases /></PageTransition>} />
						<Route
							path='/admin/editbase/:baseid'
							element={<PageTransition><Editbase /></PageTransition>}
						/>
						<Route
							path='/admin/toppingslist'
							element={<PageTransition><Toppingslist /></PageTransition>}
						/>
						<Route path='/admin/addtopping' element={<PageTransition><Addtopping /></PageTransition>} />
						<Route
							path='/admin/edittopping/:toppingid'
							element={<PageTransition><Edittopping /></PageTransition>}
						/>
					</>
				)}
				<Route path='/' element={<Navigate to={user?.role ? '/home' : '/login'} replace />} />
				<Route path='*' element={<Navigate to={user?.role ? '/home' : '/login'} replace />} />
			</Routes>
		</AnimatePresence>
	);
}

export default App;
