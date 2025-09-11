import CardsSection from './components/cards-section'
import Footer from './components/footer'
import HeroSection from './components/hero-section'
import Navbar from './components/navbar'
import { UserPage } from './pages/user'
import { useAuthStore } from './stores/auth.store'

const HomePage = () => {
	const { isAuthenticated } = useAuthStore()
	return (
		<>
			<Navbar />
			{isAuthenticated ? (
				<UserPage />
			) : (
				<>
					<HeroSection />
					<CardsSection />
				</>
			)}
			<Footer />
		</>
	)
}

export default HomePage
