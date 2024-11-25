import { Reward } from '../types';

// Simulated rewards data
const mockRewards: Reward[] = [
  {
    id: '1',
    giver: 'Marie Dupont',
    receiver: 'John Doe',
    message: 'Excellent travail sur le projet client !',
    points: 100,
    likes: 5,
    timestamp: new Date().toISOString()
  },
  {
    id: '2',
    giver: 'Pierre Martin',
    receiver: 'Sophie Bernard',
    message: 'Merci pour ton aide sur la présentation',
    points: 50,
    likes: 3,
    timestamp: new Date().toISOString()
  }
];

export const fetchRewards = async (): Promise<Reward[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockRewards;
};

export const likeReward = async (rewardId: string): Promise<void> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  // In a real app, this would update the backend
};