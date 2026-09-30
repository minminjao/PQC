import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import MainPage from './pages/MainPage'
import Threat1 from './pages/Threat1'
import Threat2 from './pages/Threat2'
import Threat3 from './pages/Threat3'
import Pqc1 from './pages/Pqc1'
import Pqc2 from './pages/Pqc2'
import Pqc3 from './pages/Pqc3'
import Pqc4 from './pages/Pqc4'
import Apply1 from './pages/Apply1'
import Apply2 from './pages/Apply2'
import Apply3 from './pages/Apply3'
import Myth1 from './pages/Myth1'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/threat/1" element={<Threat1 />} />
        <Route path="/threat/2" element={<Threat2 />} />
        <Route path="/threat/3" element={<Threat3 />} />
        <Route path="/pqc/1" element={<Pqc1 />} />
        <Route path="/pqc/2" element={<Pqc2 />} />
        <Route path="/pqc/3" element={<Pqc3 />} />
        <Route path="/pqc/4" element={<Pqc4 />} />
        <Route path="/apply/1" element={<Apply1 />} />
        <Route path="/apply/2" element={<Apply2 />} />
        <Route path="/apply/3" element={<Apply3 />} />
        <Route path="/myth/1" element={<Myth1 />} />
        <Route path="*" element={<MainPage />} />
      </Routes>
      <footer className="footer">
        PQC 학습 사이트 · 원본 자료: 『양자내성암호 기초』 및 쉬운설명본 노트북 (MegazoneCloud, 2026) ·{' '}
        <a href="https://qubit.donghwi.dev" target="_blank" rel="noreferrer">qubit.donghwi.dev</a>의 학습 방식을 참고했습니다.
      </footer>
    </>
  )
}
