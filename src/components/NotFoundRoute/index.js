import './index.css'
import Header from '../Header'

const NotFoundRoute = () => (
  <>
    <Header />
    <div className="not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
      />
      <h1>Page Not Found</h1>
      <p>We re sorry, the page you requested could not found</p>
    </div>
  </>
)

export default NotFoundRoute
