import { BrowserRouter } from 'react-router-dom'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import JournalList from '../components/journalList/JournalList'
import NumberOfEntries from '../components/numberOfEntries/NumberOfEntries'
import './App.css'

const App = () => {

  return (
    <BrowserRouter basename="/">
      <div className="app">
        <Header />

        <NumberOfEntries />
        
        <JournalList />

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App