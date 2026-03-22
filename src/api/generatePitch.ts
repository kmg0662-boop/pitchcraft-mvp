export interface PitchResult {
  pitch: string;
  hooks: string[];
  slides: Array<{ title: string, desc: string }>;
}

export const generatePitch = async (problem: string): Promise<PitchResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2500));

  return {
    pitch: `이 시장에서 해결되지 않았던 본질적인 문제를 데이터 기반으로 접근합니다. ${problem} 우리는 독자적인 AI 기술을 통해 기존 대비 10배 빠른 솔루션을 제공하며, 글로벌 Niche Market에서 폭발적인 성장을 증명할 것입니다.`,
    hooks: [
      "혹시 여러분은 이 문제를 해결하기 위해 매년 수조 원이 낭비되고 있다는 사실을 알고 계셨나요?",
      "고객이 문을 열고 들어오는 순간, 90%의 거래가 이미 실패하고 있다면 믿으시겠습니까?",
      "우리는 기술이 아니라, '시간'을 돌려드리는 비즈니스를 하고 있습니다."
    ],
    slides: [
      { title: '문제상황 (The Problem)', desc: '시장의 비효율성과 고객이 겪고 있는 명확한 Pain-Point 제시' },
      { title: '해결책 (The Solution)', desc: '우리 제품이 어떻게 문제를 압도적으로 해결하는지 (Demo/Screenshot)' },
      { title: '시장성 (Market Opportunity)', desc: 'TAM/SAM/SOM 분석 및 현재 시장의 급격한 변화 트렌드 설명' },
      { title: '차별점 (Unfair Advantage)', desc: '경쟁사 대비 우리가 가진 기술적/비즈니스적 독점력 (잠금 해제 필요)' },
      { title: '비즈니스 모델 (BM)', desc: '어떻게 돈을 벌 것인지? (구독, 수수료, 광고 등 BM 레이어)' },
      { title: '성장전략 (Go-to-Market)', desc: '초기 1,000명의 고객을 어떻게 확보할 것인지에 대한 구체적 플랜' },
      { title: '팀 구성 (Our Team)', desc: '이 문제를 해결하기 위해 모인 최고의 전문가 집단 소개' },
      { title: '수익 전망 (Financials)', desc: '향후 3개년 매출 추정 및 비용 구조 분석' },
      { title: '투자 요청 (The Ask)', desc: '얼마의 투자가 필요한지, 그 자금으로 어떤 마일스톤을 달성할지' },
      { title: '엔딩 (Vision)', desc: '우리가 만들고 싶은 미래의 모습과 마지막 강렬한 메시지' }
    ]
  };
};
