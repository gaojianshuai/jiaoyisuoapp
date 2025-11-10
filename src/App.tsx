import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from './components/ErrorBoundary'
import Layout from './components/Layout'
import Home from './pages/Home'
import Market from './pages/Market'
import Trade from './pages/Trade'
import Assets from './pages/Assets'
import Discover from './pages/Discover'
import Lending from './pages/Lending'
import Strategy from './pages/Strategy'
import Deposit from './pages/Deposit'
import Withdraw from './pages/Withdraw'
import Transfer from './pages/Transfer'
import Bills from './pages/Bills'
import Orders from './pages/Orders'
import CreateStrategy from './pages/CreateStrategy'
import C2CBuy from './pages/C2CBuy'
import C2COrder from './pages/C2COrder'
import C2CRecords from './pages/C2CRecords'

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/market" element={<Market />} />
            <Route path="/trade" element={<Trade />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/lending" element={<Lending />} />
            <Route path="/strategy" element={<Strategy />} />
            <Route path="/strategy/create" element={<CreateStrategy />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/bills" element={<Bills />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/c2c/buy" element={<C2CBuy />} />
            <Route path="/c2c/order" element={<C2COrder />} />
            <Route path="/c2c/records" element={<C2CRecords />} />
          </Routes>
        </Layout>
      </Router>
    </ErrorBoundary>
  )
}

export default App

