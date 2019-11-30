export interface BanData {
  id: string;
  customerID: string;
  reason: string;
}

export type NewBanData = Omit<BanData, "id">;

export interface BanAppealData {
  message: string;
  id: string;
  resolution: string;
  banID: string;
}

export type NewBanAppealData = Omit<BanAppealData, "id" | "resolution">;
