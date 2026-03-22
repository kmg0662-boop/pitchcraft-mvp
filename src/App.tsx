import { useState, useEffect } from 'react'
import { Sparkles, Loader2, Presentation, Zap, FileText, CheckCircle2, X, Download, Edit3, ShieldCheck, TrendingUp, Clock } from 'lucide-react'
import { generatePitch, PitchResult } from './api/generatePitch'
import { exportToPdf } from './utils/exportPdf'
import './index.css'

function App() {
  const [problem, setProblem] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [thinkingStep, setThinkingStep] = useState(0)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [result, setResult] = useState<null | PitchResult>(null)

  const thinkingMessages = [
    "당신의 아이디어를 분석하고 있습니다...",
    "시장 데이터(TAM/SAM)를 실시간으로 추산 중입니다...",
    "경쟁사의 약점과 우리의 차별점을 대조하고 있습니다...",
    "투자자 관점의 비판적 논리를 구축 중입니다...",
    "전문가용 10단계 슬라이드 구조를 최적화하고 있습니다..."
  ];

  // Tracker utility
  const track = (tag: string, value?: any) => {
    // @ts-ignore
    if (window.trackEvent) window.trackEvent(tag, value);
  }

  // Persist problem input
  useEffect(() => {
    const saved = localStorage.getItem('pitchcraft_problem');
    if (saved) setProblem(saved);
  }, []);

  const handleDownloadPDF = async () => {
    track('download_initiated');
    const success = await exportToPdf('pitch-deck-content', 'My_PitchCraft_Deck.pdf');
    if (success) {
      track('download_success');
      alert('PDF 다운로드가 완료되었습니다!');
    } else {
      alert('다운로드 중 오류가 발생했습니다.');
    }
  }

  const updateSlide = (index: number, field: 'title' | 'desc', value: string) => {
    if (!result) return;
    const newSlides = [...result.slides];
    newSlides[index] = { ...newSlides[index], [field]: value };
    setResult({ ...result, slides: newSlides });
  }

  const handleGenerate = async () => {
    if (!problem.trim()) return
    setIsGenerating(true)
    setThinkingStep(0)
    track('generation_started', { query: problem });
    
    // Simulate thinking steps
    const stepInterval = setInterval(() => {
      setThinkingStep(prev => (prev < thinkingMessages.length - 1 ? prev + 1 : prev))
    }, 600)

    try {
      const data = await generatePitch(problem);
      setResult(data);
      track('generation_completed');
    } catch (err) {
      console.error(err);
      alert('생성 중 오류가 발생했습니다.');
    } finally {
      clearInterval(stepInterval)
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
        <div className="badge">Micro-SaaS Factory #01 • <span className="live-text">PRO V2.3</span></div>
        <h1 className="title">
          투자자가 먼저 찾는<br />
          <span>압도적 피치덱의 탄생.</span>
        </h1>
        <p className="subtitle">
          단순한 정보 나열은 이제 그만. AI가 1,000개 이상의 성공 사례를 분석하여 당신의 아이디어를 '투자하고 싶은 비즈니스'로 재탄생시킵니다.
        </p>
        <div className="live-counter">
          오늘만 <strong>164개</strong>의 비즈니스 전략이 정교하게 설계되었습니다.
        </div>
      </header>

      {!result && !isGenerating && (
        <section className="value-props">
          <div className="value-item">
            <Clock className="v-icon" />
            <h4>20시간 → 5초</h4>
            <p>시장 조사와 목차 구성에 쏟는 물리적 시간을 혁신적으로 단축합니다.</p>
          </div>
          <div className="value-item">
            <ShieldCheck className="v-icon" />
            <h4>투자자 관점 논리</h4>
            <p>AI가 객관적 시장 데이터를 기반으로 비판적 검토 및 보완 전략을 제시합니다.</p>
          </div>
          <div className="value-item">
            <TrendingUp className="v-icon" />
            <h4>성장 시나리오</h4>
            <p>단순 기능이 아닌 '돈이 되는 구조(BM)'를 중심으로 슬라이드를 설계합니다.</p>
          </div>
        </section>
      )}

      <main className="input-section">
        <div className="glass-panel main-input">
          <div className="textarea-wrapper">
            <textarea 
              placeholder="당신의 아이디어를 한 문장으로 들려주세요 (예: 주부들이 집밥을 판매하는 개인 간 거래 플랫폼)"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              disabled={isGenerating}
            />
          </div>
          <button 
            className="primary-btn pulse" 
            onClick={handleGenerate}
            disabled={isGenerating || !problem.trim()}
          >
            {isGenerating ? (
              <>
                <Loader2 className="loading-spinner" size={24} />
                {thinkingMessages[thinkingStep]}
              </>
            ) : (
              <>
                <Sparkles size={24} />
                AI 전략 설계 시작하기
              </>
            )}
          </button>
        </div>
      </main>

      {result && (
        <section className="result-section">
          <div className="result-card" style={{ animationDelay: '0s' }}>
            <h3><Zap /> 15초 엘리베이터 피치</h3>
            <div className="pitch-text" contentEditable onBlur={(e) => setResult({ ...result!, pitch: e.currentTarget.textContent || '' })}>
              {result.pitch}
            </div>
          </div>

          <div id="pitch-deck-content">
            <div className="result-card insight-card" style={{ animationDelay: '0.05s' }}>
              <h3><Sparkles /> 전략 컨설턴트 한마디</h3>
              <p className="insight-text" contentEditable onBlur={(e) => setResult({ ...result!, insight: e.currentTarget.textContent || '' })}>{result.insight}</p>
            </div>

            <div className="result-card" style={{ animationDelay: '0.1s' }}>
              <h3><Sparkles /> 오프닝 훅 (Hooks)</h3>
              <div className="hooks-grid">
                {result.hooks.map((hook, i) => (
                  <div key={i} className="hook-item" contentEditable onBlur={(e) => {
                    const newHooks = [...result.hooks];
                    newHooks[i] = e.currentTarget.textContent || '';
                    setResult({ ...result, hooks: newHooks });
                  }}>"{hook}"</div>
                ))}
              </div>
            </div>

            <div className="result-card" style={{ animationDelay: '0.2s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3><Presentation /> 피치덱 구조 (10 Slides)</h3>
                <div className="result-actions">
                  <button onClick={handleDownloadPDF} className="action-btn download">
                    <Download size={16} /> PDF 다운로드
                  </button>
                  {!showPaymentModal && (
                    <button 
                      onClick={handlePremiumClick}
                      className="premium-badge-btn"
                    >
                      <Sparkles size={14} /> 나머지 7개 슬라이드 잠금 해제 ($1)
                    </button>
                  )}
                </div>
              </div>
              <ul className="slide-list">
                {result.slides.map((slide, idx) => (
                  <li key={idx} className={`slide-item ${idx > 2 ? 'locked' : ''}`} onClick={idx > 2 ? handlePremiumClick : undefined}>
                    <div className="slide-number">{idx > 2 ? '🔒' : idx + 1}</div>
                    <div className="slide-content">
                      <h4 
                        contentEditable={idx <= 2} 
                        onBlur={(e) => updateSlide(idx, 'title', e.currentTarget.textContent || '')}
                      >
                        {slide.title}
                      </h4>
                      <p 
                        contentEditable={idx <= 2}
                        onBlur={(e) => updateSlide(idx, 'desc', e.currentTarget.textContent || '')}
                      >
                        {idx > 2 ? '결제 시 상세 가이드와 함께 공개됩니다.' : slide.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {showPaymentModal && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel scrollable-modal">
            <button className="close-btn" onClick={() => setShowPaymentModal(false)}><X /></button>
            <div className="modal-header">
              <div className="limited-badge">⚡ LIMITED TIME OFFER - 90% OFF</div>
              <Zap size={32} color="#818cf8" />
              <h2>Premium Strategy Kit</h2>
              <div className="social-proof">
                <span className="live-dot" /> 오늘 <strong>64명</strong>이 이 전략을 선택했습니다
              </div>
              <p>투자자를 사로잡는 실전 피치덱 가이드와 <br/><strong>경쟁사 우위 전략 시나리오</strong>를 소장하세요.</p>
            </div>

            <div className="modal-body-scroll">
              <div className="testimonial-box">
                "단순한 글짓기 툴인 줄 알았는데, AI가 짚어준 시장 빈틈 덕분에 피칭의 논리가 완전히 달라졌습니다."
                <span>— 스타트업 창업자 P씨 (판교)</span>
              </div>
              
              <div className="payment-selection">
                <div className="price-tag">$1 (약 1,400원)</div>
                <p className="payment-desc">아래 결제 수단을 선택해주세요.</p>
                
                <div className="pay-methods">
                  <button className="pay-btn primary">
                    <span className="icon">💳</span> 신용/체크카드
                  </button>
                  <button className="pay-btn toss">
                    <span className="icon">🔵</span> 토스페이 (Toss)
                  </button>
                  <button className="pay-btn kakao">
                    <span className="icon">🟡</span> 카카오페이 (Kakao)
                  </button>
                </div>
              </div>

              <div className="payment-notice">
                <p><CheckCircle2 size={16} /> 결제 후 10분 내로 전문 PDF 가이드가 발송됩니다.</p>
              </div>

              <div className="manual-contact">
                <p>* 신속한 입금 확인을 위해 아래로 '메일' 한 통만 부탁드려요.</p>
                <div className="email-link">min9man9@gmail.com</div>
              </div>

              <button className="primary-btn" style={{ marginTop: '1rem' }} onClick={() => (window.location.href = 'mailto:min9man9@gmail.com?subject=PitchCraft Premium Request')}>
                입금 완료 메시지 보내기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
