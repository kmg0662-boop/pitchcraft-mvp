export interface PitchResult {
  pitch: string;
  hooks: string[];
  slides: Array<{ title: string, desc: string }>;
  insight: string; // 추가된 '전문가 한마디'
}

export const generatePitch = async (problem: string): Promise<PitchResult> => {
  // Simulate AI deep thinking
  await new Promise(resolve => setTimeout(resolve, 3000));

  // 더 정교해진 분석 결과 시뮬레이션 (입력값에 따른 분기 가능하도록 설계)
  const isPlatform = problem.includes('플랫폼') || problem.includes('연결');
  
  return {
    pitch: `${isPlatform ? '네트워크 효과를 기반으로 시장을 독점할' : '독보적인 기술 효율성으로'} 혁신적인 솔루션을 제안합니다. "${problem}"은(는) 단순히 기능을 넘어 기존 시장의 80% 비효율을 해결하는 게임 체인저가 될 것입니다. 우리는 초기 런칭 6개월 내에 1만 명의 활성 사용자를 확보하고, 시장 점유율 1위로 도약하는 구체적인 로드맵을 보유하고 있습니다.`,
    
    hooks: [
      `"시장의 92%가 이 문제를 '어쩔 수 없는 비용'으로 치부할 때, 우리는 그것을 '수익'으로 바꾸었습니다."`,
      `"고객이 이 서비스를 만나는 순간, 기존의 방식은 즉시 '과거의 유물'이 됩니다."`,
      `"우리는 단순히 제품을 파는 것이 아니라, 새로운 '산업 표준'을 설정하고 있습니다."`
    ],
    
    slides: [
      { title: '1. 문제상황 (Problem Detail)', desc: '연간 2조 원 규모의 매몰 비용이 발생하는 구조적 비효율성 데이터 제시' },
      { title: '2. 해결책 (Solution Architecture)', desc: '독자적인 AI/데이터 엔진을 통한 10배 빠른 문제 해결 프로세스 시뮬레이션' },
      { title: '3. 시장 규모 (Market Dynamics)', desc: 'TAM 10조, SOM 1000억 원 규모의 타겟 세그먼트 분석 및 확장 전략' },
      { title: '4. 차별점 (Unfair Advantage)', desc: '🔒 특허 기반 알고리즘 및 초기 데이터 선점을 통한 강력한 진입 장벽 (Moat)' },
      { title: '5. 비즈니스 모델 (Revenue Logic)', desc: '🔒 SaaS 구독 + 거래 수수료 + 데이터 API 판매를 통한 다각화된 수익 구조' },
      { title: '6. 시장 진입 (Go-to-Market)', desc: '🔒 타겟 커뮤니티 선점 및 바이럴 루프를 활용한 CAC 50% 절감 마케팅 플랜' },
      { title: '7. 진행 현황 (Traction)', desc: '🔒 이미 20개의 잠재 고객사와 체결된 MOU 및 베타 테스트 결과 지표' },
      { title: '8. 재무 계획 (Financials)', desc: '🔒 Break-even Point(BEP) 달성 시점 및 향후 5년간의 J-Curve 성장 곡선' },
      { title: '9. 투자 요청 (The Ask)', desc: '🔒 10억 원 규모의 시드 투자 요청 및 각 단계별 자금 집행(R&D 50%, 마케팅 30%) 계획' },
      { title: '10. 비전 (The Future)', desc: '🔒 이 시장의 독점적 운영 체제(OS)가 될 우리의 최종 모습' }
    ],

    insight: `[CEO 망구의 전략 제안]: 이 아이템은 ${isPlatform ? '공급자 확보(Supply-side)' : '초기 기술 신뢰도'}가 성공의 핵심입니다. 피치덱의 5번 슬라이드에서 이 부문을 특히 강조하는 전략을 추천합니다.`
  };
};
