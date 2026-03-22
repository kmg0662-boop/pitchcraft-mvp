import { useState } from 'react'
import { Sparkles, Loader2, Presentation, Zap, FileText, CheckCircle2, X } from 'lucide-react'
import { generatePitch, PitchResult } from './api/generatePitch'
import './index.css'

function App() {
  const [problem, setProblem] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [result, setResult] = useState<null | PitchResult>(null)

  // Tracker utility
  const track = (tag: string, value?: any) => {
    // @ts-ignore
    if (window.trackEvent) window.trackEvent(tag, value);
  }

  const handleGenerate = async () => {
    if (!problem.trim()) return
    setIsGenerating(true)
    track('generation_started', { query: problem });
    
    try {
      const data = await generatePitch(problem);
      setResult(data);
      track('generation_completed');
    } catch (err) {
      console.error(err);
      alert('생성 중 오류가 발생했습니다.');
    } finally {
      setIsGenerating(false);
    }
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
