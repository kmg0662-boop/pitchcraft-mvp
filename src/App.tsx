import { useState } from 'react'
import { Sparkles, Loader2, Presentation, Zap, FileText, CheckCircle2, X } from 'lucide-react'
import './index.css'

function App() {
  const [problem, setProblem] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [result, setResult] = useState<null | { 
    pitch: string, 
    hooks: string[],
    slides: Array<{ title: string, desc: string }> 
  }>(null)

  // Tracker utility
  const track = (tag: string, value?: any) => {
    // @ts-ignore
    if (window.trackEvent) window.trackEvent(tag, value);
  }

  const handleGenerate = () => {
    if (!problem.trim()) return
    setIsGenerating(true)
    track('generation_started', { query: problem });
    
    // Simulate AI Generation API call
    setTimeout(() => {
      setResult({
        pitch: `이 시장에서 해결되지 않았던 본질적인 문제를 데이터 기반으로 접근합니다. ${problem} 우리는 독자적인 AI 기술을 통해 기존 대비 10배 빠른 솔루션을 제공하며, 글로벌 Niche Market에서 폭발적인 성장을 증명할 것입니다.`,
        hooks: [
          "혹시 여러분은 이 문제를 해결하기 위해 매년 수조 원이 낭비되고 있다는 사실을 알고 계셨나요?",
          "고객이 문을 열고 들어오는 순간, 90%의 거래가 이미 실패하고 있다면 믿으시겠습니까?",
          "우리는 기술이 아니라, '시간'을 돌려드리는 비즈니스를 하고 있습니다."
        ],
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
      track('generation_completed');
    }, 2500)
  }

  const handlePremiumClick = () => {
    setShowPaymentModal(true)
    track('premium_button_clicked');
    console.log('Premium Click Tracked: Client shown payment info.')
  }

  return (
    <div className="app-container">
      <header className="hero">
        <div className="badge">AntiGravity MVP 02 • <span className="live-text">LIVE</span></div>
        <h1 className="title">
          당신의 아이디어를<br />
          <span>5초 만에 피치덱으로.</span>
        </h1>
        <p className="subtitle">
          한 두 문장만 입력하세요. AI가 투자자를 사로잡는 엘리베이터 피치와 10장의 완벽한 투자유치 슬라이드 구조를 자동으로 완성해 드립니다.
        </p>
        <div className="live-counter">
          오늘만 <strong>147개</strong>의 피치덱이 성공적으로 제안되었습니다.
        </div>
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

          <div className="result-card" style={{ animationDelay: '0.1s' }}>
            <h3><Sparkles /> 오프닝 훅 (Hooks)</h3>
            <div className="hooks-grid">
              {result.hooks.map((hook, i) => (
                <div key={i} className="hook-item">"{hook}"</div>
              ))}
            </div>
          </div>

          <div className="result-card" style={{ animationDelay: '0.2s' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3><Presentation /> 피치덱 구조 (10 Slides)</h3>
              {!showPaymentModal && (
                <button 
                  onClick={handlePremiumClick}
                  className="premium-badge-btn"
                >
                  <Sparkles size={14} /> 나머지 7개 슬라이드 잠금 해제 ($1)
                </button>
              )}
            </div>
            <ul className="slide-list">
              {result.slides.map((slide, idx) => (
                <li key={idx} className={`slide-item ${idx > 2 ? 'locked' : ''}`} onClick={idx > 2 ? handlePremiumClick : undefined}>
                  <div className="slide-number">{idx > 2 ? '🔒' : idx + 1}</div>
                  <div className="slide-content">
                    <h4>{slide.title}</h4>
                    <p>{idx > 2 ? '결제 시 상세 가이드와 함께 공개됩니다.' : slide.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {showPaymentModal && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel">
            <button className="close-btn" onClick={() => setShowPaymentModal(false)}><X /></button>
            <div className="modal-header">
              <div className="limited-badge">⚡ LIMITED TIME OFFER - 90% OFF</div>
              <Zap size={32} color="#818cf8" />
              <h2>Premium Pitch Deck PDF</h2>
              <div className="social-proof">
                <span className="live-dot" /> 오늘 <strong>47명</strong>이 이 가이드를 선택했습니다
              </div>
              <p>투자자를 사로잡는 정석 피치덱 가이드를 소장하세요.</p>
            </div>

            <div className="testimonial-box">
              "이 구조 덕분에 실제 시드 미팅 3개가 잡혔어요!"
              <span>— 스타트업 창업자 K씨 (서울)</span>
            </div>
            
            <div className="payment-box">
              <div className="price-tag">$1 (약 1,400원)</div>
              <div className="account-info">
                <span className="label">입금 계좌 (토스뱅크)</span>
                <span className="account">1000 - 2549 - 6580</span>
                <span className="holder">예금주: 김민규</span>
              </div>
            </div>

            <div className="instructions">
              <p><CheckCircle2 size={16} /> 위 계좌로 입금 후 아래 메일로 '입금자명'을 보내주시면 10분 내로 전문 PDF 가이드를 발송해 드립니다.</p>
              <div className="email-contact">min9man9@gmail.com</div>
            </div>

            <button className="primary-btn" onClick={() => (window.location.href = 'mailto:min9man9@gmail.com?subject=PitchCraft Premium Request')}>
              입금 완료 후 메일 보내기
            </button>
            <p className="footer-note">* 수동 입금 확인 절차로 인해 다소 시간이 소요될 수 있습니다. (AI 망구 상시 대기 중)</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
