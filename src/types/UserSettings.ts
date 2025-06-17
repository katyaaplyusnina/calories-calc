export interface IUserSettings {
    weight: number;
    height: number;
    age: number;
    gender: 'male' | 'female';
    goal: 'gain' | 'loss' | 'maintain';
    activityLevel: number;
}
