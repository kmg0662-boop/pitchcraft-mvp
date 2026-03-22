import { useState } from 'react'
import { Sparkles, Loader2, Presentation, Zap, FileText } from 'lucide-react'
import './index.css'

function App() {
  const [problem, setProblem] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState<null | { pitch: string, slides: Array<{ title: string, desc: string }> }>(null)

  const handleGenerate = () => {
    if (!problem.trim()) return
    setIsGenerating(true)
    
    // Simulate AI Generation API call
    setTimeout(() => {
      setResult({
        pitch: `이 시장에서 해결되지 않았던 본질적인 문제를 데이터 기반으로 접근합니다. ${problem} 우리는 독자적인 AI 기술을 통해 기존 대비 10배 빠른 솔루션을 제공하며, 글로벌 Niche Market에서 폭발적인 성장을 증명할 것입니다.`,
        slides: [
          { title: '문제상황 (The Problem)', desc: '시장의 비효율성과 고객이 겪고 있는 명확한 Pain-Point 제시' },
          { title: '해결책 (The Solution)', desc: '우리 제품이 어떻게 문제를 압도적으로 해결하는지 (Demo/Screenshot)' },
          { title: '타겟 시장 (Market Size)', desc: 'TAM, SAM, SOM 구조로 확장 가능한 시장 규모 증명' },
          { title: '핵심 경쟁력 (Unfair Advantage)', desc: '경쟁사가 쉽게 모방할 수 없는 AI 기술력이나 특허, 운영 노하우' },
          { title: '비즈니스 모델 (Revenue Model)', desc: '돈을 버는 구조 및 SaaS 구독 기반의 수익 창출 로직' },
          { title: '시장 진출 전략 (Go-to-Market)', desc: '초기 고객 100명을 모을 구체적이고 실현 가능한 채널 전략' },
          { title: '경쟁사 분석 (Competition)', desc: '경쟁사 대비 우위 요소(2x2 매트릭스 또는 기능 비교표)' },
          { title: '팀 멤버 (The Team)', desc: '이 문제를 풀기에 왜 우리 팀이 가장 최적인지 증명' },
          { title: '재무 예측 (Financial Projections)', desc: '향후 3년간의 성장 추이 및 주요 지표 (CAC, LTV)' },
          { title: '투자 요청 (The Ask)', desc: '필요 자금과 구체적인 사용 계획(마일스톤 달성 전략)' }
        ]
      })
      setIsGenerating(false)
    }, 2500)
  }

  return (
    <div className="app-container">
      <header className="hero">
        <div className="badge">AntiGravity MVP 01</div>
        <h1 className="title">
          당신의 아이디어를<br />
          <span>5초 만에 피치덱으로.</span>
        </h1>
        <p className="subtitle">
          한 두 문장만 입력하세요. AI가 투자자를 사로잡는 엘리베이터 피치와 10장의 완벽한 투자유치 슬라이드 구조를 자동으로 완성해 드립니다.
        </p>
      </header>

      <main className="input-section">
        <div className="glass-panel">
          <div className="textarea-wrapper">
            <textarea 
              placeholder="예: 우리 동네 남는 빵을 50% 할인해서 팔 수 있는 중개 플랫폼을 만들고 싶어. 소상공인은 폐기율을 줄이고, 소비자는 싸게 사고."
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
            />
          </div>
          <button 
            className="primary-btn" 
            onClick={handleGenerate}
            disabled={isGenerating || !problem.trim()}
          >
            {isGenerating ? (
              <>
                <Loader2 className="loading-spinner" size={24} />
                데이터 분석 및 구조화 중...
              </>
            ) : (
              <>
                <Sparkles size={24} />
                무료로 시작하기
              </>
            )}
          </button>
        </div>
      </main>

      {result && (
        <section className="result-section">
          <div className="result-card" style={{ animationDelay: '0s' }}>
            <h3><Zap /> 15초 엘리베이터 피치</h3>
            <div className="pitch-text">
              {result.pitch}
            </div>
          </div>

          <div className="result-card" style={{ animationDelay: '0.2s' }}>
            <h3><Presentation /> 피치덱 구조 (10 Slides)</h3>
            <ul className="slide-list">
              {result.slides.map((slide, idx) => (
                <li key={idx} className="slide-item">
                  <div className="slide-number">{idx + 1}</div>
                  <div className="slide-content">
                    <h4>{slide.title}</h4>
                    <p>{slide.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  )
}

export default App
