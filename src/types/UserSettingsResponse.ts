export interface IUserSettingsResponse {
    weight: number;
    height: number;
    age: number;
    gender: 'male' | 'female';
    goal: 'gain' | 'loss' | 'maintain';
    activityLevel: number;
}
