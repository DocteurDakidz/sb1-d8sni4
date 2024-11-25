import { create } from 'zustand';

export interface TeamSummary {
  teamId: string;
  totalPoints: number;
  recognitionsSent: number;
  recognitionsReceived: number;
  objectivesProgress: {
    objectiveId: string;
    title: string;
    progress: number;
    deadline: string;
  }[];
}

export interface Activity {
  date: string;
  type: 'Reward' | 'Recognition';
  details: string;
  points: number;
}

interface AdminStore {
  teamSummary: TeamSummary | null;
  recentActivity: Activity[];
  loading: boolean;
  error: string | null;
  fetchTeamSummary: () => Promise<void>;
  fetchRecentActivity: () => Promise<void>;
}

// Données simulées pour le développement
const mockTeamSummary: TeamSummary = {
  teamId: "123",
  totalPoints: 12000,
  recognitionsSent: 45,
  recognitionsReceived: 60,
  objectivesProgress: [
    {
      objectiveId: "1",
      title: "Objectif trimestriel",
      progress: 75,
      deadline: "2024-03-31"
    },
    {
      objectiveId: "2",
      title: "Formation continue",
      progress: 60,
      deadline: "2024-06-30"
    }
  ]
};

const mockActivity: Activity[] = [
  {
    date: "2024-01-15",
    type: "Reward",
    details: "Bon d'achat Amazon",
    points: -500
  },
  {
    date: "2024-01-14",
    type: "Recognition",
    details: "Excellence projet - 100 points",
    points: 100
  }
];

export const useAdminStore = create<AdminStore>((set) => ({
  teamSummary: null,
  recentActivity: [],
  loading: false,
  error: null,
  fetchTeamSummary: async () => {
    set({ loading: true });
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ teamSummary: mockTeamSummary, loading: false });
    } catch (error) {
      set({ error: 'Erreur lors du chargement des données', loading: false });
    }
  },
  fetchRecentActivity: async () => {
    set({ loading: true });
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ recentActivity: mockActivity, loading: false });
    } catch (error) {
      set({ error: 'Erreur lors du chargement des activités', loading: false });
    }
  }
}));