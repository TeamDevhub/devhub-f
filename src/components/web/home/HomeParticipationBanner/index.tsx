import ParticipationCard from '@/components/web/home/ParticipationCard';
import { PARTICIPATION_BANNERS } from '@/constants/participationBanners';

// 홈 화면 - 프로젝트 생성/게시글 작성/스킬 관리로 사용자를 유도하는 참여 CTA 섹션
export default function HomeParticipationBanner() {
  return (
    <div className="participation-banner flex-col gap-8">
      <div className="title-area align-center justify-between">
        <div className="title-text flex-col gap-4">
          <strong className="align-center gap-8">
            <span aria-hidden="true">⚡</span>
            지금 바로 시작해보세요
          </strong>
          <p className="section-desc">프로젝트를 만들고, 이야기를 나누고, 나를 소개해보세요</p>
        </div>
      </div>
      <div className="participation-grid">
        {PARTICIPATION_BANNERS.map((banner) => (
          <ParticipationCard key={banner.key} banner={banner} />
        ))}
      </div>
    </div>
  );
}
