// /data/*.json の型。数値はすべてダミー（画面ではプレースホルダー表示が基本。CLAUDE.md 参照）

export type Season = "spring" | "summer" | "autumn" | "winter";

export type Vegetable = {
  id: string;
  name: string; // "[野菜名A]"
  furigana: string; // "[ふりがな]"
  region: string; // "[地域A]"
  area: "east" | "west"; // 絞り込み用のダミー区分
  seasons: Season[]; // 旬（絞り込み用）
  sowMonths: [number, number]; // 種まき（ダミー）
  daysToHarvest: number; // 収穫まで（ダミー）
  rarity: 1 | 2 | 3; // 絶滅危惧度（ダミー）
  difficulty: "easy" | "normal";
  planterOk: boolean;
  character: string[]; // この野菜の個性（3項目）
  growersCount: number; // 育てる人（ダミー）
  photoLabels: string[]; // 写真スライダーのラベル
  seed: {
    seedsPerPack: number; // ダミー
    storePrice: number; // 店頭価格（ダミー。必ず ecPrice より安い）
    ecPrice: number; // EC価格（ダミー）
    ecPoints: number; // ダミー
  };
  storeIds: string[];
  featuredToday: boolean; // 今日出会える伝統野菜
};

export type Store = {
  id: string;
  name: string; // "[店舗名A]"
  address: string; // "[住所]"
  distanceKm: number; // 並び替え用ダミー
  mapPos: { x: number; y: number }; // 仮地図上の位置（%）
  hours: string;
  coupon: string | null; // 来店クーポンの内容
};

export type Post =
  | {
      id: string;
      type: "diary";
      vegetableId: string;
      author: string;
      authorLevel: number;
      day: number;
      body: string;
      photoLabel: string;
      likes: number;
      comments: number;
    }
  | {
      id: string;
      type: "question";
      vegetableId: string;
      author: string;
      title: string;
      body: string;
      answers: { author: string; badge: "grower" | "producer" | null; body: string }[];
    }
  | {
      id: string;
      type: "wiki";
      vegetableId: string;
      title: string;
      region: string;
      editors: number;
      updatedAt: string;
      sections: { heading: string; body: string }[];
    };

export type Recipe = {
  id: string;
  vegetableIds: string[];
  title: string;
  author: string;
  byChef: boolean;
  ingredients: string[];
  steps: string[];
  usedOwnHarvest: boolean;
};

export type Listing = {
  id: string;
  vegetableId: string;
  amount: string; // "[量]"
  seller: string;
  sellerType: "grower" | "producer"; // 育てた人 / 生産者バッジ
  diaryCount: number;
  delivery: { ship: boolean; handoffArea: string | null };
  distanceKm: number;
  price: number; // ダミー
};

export type ChefShop = {
  id: string;
  name: string; // "[店舗名]"
  vegetableId: string;
  course: string;
};

export type ProjectPlan = {
  id: string;
  kind: "personal" | "corporate";
  label: string; // "¥[金額]" / "企業向け"
  title: string;
  description: string;
};

export type Project = {
  id: string;
  title: string;
  raised: number; // ダミー
  goal: number; // ダミー
  supporters: number;
  daysLeft: number;
  seedsDelivered: number;
  plans: ProjectPlan[];
  next: { title: string; description: string };
};

export type Live = {
  id: string;
  isLive: boolean;
  title: string;
  homeTitle: string;
  chef: string;
  shop: string;
  vegetableId: string;
  viewers: number;
  poll: {
    question: string;
    options: { id: string; label: string; votes: number }[]; // 2択（ダミー集計）
  };
  products: {
    id: string;
    kind: "seed" | "harvest";
    title: string;
    note: string;
  }[];
  comments: { author: string; body: string }[];
};

export type User = {
  nickname: string;
  level: number;
  nextWantCount: number;
  points: number;
  grownCount: number;
  growing: { vegetableId: string; day: number; nextTask: string; nextDate: string }[];
  collection: { vegetableId: string; collected: boolean }[];
  history: { id: string; label: string; date: string; points: number | null }[];
};
