import httpClient from './http-client';
import { IUserSettingsResponse } from "../types/UserSettingsResponse";
import { IUserSettings } from "../types/UserSettings";

const mapper = (settings: IUserSettingsResponse): IUserSettings => ({
    weight: settings.weight,
    height: settings.height,
    age: settings.age,
    goal: settings.goal,
    gender: settings.gender,
    activityLevel: settings.activityLevel,
});

const UserSettingsService = {
    get: async (): Promise<IUserSettingsResponse> => {
        const response = await httpClient.get('/user-settings/1');

        return mapper(response.data);
    },
    update: async (settings: IUserSettings) => {
        const response = await httpClient.put('/user-settings/1', settings);

        return mapper(response.data);
    },
};
export default UserSettingsService;
