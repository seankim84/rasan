import type { Locale } from "./config";

const vi = {
  common: {
    brand: "RA SÂN",
    city: "Hồ Chí Minh",
    login: "Đăng nhập",
    reservations: "Lịch của tôi",
    home: "Trang chủ",
    explore: "Tìm trận",
    profile: "Tài khoản",
    reset: "Xóa bộ lọc",
  },
  matches: {
    heroTitle: "Chọn trận. Giữ chỗ. Ra sân.",
    heroDescription: "Tìm trận phù hợp và đặt chỗ trong vài phút.",
    heroBadge: "Futsal tại Sài Gòn",
    listTitle: "Trận sắp diễn ra",
    listDescription: "Chọn ngày và tìm một trận vừa lịch của bạn.",
    today: "Hôm nay",
    district: "Khu vực",
    allDistricts: "Tất cả khu vực",
    evening: "Buổi tối",
    spotsAvailable: "Còn chỗ",
    allFilters: "Bộ lọc",
    duration: "{minutes} phút",
    spotsLeft: "Còn {count} chỗ",
    almostFull: "Sắp đầy",
    full: "Hết chỗ",
    onsite: "Thanh toán tại sân",
    pricePerPerson: "mỗi người",
    emptyTitle: "Không có trận phù hợp",
    emptyDescription: "Hãy thử ngày khác hoặc xóa bớt bộ lọc.",
    errorTitle: "Không thể tải danh sách trận",
    errorDescription: "Vui lòng thử lại sau ít phút.",
    retry: "Thử lại",
    viewMatch: "Xem trận tại {venue}",
  },
} as const;

export type Messages = {
  common: { [K in keyof typeof vi.common]: string };
  matches: { [K in keyof typeof vi.matches]: string };
};

const ko: Messages = {
  common: {
    brand: "RA SÂN",
    city: "호찌민",
    login: "로그인",
    reservations: "내 예약",
    home: "홈",
    explore: "경기 찾기",
    profile: "내 정보",
    reset: "필터 초기화",
  },
  matches: {
    heroTitle: "경기를 고르고, 예약하고, 뛰러 가세요.",
    heroDescription: "나에게 맞는 풋살 경기를 몇 분 안에 예약하세요.",
    heroBadge: "사이공 풋살",
    listTitle: "다가오는 경기",
    listDescription: "날짜를 선택하고 일정에 맞는 경기를 찾아보세요.",
    today: "오늘",
    district: "지역",
    allDistricts: "모든 지역",
    evening: "저녁 경기",
    spotsAvailable: "자리 있음",
    allFilters: "필터",
    duration: "{minutes}분",
    spotsLeft: "{count}자리 남음",
    almostFull: "마감 임박",
    full: "마감",
    onsite: "현장 결제",
    pricePerPerson: "1인",
    emptyTitle: "조건에 맞는 경기가 없습니다",
    emptyDescription: "다른 날짜를 선택하거나 필터를 초기화해 보세요.",
    errorTitle: "경기 목록을 불러오지 못했습니다",
    errorDescription: "잠시 후 다시 시도해 주세요.",
    retry: "다시 시도",
    viewMatch: "{venue} 경기 보기",
  },
};

const en: Messages = {
  common: {
    brand: "RA SÂN",
    city: "Ho Chi Minh City",
    login: "Log in",
    reservations: "My bookings",
    home: "Home",
    explore: "Find a match",
    profile: "Profile",
    reset: "Reset filters",
  },
  matches: {
    heroTitle: "Pick a match. Save your spot. Play.",
    heroDescription: "Find the right futsal match and book in minutes.",
    heroBadge: "Futsal in Saigon",
    listTitle: "Upcoming matches",
    listDescription: "Choose a date and find a match that fits your schedule.",
    today: "Today",
    district: "District",
    allDistricts: "All districts",
    evening: "Evening",
    spotsAvailable: "Spots left",
    allFilters: "Filters",
    duration: "{minutes} min",
    spotsLeft: "{count} spots left",
    almostFull: "Almost full",
    full: "Full",
    onsite: "Pay at venue",
    pricePerPerson: "per player",
    emptyTitle: "No matching games",
    emptyDescription: "Try another date or clear some filters.",
    errorTitle: "Matches could not be loaded",
    errorDescription: "Please try again in a few minutes.",
    retry: "Try again",
    viewMatch: "View match at {venue}",
  },
};

export const messages: Record<Locale, Messages> = { vi, ko, en };

export function getMessages(locale: Locale): Messages {
  return messages[locale];
}

export function interpolate(template: string, values: Record<string, string | number>): string {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replace(`{${key}}`, String(value)),
    template,
  );
}
